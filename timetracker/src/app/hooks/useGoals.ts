import { useState } from "react";

interface SubTask {
  id: number;
  text: string;
  completed: boolean;
  timeSpent?: number; // in seconds
}

interface Goal {
  id: number;
  title: string;
  completed: boolean;
  expanded: boolean;
  subTasks: SubTask[];
}

const MAX_DAILY_GOALS = 3;
const MAX_SUBTASKS_PER_GOAL = 3;

export function useGoals() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: 1,
      title: "Launch New Product",
      completed: false,
      expanded: false,
      subTasks: [
        { id: 1, text: "Complete market research", completed: true, timeSpent: 7200 }, // 2 hours
        { id: 2, text: "Design product mockups", completed: true, timeSpent: 5400 }, // 1.5 hours
        { id: 3, text: "Develop MVP features", completed: false, timeSpent: 3600 } // 1 hour
      ]
    },
    {
      id: 2,
      title: "Improve Team Productivity",
      completed: false,
      expanded: false,
      subTasks: [
        { id: 4, text: "Implement daily standups", completed: true, timeSpent: 1800 }, // 30 minutes
        { id: 5, text: "Set up project tracking", completed: true, timeSpent: 2700 }, // 45 minutes
        { id: 6, text: "Create team guidelines", completed: false }
      ]
    },
    {
      id: 3,
      title: "Learn New Technology",
      completed: false,
      expanded: false,
      subTasks: [
        { id: 7, text: "Read documentation", completed: true, timeSpent: 4500 }, // 1.25 hours
        { id: 8, text: "Build sample project", completed: false, timeSpent: 1800 }, // 30 minutes
        { id: 9, text: "Write tutorial blog post", completed: false }
      ]
    }
  ]);

  const addGoal = (title: string): boolean => {
    if (goals.length >= MAX_DAILY_GOALS) {
      return false;
    }
    const newGoal = {
      id: Math.max(...goals.map(g => g.id), 0) + 1,
      title,
      completed: false,
      expanded: false,
      subTasks: []
    };
    setGoals([...goals, newGoal]);
    return true;
  };

  const editGoal = (goalId: number, title: string) => {
    setGoals(goals.map(goal =>
      goal.id === goalId ? { ...goal, title } : goal
    ));
  };

  const removeGoal = (goalId: number) => {
    setGoals(goals.filter(goal => goal.id !== goalId));
  };

  const addSubTask = (goalId: number, text: string): boolean => {
    const goal = goals.find(g => g.id === goalId);
    if (!goal || goal.subTasks.length >= MAX_SUBTASKS_PER_GOAL) {
      return false;
    }
    setGoals(goals.map(goal =>
      goal.id === goalId
        ? {
            ...goal,
            subTasks: [
              ...goal.subTasks,
              {
                id: Math.max(...goal.subTasks.map(st => st.id), 0) + 1,
                text,
                completed: false
              }
            ]
          }
        : goal
    ));
    return true;
  };

  const editSubTask = (goalId: number, subTaskId: number, text: string) => {
    setGoals(goals.map(goal =>
      goal.id === goalId
        ? {
            ...goal,
            subTasks: goal.subTasks.map(subTask =>
              subTask.id === subTaskId
                ? { ...subTask, text }
                : subTask
            )
          }
        : goal
    ));
  };

  const removeSubTask = (goalId: number, subTaskId: number) => {
    setGoals(goals.map(goal =>
      goal.id === goalId
        ? {
            ...goal,
            subTasks: goal.subTasks.filter(subTask => subTask.id !== subTaskId)
          }
        : goal
    ));
  };

  const toggleSubTask = (goalId: number, subTaskId: number, onCompleted?: () => void) => {
    setGoals(goals.map(goal =>
      goal.id === goalId
        ? {
            ...goal,
            subTasks: goal.subTasks.map(subTask =>
              subTask.id === subTaskId
                ? { ...subTask, completed: !subTask.completed }
                : subTask
            )
          }
        : goal
    ));
    
    // Call the callback if a task was completed
    if (onCompleted) {
      const goal = goals.find(g => g.id === goalId);
      const subTask = goal?.subTasks.find(st => st.id === subTaskId);
      if (subTask && !subTask.completed) { // Was not completed, now it is
        onCompleted();
      }
    }
  };

  const finishSubTask = (goalId: number, subTaskId: number, timeSpent: number, onAllCompleted?: () => void) => {
    const updatedGoals = goals.map(goal =>
      goal.id === goalId
        ? {
            ...goal,
            subTasks: goal.subTasks.map(subTask =>
              subTask.id === subTaskId
                ? { ...subTask, completed: true, timeSpent }
                : subTask
            )
          }
        : goal
    );
    
    setGoals(updatedGoals);
    
    // Check if all goals are completed
    const allGoalsCompleted = updatedGoals.every(goal => 
      goal.subTasks.every(subTask => subTask.completed)
    );
    
    if (allGoalsCompleted && onAllCompleted) {
      onAllCompleted();
      // Reset all goals for the next day
      setTimeout(() => {
        setGoals(updatedGoals.map(goal => ({
          ...goal,
          expanded: false,
          subTasks: goal.subTasks.map(subTask => ({
            ...subTask,
            completed: false,
            timeSpent: undefined
          }))
        })));
      }, 2000);
    }
  };

  const getGoalProgress = (goal: Goal): number => {
    const completedSubTasks = goal.subTasks.filter(task => task.completed).length;
    return Math.round((completedSubTasks / goal.subTasks.length) * 100);
  };

  const canAddGoal = (): boolean => goals.length < MAX_DAILY_GOALS;
  
  const canAddSubTask = (goalId: number): boolean => {
    const goal = goals.find(g => g.id === goalId);
    return goal ? goal.subTasks.length < MAX_SUBTASKS_PER_GOAL : false;
  };

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  return {
    goals,
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
    maxSubTasksPerGoal: MAX_SUBTASKS_PER_GOAL
  };
}

export type { Goal, SubTask };