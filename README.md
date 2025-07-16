# Airdrop Kriptaz - Custom Font System

This is a [Next.js](https://nextjs.org) project with a comprehensive custom font management system using the Kriptaz font family.

## 🎨 Font System Features

- ✅ **Complete Google Fonts Removal**: No external font dependencies
- ✅ **Custom Kriptaz Font Integration**: Professional typography with 7 weight variants
- ✅ **Type Safety**: Full TypeScript support with custom type definitions
- ✅ **Performance Optimized**: WOFF2/WOFF formats with font-display: swap
- ✅ **Modular Architecture**: Reusable components and utilities
- ✅ **Tailwind CSS v4 Integration**: Seamless integration with modern Tailwind
- ✅ **Font Loading Hooks**: React hooks for font loading states
- ✅ **Performance Monitoring**: Development tools for font performance tracking

## 🚀 Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the font system in action.

## 📁 Font System Architecture

```
src/
├── lib/fonts/           # Font management system
│   ├── index.ts         # Main exports
│   ├── types.ts         # TypeScript definitions
│   ├── kriptaz.ts       # Kriptaz font configuration
│   └── utils.ts         # Utility functions
├── styles/
│   └── fonts.css        # @font-face declarations
├── components/ui/
│   └── Typography.tsx   # Typography components
├── hooks/
│   └── useFonts.ts      # Font loading hooks
└── types/
    └── fonts.d.ts       # Global type declarations
```

## 🎯 Font Usage Examples

### Basic Tailwind Classes
```tsx
<h1 className="font-kriptaz font-bold text-4xl">Bold Heading</h1>
<p className="font-kriptaz font-regular text-base">Regular paragraph</p>
```

### Typography Components
```tsx
import { Heading, Text, Display } from '@/components/ui/Typography';

<Display size="lg">Large Display Text</Display>
<Heading level={2} weight="demibold">Section Heading</Heading>
<Text variant="body">Body text content</Text>
```

### Font Loading Hooks
```tsx
import { useFontLoading } from '@/hooks/useFonts';

function Component() {
  const { isLoaded, isLoading, error } = useFontLoading('Kriptaz');

  if (isLoading) return <div>Loading fonts...</div>;
  return <div className="font-kriptaz">Content</div>;
}
```

## 📊 Available Font Weights

| Weight | Name | CSS Class | Numeric Value |
|--------|------|-----------|---------------|
| Thin | `font-thin` | 100 |
| ExtraLight | `font-extralight` | 200 |
| Light | `font-light` | 300 |
| Regular | `font-normal` | 400 |
| Medium | `font-medium` | 500 |
| DemiBold | `font-demibold` | 600 |
| Bold | `font-bold` | 700 |

## 📚 Documentation

For detailed documentation, see [docs/FONT_SYSTEM.md](docs/FONT_SYSTEM.md)

## 🔧 Performance Features

- **Font Preloading**: Critical fonts (Regular, Bold, Medium) are preloaded
- **WOFF2 Priority**: Modern format served first with WOFF fallback
- **Font Display Swap**: Prevents invisible text during font load
- **Performance Monitoring**: Development tools for tracking font metrics
- **Caching Strategy**: Optimized font caching for better performance

## 🚀 Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
