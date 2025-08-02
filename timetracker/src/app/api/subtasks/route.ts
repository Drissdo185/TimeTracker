import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'
import { CreateSubTaskRequest } from '@/lib/types'

// GET /api/subtasks?goal_id=... - Get subtasks for a goal
export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    const { searchParams } = new URL(request.url)
    const goalId = searchParams.get('goal_id')

    if (!goalId) {
      return NextResponse.json({ error: 'goal_id is required' }, { status: 400 })
    }
    
    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify user owns the goal
    const { data: goal } = await supabase
      .from('goals')
      .select('user_id')
      .eq('id', goalId)
      .single()

    if (!goal || goal.user_id !== user.id) {
      return NextResponse.json({ error: 'Goal not found' }, { status: 404 })
    }

    const { data: subtasks, error } = await supabase
      .from('subtasks')
      .select('*')
      .eq('goal_id', goalId)
      .order('position', { ascending: true })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ subtasks })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/subtasks - Create a new subtask
export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    
    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body: CreateSubTaskRequest = await request.json()

    // Verify user owns the goal
    const { data: goal } = await supabase
      .from('goals')
      .select('user_id')
      .eq('id', body.goal_id)
      .single()

    if (!goal || goal.user_id !== user.id) {
      return NextResponse.json({ error: 'Goal not found' }, { status: 404 })
    }

    // Check subtask limit (3 per goal)
    const { count } = await supabase
      .from('subtasks')
      .select('*', { count: 'exact', head: true })
      .eq('goal_id', body.goal_id)

    if (count && count >= 3) {
      return NextResponse.json({ error: 'Subtask limit reached (3 per goal)' }, { status: 400 })
    }

    // Get the next position
    const { data: lastSubtask } = await supabase
      .from('subtasks')
      .select('position')
      .eq('goal_id', body.goal_id)
      .order('position', { ascending: false })
      .limit(1)

    const position = body.position ?? ((lastSubtask?.[0]?.position ?? -1) + 1)

    const { data: subtask, error } = await supabase
      .from('subtasks')
      .insert({
        goal_id: body.goal_id,
        text: body.text,
        position
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ subtask }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}