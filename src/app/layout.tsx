import type { Metadata } from "next";
import "./globals.css";
import { FontPreloader, LayoutWrapper } from "@/components/fonts";
import { generateMetadata } from "@/lib/seo/utils";
import { defaultSEO } from "@/config/site";
import { Header } from "@/components/ui/header/Header";
import { Footer } from "@/components/ui/footer/Footer";
import { Web3Provider } from "@/providers/Web3Provider";

export const metadata: Metadata = {
  ...generateMetadata(defaultSEO),
  metadataBase: new URL(defaultSEO.canonical || 'https://airdrop-kriptaz.vercel.app/'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Critical font preloading handled by FontPreloader */}
        <FontPreloader />
      </head>
      <body
        className="antialiased font-kriptaz overflow-x-hidden h-screen"
        data-new-gr-c-s-check-loaded="14.1244.0"
        data-gr-ext-installed=""
      >
        <Web3Provider>
          <LayoutWrapper>
            <div className="flex flex-col h-screen">
              <Header />
              <main className="flex-1 overflow-y-auto pt-16 pb-12 main-content">
                {children}
              </main>
              <Footer />
            </div>
          </LayoutWrapper>
        </Web3Provider>
      </body>
    </html>
  );
}
