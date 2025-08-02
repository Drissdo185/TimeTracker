import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'
import { StartTimeSessionRequest } from '@/lib/types'

// GET /api/time-sessions - Get time sessions for the user
export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    const { searchParams } = new URL(request.url)
    const subtaskId = searchParams.get('subtask_id')
    
    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    let query = supabase
      .from('time_sessions')
      .select(`
        *,
        subtasks!inner (
          id,
          text,
          goals!inner (
            id,
            title
          )
        )
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (subtaskId) {
      query = query.eq('subtask_id', subtaskId)
    }

    const { data: sessions, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ sessions })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/time-sessions - Start a new time session
export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    
    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body: StartTimeSessionRequest = await request.json()

    // Verify user owns the subtask
    const { data: subtask } = await supabase
      .from('subtasks')
      .select(`
        *,
        goals!inner (
          user_id
        )
      `)
      .eq('id', body.subtask_id)
      .single()

    if (!subtask || subtask.goals.user_id !== user.id) {
      return NextResponse.json({ error: 'Subtask not found' }, { status: 404 })
    }

    // Check if there's already an active session for this user
    const { data: activeSession } = await supabase
      .from('time_sessions')
      .select('id')
      .eq('user_id', user.id)
      .is('end_time', null)
      .single()

    if (activeSession) {
      return NextResponse.json({ error: 'Another time session is already active' }, { status: 400 })
    }

    const { data: session, error } = await supabase
      .from('time_sessions')
      .insert({
        user_id: user.id,
        subtask_id: body.subtask_id,
        start_time: new Date().toISOString()
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ session }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}