import { Metadata } from 'next';
import { Heading, Text, Display, Code, FontPerformanceMonitor, FontFallbackTester } from '@/components/fonts';
import { generatePageMetadata } from '@/lib/seo/utils';
import { pageSEOConfigs } from '@/config/site';

export const metadata: Metadata = generatePageMetadata({
  title: pageSEOConfigs.fontsTest.title,
  description: pageSEOConfigs.fontsTest.description,
  keywords: pageSEOConfigs.fontsTest.keywords,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  noindex: true, // Test pages should not be indexed
}, '/fonts-test');

export default function FontsTestPage() {
  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20">
      {/* Font Performance Monitor (development only) */}
      <FontPerformanceMonitor />
      
      <main className="max-w-4xl mx-auto space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <Display size="xl" className="text-6xl">
            Kriptaz Font System Test
          </Display>
          <Text variant="body" className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive testing environment for the Kriptaz font management system.
            This page demonstrates all font features, weights, and components.
          </Text>
        </section>

        {/* Font Weights Demo */}
        <section className="space-y-6">
          <Heading level={2} weight="bold">
            Font Weight Showcase
          </Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="font-kriptaz font-thin text-2xl">Thin (100)</div>
              <div className="font-kriptaz font-extralight text-2xl">ExtraLight (200)</div>
              <div className="font-kriptaz font-light text-2xl">Light (300)</div>
              <div className="font-kriptaz font-normal text-2xl">Regular (400)</div>
            </div>
            <div className="space-y-3">
              <div className="font-kriptaz font-medium text-2xl">Medium (500)</div>
              <div className="font-kriptaz font-demibold text-2xl">DemiBold (600)</div>
              <div className="font-kriptaz font-bold text-2xl">Bold (700)</div>
            </div>
          </div>
        </section>

        {/* Typography Components Demo */}
        <section className="space-y-6">
          <Heading level={2} weight="bold">
            Typography Components
          </Heading>
          
          <div className="space-y-4">
            <div>
              <Heading level={1} weight="bold">Heading Level 1</Heading>
              <Heading level={2} weight="demibold">Heading Level 2</Heading>
              <Heading level={3} weight="medium">Heading Level 3</Heading>
              <Heading level={4} weight="normal">Heading Level 4</Heading>
            </div>
            
            <div className="space-y-2">
              <Text variant="body">
                This is body text using the Kriptaz font family. It demonstrates 
                the regular weight and excellent readability of the custom font system.
              </Text>
              <Text variant="caption">
                This is caption text with a lighter weight for secondary information.
              </Text>
              <Text variant="overline" className="uppercase tracking-wider">
                Overline Text
              </Text>
            </div>
          </div>
        </section>

        {/* Code Examples */}
        <section className="space-y-6">
          <Heading level={2} weight="bold">
            Usage Examples
          </Heading>
          
          <div className="space-y-4">
            <div>
              <Text variant="body" className="mb-2">Basic Tailwind Classes:</Text>
              <Code inline={false}>
{`<h1 className="font-kriptaz font-bold text-4xl">
  Bold Heading
</h1>
<p className="font-kriptaz font-normal text-base">
  Regular paragraph text
</p>`}
              </Code>
            </div>
            
            <div>
              <Text variant="body" className="mb-2">Typography Components:</Text>
              <Code inline={false}>
{`import { Heading, Text } from '@/components/fonts';

<Heading level={1} weight="bold">
  Page Title
</Heading>
<Text variant="body">
  Body content with proper typography
</Text>`}
              </Code>
            </div>
          </div>
        </section>

        {/* Features List */}
        <section className="space-y-6">
          <Heading level={2} weight="bold">
            System Features
          </Heading>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <Heading level={4} weight="demibold" className="mb-2">
                  ✅ Performance Optimized
                </Heading>
                <Text variant="body">
                  WOFF2/WOFF formats with font-display: swap for optimal loading
                </Text>
              </div>
              
              <div className="p-4 border rounded-lg">
                <Heading level={4} weight="demibold" className="mb-2">
                  ✅ Type Safe
                </Heading>
                <Text variant="body">
                  Full TypeScript support with custom type definitions
                </Text>
              </div>
              
              <div className="p-4 border rounded-lg">
                <Heading level={4} weight="demibold" className="mb-2">
                  ✅ Modular Architecture
                </Heading>
                <Text variant="body">
                  Reusable components and utilities for consistent typography
                </Text>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <Heading level={4} weight="demibold" className="mb-2">
                  ✅ Tailwind Integration
                </Heading>
                <Text variant="body">
                  Seamless integration with Tailwind CSS v4
                </Text>
              </div>
              
              <div className="p-4 border rounded-lg">
                <Heading level={4} weight="demibold" className="mb-2">
                  ✅ Font Loading Hooks
                </Heading>
                <Text variant="body">
                  React hooks for monitoring font loading states
                </Text>
              </div>
              
              <div className="p-4 border rounded-lg">
                <Heading level={4} weight="demibold" className="mb-2">
                  ✅ Complete Weight Support
                </Heading>
                <Text variant="body">
                  7 font weights (100-700) with italic variants
                </Text>
              </div>
            </div>
          </div>
        </section>

        {/* Italic Variants Demo */}
        <section className="space-y-6">
          <Heading level={2} weight="bold">
            Italic Variants
          </Heading>
          
          <div className="space-y-3">
            <div className="font-kriptaz font-light italic text-xl">Light Italic</div>
            <div className="font-kriptaz font-medium italic text-xl">Medium Italic</div>
            <div className="font-kriptaz font-demibold italic text-xl">DemiBold Italic</div>
            <div className="font-kriptaz font-bold italic text-xl">Bold Italic</div>
          </div>
        </section>

        {/* Font Fallback Testing */}
        <section className="space-y-6">
          <Heading level={2} weight="bold">
            Font Fallback System Testing
          </Heading>
          
          <FontFallbackTester />
        </section>
      </main>
      
      <footer className="mt-16 text-center">
        <Text variant="caption" className="text-gray-500">
          Kriptaz Font System Test Environment
        </Text>
      </footer>
    </div>
  );
}
