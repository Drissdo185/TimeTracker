import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

// POST /api/time-sessions/[id]/end - End a time session
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient()
    
    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get the session and verify ownership
    const { data: session } = await supabase
      .from('time_sessions')
      .select('*')
      .eq('id', params.id)
      .eq('user_id', user.id)
      .single()

    if (!session) {
      return NextResponse.json({ error: 'Time session not found' }, { status: 404 })
    }

    if (session.end_time) {
      return NextResponse.json({ error: 'Time session already ended' }, { status: 400 })
    }

    const endTime = new Date()
    const startTime = new Date(session.start_time)
    const duration = Math.floor((endTime.getTime() - startTime.getTime()) / 1000) // in seconds

    // Update the session
    const { data: updatedSession, error: sessionError } = await supabase
      .from('time_sessions')
      .update({
        end_time: endTime.toISOString(),
        duration
      })
      .eq('id', params.id)
      .select()
      .single()

    if (sessionError) {
      return NextResponse.json({ error: sessionError.message }, { status: 500 })
    }

    // Update the subtask with accumulated time
    const { data: subtask } = await supabase
      .from('subtasks')
      .select('time_spent')
      .eq('id', session.subtask_id)
      .single()

    if (subtask) {
      await supabase
        .from('subtasks')
        .update({
          time_spent: (subtask.time_spent || 0) + duration,
          completed: true // Mark as completed when time session ends
        })
        .eq('id', session.subtask_id)

      // Update user streak
      await supabase.rpc('increment_user_streak', { user_id: user.id })
    }

    return NextResponse.json({ 
      session: updatedSession,
      duration 
    })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}