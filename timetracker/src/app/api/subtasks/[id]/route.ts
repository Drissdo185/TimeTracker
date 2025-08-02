import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'
import { UpdateSubTaskRequest } from '@/lib/types'

// GET /api/subtasks/[id] - Get a specific subtask
export async function GET(
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

    const { data: subtask, error } = await supabase
      .from('subtasks')
      .select(`
        *,
        goals!inner (
          user_id
        )
      `)
      .eq('id', params.id)
      .single()

    if (error || !subtask || subtask.goals.user_id !== user.id) {
      return NextResponse.json({ error: 'Subtask not found' }, { status: 404 })
    }

    return NextResponse.json({ subtask })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT /api/subtasks/[id] - Update a subtask
export async function PUT(
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

    const body: UpdateSubTaskRequest = await request.json()

    // First verify the user owns this subtask
    const { data: existingSubtask } = await supabase
      .from('subtasks')
      .select(`
        *,
        goals!inner (
          user_id
        )
      `)
      .eq('id', params.id)
      .single()

    if (!existingSubtask || existingSubtask.goals.user_id !== user.id) {
      return NextResponse.json({ error: 'Subtask not found' }, { status: 404 })
    }

    const { data: subtask, error } = await supabase
      .from('subtasks')
      .update(body)
      .eq('id', params.id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // If subtask was completed, update user streak
    if (body.completed === true && !existingSubtask.completed) {
      await supabase
        .from('profiles')
        .update({ 
          streak_count: supabase.rpc('increment_streak', { user_id: user.id }) 
        })
        .eq('id', user.id)
    }

    return NextResponse.json({ subtask })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/subtasks/[id] - Delete a subtask
export async function DELETE(
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

    // First verify the user owns this subtask
    const { data: subtask } = await supabase
      .from('subtasks')
      .select(`
        *,
        goals!inner (
          user_id
        )
      `)
      .eq('id', params.id)
      .single()

    if (!subtask || subtask.goals.user_id !== user.id) {
      return NextResponse.json({ error: 'Subtask not found' }, { status: 404 })
    }

    const { error } = await supabase
      .from('subtasks')
      .delete()
      .eq('id', params.id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: 'Subtask deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}