# Sukeltajat ry - Headless WordPress Frontend

A modern, headless WordPress frontend built with Next.js 14 for Sukeltajat ry, a Finnish diving club established in 1976.

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **GraphQL**: Apollo Client with GraphQL Code Generator
- **Data Source**: WordPress via WPGraphQL
- **Deployment**: Optimized for Vercel

## Features

- 🏠 **Home page** with latest 6 posts and hero section
- 📰 **News archive** by year (`/uutiset/[vuosi]`)
- 📄 **Single post pages** (`/uutiset/[vuosi]/[slug]`)
- 🧭 **Global navigation** with Finnish UI text
- 🔍 **SEO optimization** with proper metadata
- 📱 **Mobile-first responsive design**
- ⚡ **Static Generation with ISR** (5-minute revalidation)
- 🎯 **TypeScript** with generated GraphQL hooks

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Copy the environment template:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your WordPress GraphQL endpoint:

```env
WPGRAPHQL_URL=https://your-wordpress-site.com/graphql
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

## Development

### Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript compiler check

### Quality Gates

Before deployment, ensure:

```bash
npm run lint      # ESLint must pass
npm run typecheck # TypeScript must pass
npm run build     # Build must succeed
```

## WordPress Requirements

Your WordPress site needs:

1. **WPGraphQL plugin** installed and activated
2. **GraphQL endpoint** accessible at `/graphql`
3. **Posts** with categories, featured images, and proper permalinks

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `WPGRAPHQL_URL`
   - `NEXT_PUBLIC_SITE_URL`
4. Deploy!

### Other Platforms

The app works on any platform that supports Node.js and Next.js static export.

## Project Structure

```
src/
├── app/                    # App Router pages
│   ├── layout.tsx         # Global layout
│   ├── page.tsx           # Homepage
│   ├── not-found.tsx      # 404 page
│   ├── uutiset/           # News routes
│   │   ├── page.tsx       # News archive
│   │   └── [vuosi]/       # Year-based routes
│   │       ├── page.tsx   # Posts by year
│   │       └── [slug]/    # Single post
│   └── ...                # Other pages
├── components/            # Reusable UI components
│   ├── Navigation.tsx     # Header navigation
│   ├── Footer.tsx         # Site footer
│   ├── PostCard.tsx       # Post preview card
│   └── ApolloWrapper.tsx  # GraphQL provider
└── lib/                   # Utilities and config
    ├── wpClient.ts        # Apollo Client setup
    └── queries/           # GraphQL queries
        ├── posts.ts       # Post-related queries
        └── generated.ts   # Auto-generated types
```

## Contributing

1. Follow TypeScript best practices
2. Use Finnish for UI text, English for code
3. Keep components minimal and focused
4. Run linting and type checking before commits
5. Test on both desktop and mobile

## Performance

- Target: Lighthouse performance ≥ 90
- Uses Next.js Image optimization
- Static generation with ISR
- Optimized bundle size

## License

© 2025 Sukeltajat ry. All rights reserved.
