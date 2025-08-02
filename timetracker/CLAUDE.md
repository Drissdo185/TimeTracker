# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack (runs on http://localhost:3000)
- `npm run build` - Build the application for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint for code linting

## Architecture

This is a Next.js 15 application using the App Router architecture with TypeScript and Tailwind CSS v4. The application is a time tracking dashboard called "Treki" that helps users manage daily goals, track task completion, and monitor time spent on activities.

### Project Structure
- `/src/app/` - App Router pages and layouts
  - `layout.tsx` - Root layout with Geist fonts configuration
  - `page.tsx` - Main dashboard page with goal management and time tracking
  - `globals.css` - Global Tailwind styles with dark mode support
  - `components/` - Page-specific components (Dashboard widgets)
  - `hooks/` - Custom React hooks for state management
- `/src/components/ui/` - Reusable UI components (shadcn/ui based)
- `/src/lib/` - Utility functions
- `/public/` - Static assets (SVG icons)

### Key Technologies
- **Next.js 15** with App Router
- **React 19** with client-side components
- **TypeScript 5** with strict configuration
- **Tailwind CSS v4** with PostCSS and custom theme
- **shadcn/ui** component library (New York style)
- **Radix UI** primitives for accessible components
- **Lucide React** for icons
- **Recharts** for data visualization
- **ESLint** with Next.js config
- **Turbopack** for fast development builds

### Application Architecture

#### State Management
- Uses custom React hooks for state management (no external state library)
- `useGoals` hook manages all goal-related state and operations
- Local state with `useState` for UI interactions

#### Data Flow
- Goals and subtasks are managed through the `useGoals` hook
- Maximum limits: 3 daily goals, 3 subtasks per goal
- Time tracking with seconds precision
- Streak tracking for completed tasks
- Progress calculation based on completed subtasks

#### Component Structure
- **Dashboard Layout**: Sidebar + Main Content Area
- **Main Content**: Header with search, Summary Cards (Streak, DateTime, Radar Chart), Goals Management, Stopwatch
- **Goal Management**: Hierarchical structure with expandable goals containing subtasks
- **Time Tracking**: Integrated stopwatch with task selection and completion workflow

#### UI Components
- Built on shadcn/ui with Radix UI primitives
- Consistent styling with CSS variables and dark mode support
- Custom animations using tw-animate-css
- Responsive design with Tailwind utilities

### TypeScript Configuration
- Uses `@/*` path mapping for src imports
- Target ES2017 with strict mode enabled
- Configured for Next.js with bundler module resolution

### Styling
- Tailwind CSS v4 with PostCSS integration
- Custom theme with CSS variables for light/dark modes
- Geist Sans and Geist Mono fonts from Google Fonts
- Component-specific styling following shadcn/ui patterns
- CSS variables for consistent color theming across components

### Key Features
- Daily goal management with progress tracking
- Hierarchical task structure (goals → subtasks)
- Time tracking with stopwatch functionality
- Streak tracking for motivation
- Visual progress indicators and charts
- Task selection and completion workflows
- Responsive dashboard layout