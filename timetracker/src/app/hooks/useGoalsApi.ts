import { useState, useEffect, useCallback } from 'react'
import { api, ApiError } from '@/lib/api'
import { Goal, SubTask } from '@/lib/types'
import { useAuth } from '@/components/auth/AuthProvider'

const MAX_DAILY_GOALS = 3
const MAX_SUBTASKS_PER_GOAL = 3

// Convert backend data to frontend format
const convertToLegacyFormat = (goals: Goal[]) => {
  return goals.map(goal => ({
    id: parseInt(goal.id.slice(-8), 16), // Convert UUID to number for frontend compatibility
    title: goal.title,
    completed: goal.completed,
    expanded: goal.expanded,
    subTasks: (goal.subtasks || []).map(subtask => ({
      id: parseInt(subtask.id.slice(-8), 16),
      text: subtask.text,
      completed: subtask.completed,
      timeSpent: subtask.time_spent
    }))
  }))
}

export function useGoalsApi() {
  const { user } = useAuth()
  const [goals, setGoals] = useState<Goal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch goals from API
  const fetchGoals = useCallback(async () => {
    if (!user) return

    try {
      setLoading(true)
      const { goals: fetchedGoals } = await api.goals.getAll()
      setGoals(fetchedGoals)
      setError(null)
    } catch (err) {
      const errorMessage = err instanceof ApiError ? err.message : 'Failed to fetch goals'
      setError(errorMessage)
      console.error('Failed to fetch goals:', err)
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    fetchGoals()
  }, [fetchGoals])

  const addGoal = async (title: string): Promise<boolean> => {
    if (!user) return false

    try {
      const { goal } = await api.goals.create({ title })
      setGoals(prev => [...prev, { ...goal, subtasks: [] }])
      return true
    } catch (err) {
      const errorMessage = err instanceof ApiError ? err.message : 'Failed to add goal'
      setError(errorMessage)
      return false
    }
  }

  const editGoal = async (goalId: number, title: string) => {
    if (!user) return

    // Find the actual UUID from the legacy ID
    const goal = goals.find(g => parseInt(g.id.slice(-8), 16) === goalId)
    if (!goal) return

    try {
      const { goal: updatedGoal } = await api.goals.update(goal.id, { title })
      setGoals(prev => prev.map(g => g.id === goal.id ? { ...updatedGoal, subtasks: g.subtasks } : g))
    } catch (err) {
      const errorMessage = err instanceof ApiError ? err.message : 'Failed to edit goal'
      setError(errorMessage)
    }
  }

  const removeGoal = async (goalId: number) => {
    if (!user) return

    const goal = goals.find(g => parseInt(g.id.slice(-8), 16) === goalId)
    if (!goal) return

    try {
      await api.goals.delete(goal.id)
      setGoals(prev => prev.filter(g => g.id !== goal.id))
    } catch (err) {
      const errorMessage = err instanceof ApiError ? err.message : 'Failed to remove goal'
      setError(errorMessage)
    }
  }

  const addSubTask = async (goalId: number, text: string): Promise<boolean> => {
    if (!user) return false

    const goal = goals.find(g => parseInt(g.id.slice(-8), 16) === goalId)
    if (!goal) return false

    try {
      const { subtask } = await api.subtasks.create({ goal_id: goal.id, text })
      setGoals(prev => prev.map(g => 
        g.id === goal.id 
          ? { ...g, subtasks: [...(g.subtasks || []), subtask] }
          : g
      ))
      return true
    } catch (err) {
      const errorMessage = err instanceof ApiError ? err.message : 'Failed to add subtask'
      setError(errorMessage)
      return false
    }
  }

  const editSubTask = async (goalId: number, subTaskId: number, text: string) => {
    if (!user) return

    const goal = goals.find(g => parseInt(g.id.slice(-8), 16) === goalId)
    const subtask = goal?.subtasks?.find(st => parseInt(st.id.slice(-8), 16) === subTaskId)
    if (!goal || !subtask) return

    try {
      const { subtask: updatedSubtask } = await api.subtasks.update(subtask.id, { text })
      setGoals(prev => prev.map(g => 
        g.id === goal.id 
          ? { 
              ...g, 
              subtasks: g.subtasks?.map(st => st.id === subtask.id ? updatedSubtask : st) 
            }
          : g
      ))
    } catch (err) {
      const errorMessage = err instanceof ApiError ? err.message : 'Failed to edit subtask'
      setError(errorMessage)
    }
  }

  const removeSubTask = async (goalId: number, subTaskId: number) => {
    if (!user) return

    const goal = goals.find(g => parseInt(g.id.slice(-8), 16) === goalId)
    const subtask = goal?.subtasks?.find(st => parseInt(st.id.slice(-8), 16) === subTaskId)
    if (!goal || !subtask) return

    try {
      await api.subtasks.delete(subtask.id)
      setGoals(prev => prev.map(g => 
        g.id === goal.id 
          ? { ...g, subtasks: g.subtasks?.filter(st => st.id !== subtask.id) }
          : g
      ))
    } catch (err) {
      const errorMessage = err instanceof ApiError ? err.message : 'Failed to remove subtask'
      setError(errorMessage)
    }
  }

  const toggleSubTask = async (goalId: number, subTaskId: number, onCompleted?: () => void) => {
    if (!user) return

    const goal = goals.find(g => parseInt(g.id.slice(-8), 16) === goalId)
    const subtask = goal?.subtasks?.find(st => parseInt(st.id.slice(-8), 16) === subTaskId)
    if (!goal || !subtask) return

    const newCompleted = !subtask.completed

    try {
      const { subtask: updatedSubtask } = await api.subtasks.update(subtask.id, { completed: newCompleted })
      setGoals(prev => prev.map(g => 
        g.id === goal.id 
          ? { 
              ...g, 
              subtasks: g.subtasks?.map(st => st.id === subtask.id ? updatedSubtask : st) 
            }
          : g
      ))

      if (newCompleted && onCompleted) {
        onCompleted()
      }
    } catch (err) {
      const errorMessage = err instanceof ApiError ? err.message : 'Failed to toggle subtask'
      setError(errorMessage)
    }
  }

  const finishSubTask = async (goalId: number, subTaskId: number, timeSpent: number, onAllCompleted?: () => void) => {
    if (!user) return

    const goal = goals.find(g => parseInt(g.id.slice(-8), 16) === goalId)
    const subtask = goal?.subtasks?.find(st => parseInt(st.id.slice(-8), 16) === subTaskId)
    if (!goal || !subtask) return

    try {
      const { subtask: updatedSubtask } = await api.subtasks.update(subtask.id, { 
        completed: true, 
        time_spent: timeSpent 
      })
      
      setGoals(prev => prev.map(g => 
        g.id === goal.id 
          ? { 
              ...g, 
              subtasks: g.subtasks?.map(st => st.id === subtask.id ? updatedSubtask : st) 
            }
          : g
      ))

      // Check if all goals are completed
      const updatedGoals = goals.map(g => 
        g.id === goal.id 
          ? { 
              ...g, 
              subtasks: g.subtasks?.map(st => st.id === subtask.id ? updatedSubtask : st) 
            }
          : g
      )
      
      const allGoalsCompleted = updatedGoals.every(goal => 
        goal.subtasks?.every(subTask => subTask.completed) ?? true
      )
      
      if (allGoalsCompleted && onAllCompleted) {
        onAllCompleted()
      }
    } catch (err) {
      const errorMessage = err instanceof ApiError ? err.message : 'Failed to finish subtask'
      setError(errorMessage)
    }
  }

  const getGoalProgress = (goal: any): number => {
    if (!goal.subTasks || goal.subTasks.length === 0) return 0
    const completedSubTasks = goal.subTasks.filter((task: any) => task.completed).length
    return Math.round((completedSubTasks / goal.subTasks.length) * 100)
  }

  const canAddGoal = (): boolean => goals.length < MAX_DAILY_GOALS
  
  const canAddSubTask = (goalId: number): boolean => {
    const goal = goals.find(g => parseInt(g.id.slice(-8), 16) === goalId)
    return goal ? (goal.subtasks?.length || 0) < MAX_SUBTASKS_PER_GOAL : false
  }

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`
    } else {
      return `${secs}s`
    }
  }

  return {
    goals: convertToLegacyFormat(goals),
    loading,
    error,
    addGoal,
    editGoal,
    removeGoal,
    addSubTask,
    editSubTask,
    removeSubTask,
    toggleSubTask,
    finishSubTask,
    getGoalProgress,
    canAddGoal,
    canAddSubTask,
    formatTime,
    maxDailyGoals: MAX_DAILY_GOALS,
    maxSubTasksPerGoal: MAX_SUBTASKS_PER_GOAL,
    refetch: fetchGoals
  }
}