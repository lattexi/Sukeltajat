# Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Context

This is a headless WordPress frontend built with Next.js 14 for Sukeltajat ry, a Finnish diving club established in 1976.

## Technical Stack

- **Framework**: Next.js 14 with App Router and TypeScript
- **Styling**: Tailwind CSS (minimal config)
- **GraphQL**: Apollo Client with GraphQL Code Generator for typed hooks
- **Data Source**: WordPress via WPGraphQL plugin
- **Deployment**: Designed for Vercel

## Code Standards

- Use TypeScript with strict typing
- Keep code clean, minimal, and idiomatic
- Use Finnish for UI text, English for code/comments
- Prefer self-explanatory variable and function names
- Comment sparingly - code should be self-documenting

## Project Structure

- `/src/components` - Reusable UI components
- `/src/app` - App Router pages and layouts
- `/src/lib` - Apollo client configuration and utilities
- `/src/lib/queries` - GraphQL documents and generated types

## Data Fetching Strategy

- Use Static Generation with ISR (revalidate: 300)
- Environment variable: `WPGRAPHQL_URL`
- All GraphQL queries should use generated typed hooks

## Key Features

- Home page with latest 6 posts
- News archive by year: `/uutiset/[vuosi]`
- Single post pages: `/uutiset/[vuosi]/[slug]`
- Global navigation (Uutiset, Yhdistys, Kalenteri)
- SEO metadata for all routes
- 404 page

## Quality Requirements

- ESLint and TypeScript checks must pass
- Target Lighthouse performance ≥ 90
- Mobile-first responsive design
