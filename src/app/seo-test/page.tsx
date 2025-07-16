import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SEO Test - Kriptaz',
  description: 'SEO test page for Kriptaz blockchain platform',
  keywords: 'kriptaz, blockchain, seo, test',
  robots: 'noindex, nofollow',
};

export default function SeoTestPage() {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          SEO Test Page
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          This is a test page for SEO purposes
        </p>
        <div className="mt-8 space-y-4">
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Test Information</h2>
            <ul className="text-sm space-y-1">
              <li>• Meta tags: ✓ Configured</li>
              <li>• Robots: ✓ noindex, nofollow</li>
              <li>• Description: ✓ Present</li>
              <li>• Keywords: ✓ Present</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
