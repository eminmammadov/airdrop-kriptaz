/**
 * KA Price Stream API v1
 * GET /api/v1/price-stream - Server-Sent Events for real-time price updates
 */

import { NextRequest } from 'next/server';
import { KA_TOKEN } from '@/shared/constants/api';
import { EXTERNAL_APIS, SECURITY_CONFIG, SECURITY_HEADERS } from '@/config/api';

// Connection management with security limits
let activeConnections = 0;
let priceUpdateInterval: NodeJS.Timeout | null = null;

interface TokenMetadata {
  decimals: number;
  symbol: string;
  name: string;
  logo?: string | null;
}

interface PriceData {
  price: number;
  source: string;
  timestamp: number;
}

class KAPriceStreamer {
  // Get token metadata from Alchemy
  async getTokenMetadata(): Promise<TokenMetadata | null> {
    try {
      // Check if Alchemy API key is available
      if (!EXTERNAL_APIS.ALCHEMY.API_KEY) {
        console.warn('Alchemy API key not available, using fallback metadata');
        return {
          decimals: KA_TOKEN.DECIMALS,
          symbol: KA_TOKEN.SYMBOL,
          name: KA_TOKEN.NAME,
          logo: null
        };
      }

      const payload = {
        id: 1,
        jsonrpc: "2.0",
        method: "alchemy_getTokenMetadata",
        params: [KA_TOKEN.ADDRESS]
      };

      const response = await fetch(`${EXTERNAL_APIS.ALCHEMY.BASE_URL}/${EXTERNAL_APIS.ALCHEMY.API_KEY}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(EXTERNAL_APIS.ALCHEMY.TIMEOUT)
      });

      if (response.ok) {
        const data = await response.json();
        if (data.result) {
          return data.result as TokenMetadata;
        }
      }
    } catch (error) {
      console.warn('Token metadata error:', error);
    }

    // Fallback to hardcoded metadata
    return {
      decimals: KA_TOKEN.DECIMALS,
      symbol: KA_TOKEN.SYMBOL,
      name: KA_TOKEN.NAME,
      logo: null
    };
  }

  // Calculate real price from KURU API
  async calculateRealPrice(): Promise<number> {
    try {
      const marketUrl = `${EXTERNAL_APIS.KURU.BASE_URL}/api/v2/markets/address/${KA_TOKEN.MARKET_ADDRESS}`;

      const response = await fetch(marketUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        signal: AbortSignal.timeout(EXTERNAL_APIS.KURU.TIMEOUT)
      });

      if (response.ok) {
        const marketData = await response.json();

        if (marketData && marketData.success && marketData.data && marketData.data.data) {
          const data = marketData.data.data;
          const kaMonPrice = data.lastPrice;
          const monUsdPrice = data.lastPriceMonUSD;
          const kaUsdPrice = kaMonPrice * monUsdPrice;
          return kaUsdPrice;
        }
      }
    } catch (error) {
      console.warn('KURU API stream error:', error);
    }

    // Fallback price
    return 0.000996;
  }

  // Get MON token price
  async getMONPrice(): Promise<number> {
    try {
      const response = await fetch(`${EXTERNAL_APIS.COINGECKO.BASE_URL}/simple/price?ids=monad&vs_currencies=usd`, {
        signal: AbortSignal.timeout(EXTERNAL_APIS.COINGECKO.TIMEOUT)
      });

      if (response.ok) {
        const data = await response.json();
        if (data.monad && data.monad.usd) {
          return data.monad.usd;
        }
      }

      return 2.0; // Fallback
    } catch (error) {
      console.warn('MON price fetch error:', error);
      return 2.0;
    }
  }

  // Get current price data
  async getCurrentPrice(): Promise<PriceData> {
    const price = await this.calculateRealPrice();
    
    return {
      price,
      source: EXTERNAL_APIS.ALCHEMY.API_KEY ? 'Alchemy Monad API (Real-time)' : 'KURU Exchange API (Real-time)',
      timestamp: Date.now()
    };
  }
}

// GET endpoint - Server-Sent Events with security controls
export async function GET(request: NextRequest) {
  // Check connection limit
  if (activeConnections >= SECURITY_CONFIG.SSE.MAX_CONNECTIONS) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Connection limit exceeded',
        message: 'Too many active connections. Please try again later.',
        maxConnections: SECURITY_CONFIG.SSE.MAX_CONNECTIONS,
        version: 'v1'
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': '60',
          ...SECURITY_HEADERS.COMMON
        }
      }
    );
  }

  // Security headers with restricted CORS
  const headers = new Headers({
    'Content-Type': 'text/event-stream',
    ...SECURITY_HEADERS.NO_CACHE,
    'Connection': 'keep-alive',
    ...SECURITY_HEADERS.CORS(),
    'X-API-Version': 'v1'
  });

  const encoder = new TextEncoder();
  const streamer = new KAPriceStreamer();

  const stream = new ReadableStream({
    start(controller) {
      activeConnections++;
      console.warn(`SSE v1: New client connected (Total: ${activeConnections})`);

      // Set connection timeout for security
      const connectionTimeout = setTimeout(() => {
        activeConnections--;
        console.warn(`SSE v1: Connection timeout reached for client (Total: ${activeConnections})`);
        controller.close();
      }, SECURITY_CONFIG.SSE.CONNECTION_TIMEOUT);

      // Send initial price data
      streamer.getCurrentPrice().then(priceData => {
        const data = `data: ${JSON.stringify({ ...priceData, version: 'v1' })}\n\n`;
        controller.enqueue(encoder.encode(data));
      });

      // Start periodic price updates
      if (!priceUpdateInterval) {
        console.warn('SSE v1: Price updates started');
        priceUpdateInterval = setInterval(async () => {
          if (activeConnections > 0) {
            try {
              const priceData = await streamer.getCurrentPrice();
              const data = `data: ${JSON.stringify({ ...priceData, version: 'v1' })}\n\n`;
              controller.enqueue(encoder.encode(data));
              console.warn(`SSE v1: KA price updated - $${priceData.price}`);
            } catch (error) {
              console.warn('SSE v1 price update error:', error);
            }
          }
        }, SECURITY_CONFIG.SSE.UPDATE_INTERVAL);
      }

      // Cleanup on connection close
      request.signal.addEventListener('abort', () => {
        activeConnections--;
        clearTimeout(connectionTimeout);
        console.warn(`SSE v1: Client disconnected (Total: ${activeConnections})`);
        
        if (activeConnections <= 0) {
          if (priceUpdateInterval) {
            clearInterval(priceUpdateInterval);
            priceUpdateInterval = null;
            console.warn('SSE v1: Price updates stopped');
          }
        }
        
        controller.close();
      });
    }
  });

  return new Response(stream, { headers });
}

// OPTIONS endpoint with security restrictions
export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      ...SECURITY_HEADERS.CORS(),
      ...SECURITY_HEADERS.COMMON,
      'X-API-Version': 'v1'
    },
  });
}
