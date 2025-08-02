# Backend Setup Guide - Treki TimeTracker

This guide will help you set up the Supabase backend for your TimeTracker application.

## Prerequisites

1. **Node.js and npm** (already installed)
2. **Supabase Account** - Sign up at [supabase.com](https://supabase.com)

## Setup Steps

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Choose your organization
4. Set project name: `timetracker` (or your preferred name)
5. Set database password (save this securely)
6. Choose a region close to your users
7. Click "Create new project"

### 2. Get Your Project Credentials

Once your project is created:

1. Go to **Settings** > **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://your-project-id.supabase.co`)
   - **anon public key** (starts with `eyJ...`)
   - **service_role key** (starts with `eyJ...`) - Keep this secret!

### 3. Configure Environment Variables

1. Open `.env.local` in your project root
2. Replace the placeholder values with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_public_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### 4. Set Up the Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste the contents of `supabase/migrations/001_initial_schema.sql`
4. Click "Run" to execute the schema
5. Repeat for `supabase/migrations/002_rpc_functions.sql`

Alternatively, you can run each SQL file separately:
- First run `001_initial_schema.sql` to create tables and policies
- Then run `002_rpc_functions.sql` to create utility functions

### 5. Enable Authentication Providers

1. Go to **Authentication** > **Providers**
2. Enable **Email** provider (enabled by default)
3. Optionally enable **Google** provider:
   - Click on Google provider
   - Enable it
   - Add your Google OAuth credentials (from Google Cloud Console)

### 6. Configure Row Level Security (RLS)

The database schema automatically sets up Row Level Security policies that ensure:
- Users can only access their own data
- Goals, subtasks, and time sessions are properly isolated
- Secure authentication flow

### 7. Test the Connection

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Visit `http://localhost:3000`
3. Try signing up with a new account
4. The application should create your profile automatically

## Database Structure

### Tables Created:

- **profiles**: User profile information extending Supabase auth
- **goals**: Daily goals (max 3 per user per day)
- **subtasks**: Tasks under goals (max 3 per goal)
- **time_sessions**: Detailed time tracking sessions

### Key Features:

- **Row Level Security**: All data is isolated per user
- **Real-time subscriptions**: Supabase provides real-time updates
- **Automatic timestamps**: Created/updated timestamps on all records
- **Constraints**: Enforces business rules (goal limits, etc.)

## API Endpoints

The following API routes are available:

### Authentication
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Goals
- `GET /api/goals` - Get all user goals with subtasks
- `POST /api/goals` - Create new goal
- `PUT /api/goals/[id]` - Update goal
- `DELETE /api/goals/[id]` - Delete goal

### Subtasks
- `GET /api/subtasks?goal_id=[id]` - Get subtasks for a goal
- `POST /api/subtasks` - Create new subtask
- `PUT /api/subtasks/[id]` - Update subtask
- `DELETE /api/subtasks/[id]` - Delete subtask

### Time Sessions
- `GET /api/time-sessions` - Get time sessions
- `POST /api/time-sessions` - Start new time session
- `POST /api/time-sessions/[id]/end` - End time session

## Troubleshooting

### Common Issues:

1. **"Unauthorized" errors**: Check that your environment variables are set correctly
2. **CORS errors**: Ensure your domain is added to Supabase allowed origins
3. **RLS policy errors**: Verify the user is authenticated before making requests

### Useful Supabase Dashboard Sections:

- **Table Editor**: View and edit data directly
- **SQL Editor**: Run custom queries
- **Logs**: View API request logs and errors
- **Auth**: Manage users and authentication settings

## Next Steps

1. Test all functionality (signup, login, creating goals, tracking time)
2. Set up Google OAuth if desired
3. Configure email templates in Supabase Auth settings
4. Set up database backups
5. Consider setting up staging environment

## Production Deployment

When deploying to production:

1. Update environment variables in your hosting platform
2. Set up proper domain configuration in Supabase
3. Configure email settings for authentication
4. Set up monitoring and logging
5. Consider upgrading to a paid Supabase plan for better performance

The backend is now fully configured and ready to use!