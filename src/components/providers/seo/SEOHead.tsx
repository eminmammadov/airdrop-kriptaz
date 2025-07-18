import React from 'react';
import Head from 'next/head';
import { SEOConfig } from '@/shared/types/seo';
import { siteConfig } from '@/config/site';
import { generateStructuredData } from '@/lib/seo/utils';

interface SEOHeadProps {
  config: Partial<SEOConfig>;
  structuredData?: object[];
}

/**
 * SEO Head Component
 * Renders all SEO-related meta tags and structured data
 */
export function SEOHead({ config, structuredData = [] }: SEOHeadProps) {
  const {
    title = siteConfig.name,
    description = siteConfig.description,
    canonical,
    robots,
    openGraph,
    twitter,
  } = config;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {config.keywords && (
        <meta name="keywords" content={config.keywords.join(', ')} />
      )}
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Robots Meta */}
      {robots && (
        <meta
          name="robots"
          content={[
            robots.index !== false ? 'index' : 'noindex',
            robots.follow !== false ? 'follow' : 'nofollow',
            robots.noarchive ? 'noarchive' : '',
            robots.nosnippet ? 'nosnippet' : '',
            robots.noimageindex ? 'noimageindex' : '',
            robots.nocache ? 'nocache' : '',
          ]
            .filter(Boolean)
            .join(', ')}
        />
      )}

      {/* Open Graph Meta Tags */}
      {openGraph && (
        <>
          <meta property="og:type" content={openGraph.type || 'website'} />
          <meta property="og:site_name" content={openGraph.siteName || siteConfig.name} />
          <meta property="og:title" content={openGraph.title || title} />
          <meta property="og:description" content={openGraph.description || description} />
          {openGraph.url && <meta property="og:url" content={openGraph.url} />}
          {openGraph.locale && <meta property="og:locale" content={openGraph.locale} />}
          
          {/* Open Graph Images */}
          {openGraph.images?.map((image, index) => (
            <React.Fragment key={index}>
              <meta property="og:image" content={image.url} />
              {image.width && <meta property="og:image:width" content={image.width.toString()} />}
              {image.height && <meta property="og:image:height" content={image.height.toString()} />}
              {image.alt && <meta property="og:image:alt" content={image.alt} />}
              {image.type && <meta property="og:image:type" content={image.type} />}
              {image.secureUrl && <meta property="og:image:secure_url" content={image.secureUrl} />}
            </React.Fragment>
          ))}

          {/* Open Graph Videos */}
          {openGraph.videos?.map((video, index) => (
            <React.Fragment key={index}>
              <meta property="og:video" content={video.url} />
              {video.width && <meta property="og:video:width" content={video.width.toString()} />}
              {video.height && <meta property="og:video:height" content={video.height.toString()} />}
              {video.type && <meta property="og:video:type" content={video.type} />}
              {video.secureUrl && <meta property="og:video:secure_url" content={video.secureUrl} />}
            </React.Fragment>
          ))}

          {/* Open Graph Audio */}
          {openGraph.audio?.map((audio, index) => (
            <React.Fragment key={index}>
              <meta property="og:audio" content={audio.url} />
              {audio.type && <meta property="og:audio:type" content={audio.type} />}
              {audio.secureUrl && <meta property="og:audio:secure_url" content={audio.secureUrl} />}
            </React.Fragment>
          ))}

          {/* Alternate Locales */}
          {openGraph.alternateLocale?.map((locale, index) => (
            <meta key={index} property="og:locale:alternate" content={locale} />
          ))}
        </>
      )}

      {/* Twitter Card Meta Tags */}
      {twitter && (
        <>
          <meta name="twitter:card" content={twitter.card || 'summary_large_image'} />
          {twitter.site && <meta name="twitter:site" content={twitter.site} />}
          {twitter.creator && <meta name="twitter:creator" content={twitter.creator} />}
          <meta name="twitter:title" content={twitter.title || title} />
          <meta name="twitter:description" content={twitter.description || description} />
          
          {/* Twitter Images */}
          {twitter.images?.map((image, index) => (
            <React.Fragment key={index}>
              <meta name="twitter:image" content={image.url} />
              {image.alt && <meta name="twitter:image:alt" content={image.alt} />}
              {image.width && <meta name="twitter:image:width" content={image.width.toString()} />}
              {image.height && <meta name="twitter:image:height" content={image.height.toString()} />}
            </React.Fragment>
          ))}

          {/* Twitter App */}
          {twitter.app && (
            <>
              {twitter.app.id.iphone && <meta name="twitter:app:id:iphone" content={twitter.app.id.iphone} />}
              {twitter.app.id.ipad && <meta name="twitter:app:id:ipad" content={twitter.app.id.ipad} />}
              {twitter.app.id.googleplay && <meta name="twitter:app:id:googleplay" content={twitter.app.id.googleplay} />}
              {twitter.app.url?.iphone && <meta name="twitter:app:url:iphone" content={twitter.app.url.iphone} />}
              {twitter.app.url?.ipad && <meta name="twitter:app:url:ipad" content={twitter.app.url.ipad} />}
              {twitter.app.url?.googleplay && <meta name="twitter:app:url:googleplay" content={twitter.app.url.googleplay} />}
              {twitter.app.name?.iphone && <meta name="twitter:app:name:iphone" content={twitter.app.name.iphone} />}
              {twitter.app.name?.ipad && <meta name="twitter:app:name:ipad" content={twitter.app.name.ipad} />}
              {twitter.app.name?.googleplay && <meta name="twitter:app:name:googleplay" content={twitter.app.name.googleplay} />}
            </>
          )}

          {/* Twitter Player */}
          {twitter.player && (
            <>
              <meta name="twitter:player" content={twitter.player.url} />
              {twitter.player.width && <meta name="twitter:player:width" content={twitter.player.width.toString()} />}
              {twitter.player.height && <meta name="twitter:player:height" content={twitter.player.height.toString()} />}
              {twitter.player.stream && <meta name="twitter:player:stream" content={twitter.player.stream} />}
            </>
          )}
        </>
      )}

      {/* Additional Meta Tags */}
      <meta name="author" content={siteConfig.creator.name} />
      <meta name="publisher" content={siteConfig.name} />
      <meta name="copyright" content={`© ${new Date().getFullYear()} ${siteConfig.name}`} />
      
      {/* Favicon and Icons */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Theme Color */}
      <meta name="theme-color" content="#000000" />
      <meta name="msapplication-TileColor" content="#000000" />

      {/* Structured Data */}
      {structuredData.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: generateStructuredData(data),
          }}
        />
      ))}
    </Head>
  );
}

export default SEOHead;
