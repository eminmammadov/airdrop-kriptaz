# Airdrop Kriptaz

Professional KA Token price tracking application built with Next.js 15 and TypeScript.

## 🚀 Features

- **Real-time KA Token Price**: Live price data from KURU exchange
- **Professional Architecture**: Clean, scalable, and maintainable codebase
- **Caching System**: Optimized performance with intelligent caching
- **Type Safety**: Full TypeScript implementation
- **Modern UI**: Responsive design with Tailwind CSS

## 🏗️ Architecture

### API Structure
```
src/
├── app/api/v1/price/          # Versioned API endpoints
├── services/
│   ├── api/                   # External API services
│   ├── cache/                 # Caching services
│   └── validation/            # Smart validation services
├── config/
│   ├── links.ts              # Centralized link management
│   └── site.ts               # Site configuration
├── types/                     # TypeScript definitions
├── shared/constants/          # Application constants
└── components/                # React components
```

### Key Components
- **KuruApiService**: Handles KURU exchange API interactions
- **PriceCacheService**: Manages price data caching
- **PriceValidatorService**: Smart price validation with dynamic thresholds
- **PriceController**: Professional API controller
- **KaPrice Component**: Real-time price display
- **Centralized Links**: All URLs managed from `config/links.ts`

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm

### Installation
```bash
# Clone the repository
git clone https://github.com/eminmammadov/airdrop-kriptaz.git

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [https://airdrop-kriptaz.vercel.app/](https://airdrop-kriptaz.vercel.app/) to view the application.

## 📡 API Endpoints

### GET /api/v1/price
Returns KA token price data with caching.

**Response:**
```json
{
  "success": true,
  "data": {
    "price": 0.001068945335762263,
    "volume24h": 4.1,
    "change24h": 5.10,
    "source": "KURU API",
    "timestamp": 1752762987357,
    "cached": false
  },
  "timestamp": 1752762987357,
  "cache_duration": 20
}
```

## 🔧 Configuration

### Cache Settings
- **Price TTL**: 20 seconds
- **Update Interval**: 20 seconds
- **Fallback Price**: $0.000996

### API Configuration
- **KURU API**: https://api.kuru.io
- **Timeout**: 10 seconds
- **Retry Attempts**: 3

## 🏢 Professional Standards

- **Clean Architecture**: Separation of concerns
- **Error Handling**: Comprehensive error management
- **Type Safety**: Full TypeScript coverage
- **Performance**: Optimized caching and API calls
- **Scalability**: Modular and extensible design

## 📝 License

This project is licensed under the MIT License.
