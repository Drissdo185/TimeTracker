// Frontend types
export interface Goal {
  id: number
  title: string
  completed: boolean
  expanded: boolean
  subTasks: SubTask[]
}

export interface SubTask {
  id: number
  text: string
  completed: boolean
  timeSpent?: number
}