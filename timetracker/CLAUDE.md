# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack (runs on http://localhost:3000)
- `npm run build` - Build the application for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint for code linting

## Architecture

This is a Next.js 15 application using the App Router architecture with TypeScript and Tailwind CSS v4.

### Project Structure
- `/src/app/` - App Router pages and layouts
  - `layout.tsx` - Root layout with Geist fonts configuration
  - `page.tsx` - Homepage component
  - `globals.css` - Global Tailwind styles
- `/public/` - Static assets (SVG icons)

### Key Technologies
- **Next.js 15** with App Router
- **React 19** 
- **TypeScript 5** with strict configuration
- **Tailwind CSS v4** with PostCSS
- **ESLint** with Next.js config
- **Turbopack** for fast development builds

### TypeScript Configuration
- Uses `@/*` path mapping for src imports
- Target ES2017 with strict mode enabled
- Configured for Next.js with bundler module resolution

### Styling
- Tailwind CSS v4 with PostCSS integration
- Geist Sans and Geist Mono fonts from Google Fonts
- CSS variables for font families defined in layout