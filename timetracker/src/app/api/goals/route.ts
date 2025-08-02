import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'
import { CreateGoalRequest, UpdateGoalRequest } from '@/lib/types'

// GET /api/goals - Get all goals for the authenticated user
export async function GET() {
  try {
    const supabase = createClient()
    
    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Fetch goals with subtasks
    const { data: goals, error } = await supabase
      .from('goals')
      .select(`
        *,
        subtasks (
          id,
          text,
          completed,
          time_spent,
          position,
          created_at,
          updated_at
        )
      `)
      .eq('user_id', user.id)
      .order('position', { ascending: true })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ goals })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/goals - Create a new goal
export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    
    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body: CreateGoalRequest = await request.json()
    
    // Check daily limit (3 goals per day)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const { count } = await supabase
      .from('goals')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .gte('created_at', today.toISOString())

    if (count && count >= 3) {
      return NextResponse.json({ error: 'Daily goal limit reached (3 goals per day)' }, { status: 400 })
    }

    // Get the next position
    const { data: lastGoal } = await supabase
      .from('goals')
      .select('position')
      .eq('user_id', user.id)
      .order('position', { ascending: false })
      .limit(1)

    const position = body.position ?? ((lastGoal?.[0]?.position ?? -1) + 1)

    const { data: goal, error } = await supabase
      .from('goals')
      .insert({
        user_id: user.id,
        title: body.title,
        position
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ goal }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}