// Database types
export interface Profile {
  id: string
  email: string
  display_name?: string
  avatar_url?: string
  streak_count: number
  created_at: string
  updated_at: string
}

export interface Goal {
  id: string
  user_id: string
  title: string
  completed: boolean
  expanded: boolean
  position: number
  created_at: string
  updated_at: string
  subtasks?: SubTask[]
}

export interface SubTask {
  id: string
  goal_id: string
  text: string
  completed: boolean
  time_spent: number // in seconds
  position: number
  created_at: string
  updated_at: string
}

export interface TimeSession {
  id: string
  user_id: string
  subtask_id: string
  start_time: string
  end_time?: string
  duration?: number // in seconds
  created_at: string
}

// API request/response types
export interface CreateGoalRequest {
  title: string
  position?: number
}

export interface UpdateGoalRequest {
  title?: string
  completed?: boolean
  expanded?: boolean
  position?: number
}

export interface CreateSubTaskRequest {
  goal_id: string
  text: string
  position?: number
}

export interface UpdateSubTaskRequest {
  text?: string
  completed?: boolean
  time_spent?: number
  position?: number
}

export interface StartTimeSessionRequest {
  subtask_id: string
}

export interface EndTimeSessionRequest {
  session_id: string
}

// Frontend compatibility types (for existing components)
export interface LegacyGoal {
  id: number
  title: string
  completed: boolean
  expanded: boolean
  subTasks: LegacySubTask[]
}

export interface LegacySubTask {
  id: number
  text: string
  completed: boolean
  timeSpent?: number
}