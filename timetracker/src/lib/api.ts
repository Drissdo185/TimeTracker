import { Goal, SubTask, TimeSession, CreateGoalRequest, UpdateGoalRequest, CreateSubTaskRequest, UpdateSubTaskRequest } from './types'

const API_BASE = '/api'

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }))
    throw new ApiError(response.status, error.error || 'API request failed')
  }

  return response.json()
}

export const api = {
  // Goals
  goals: {
    async getAll(): Promise<{ goals: Goal[] }> {
      return fetchApi('/goals')
    },

    async getById(id: string): Promise<{ goal: Goal }> {
      return fetchApi(`/goals/${id}`)
    },

    async create(data: CreateGoalRequest): Promise<{ goal: Goal }> {
      return fetchApi('/goals', {
        method: 'POST',
        body: JSON.stringify(data),
      })
    },

    async update(id: string, data: UpdateGoalRequest): Promise<{ goal: Goal }> {
      return fetchApi(`/goals/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      })
    },

    async delete(id: string): Promise<{ message: string }> {
      return fetchApi(`/goals/${id}`, {
        method: 'DELETE',
      })
    },
  },

  // Subtasks
  subtasks: {
    async getByGoalId(goalId: string): Promise<{ subtasks: SubTask[] }> {
      return fetchApi(`/subtasks?goal_id=${goalId}`)
    },

    async getById(id: string): Promise<{ subtask: SubTask }> {
      return fetchApi(`/subtasks/${id}`)
    },

    async create(data: CreateSubTaskRequest): Promise<{ subtask: SubTask }> {
      return fetchApi('/subtasks', {
        method: 'POST',
        body: JSON.stringify(data),
      })
    },

    async update(id: string, data: UpdateSubTaskRequest): Promise<{ subtask: SubTask }> {
      return fetchApi(`/subtasks/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      })
    },

    async delete(id: string): Promise<{ message: string }> {
      return fetchApi(`/subtasks/${id}`, {
        method: 'DELETE',
      })
    },
  },

  // Time Sessions
  timeSessions: {
    async getAll(subtaskId?: string): Promise<{ sessions: TimeSession[] }> {
      const params = subtaskId ? `?subtask_id=${subtaskId}` : ''
      return fetchApi(`/time-sessions${params}`)
    },

    async start(subtaskId: string): Promise<{ session: TimeSession }> {
      return fetchApi('/time-sessions', {
        method: 'POST',
        body: JSON.stringify({ subtask_id: subtaskId }),
      })
    },

    async end(sessionId: string): Promise<{ session: TimeSession; duration: number }> {
      return fetchApi(`/time-sessions/${sessionId}/end`, {
        method: 'POST',
      })
    },
  },

  // Profile
  profile: {
    async get(): Promise<{ profile: any }> {
      return fetchApi('/auth/profile')
    },

    async update(data: { display_name?: string; avatar_url?: string }): Promise<{ profile: any }> {
      return fetchApi('/auth/profile', {
        method: 'PUT',
        body: JSON.stringify(data),
      })
    },
  },
}

export { ApiError }