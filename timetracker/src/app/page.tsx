"use client";
import { User } from "lucide-react";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import StreakBadge from "./components/StreakBadge";
import DailyGoals from "./components/DailyGoals";
import Stopwatch from "./components/Stopwatch";

export default function Home() {
  const [streak, setStreak] = useState(0);
  
  const [goals, setGoals] = useState([
    {
      id: 1,
      title: "Launch New Product",
      completed: false,
      expanded: false,
      subTasks: [
        { id: 1, text: "Complete market research", completed: false },
        { id: 2, text: "Design product mockups", completed: false },
        { id: 3, text: "Develop MVP features", completed: false }
      ]
    },
    {
      id: 2,
      title: "Improve Team Productivity",
      completed: false,
      expanded: false,
      subTasks: [
        { id: 1, text: "Implement daily standups", completed: false },
        { id: 2, text: "Set up project management tool", completed: false },
        { id: 3, text: "Create team guidelines", completed: false }
      ]
    },
    {
      id: 3,
      title: "Personal Development",
      completed: false,
      expanded: false,
      subTasks: [
        { id: 1, text: "Complete React certification", completed: false },
        { id: 2, text: "Read 2 technical books", completed: false },
        { id: 3, text: "Attend 3 conferences", completed: false }
      ]
    }
  ]);

  const addGoal = (title) => {
    const newGoal = {
      id: Math.max(...goals.map(g => g.id), 0) + 1,
      title,
      completed: false,
      expanded: false,
      subTasks: []
    };
    setGoals([...goals, newGoal]);
  };

  const editGoal = (goalId, title) => {
    setGoals(goals.map(goal =>
      goal.id === goalId ? { ...goal, title } : goal
    ));
  };

  const removeGoal = (goalId) => {
    setGoals(goals.filter(goal => goal.id !== goalId));
  };

  const addSubTask = (goalId, text) => {
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
  };

  const editSubTask = (goalId, subTaskId, text) => {
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

  const removeSubTask = (goalId, subTaskId) => {
    setGoals(goals.map(goal =>
      goal.id === goalId
        ? {
            ...goal,
            subTasks: goal.subTasks.filter(subTask => subTask.id !== subTaskId)
          }
        : goal
    ));
  };

  const toggleSubTask = (goalId, subTaskId) => {
    const updatedGoals = goals.map(goal =>
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
    );
    
    setGoals(updatedGoals);
    
    // Check if all goals are completed
    const allGoalsCompleted = updatedGoals.every(goal => 
      goal.subTasks.every(subTask => subTask.completed)
    );
    
    if (allGoalsCompleted) {
      setStreak(prev => prev + 1);
      // Reset all goals for the next day
      setTimeout(() => {
        setGoals(updatedGoals.map(goal => ({
          ...goal,
          expanded: false,
          subTasks: goal.subTasks.map(subTask => ({
            ...subTask,
            completed: false
          }))
        })));
      }, 2000);
    }
  };

  const getGoalProgress = (goal) => {
    const completedSubTasks = goal.subTasks.filter(task => task.completed).length;
    return Math.round((completedSubTasks / goal.subTasks.length) * 100);
  };


  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 p-6 bg-gray-50 overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          
          {/* Search Bar */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search anything..."
                className="w-80 pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <span className="text-gray-400">🔍</span>
              </div>
            </div>
            
            {/* User Avatar */}
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-medium">
              <User size={20} />
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          <StreakBadge streak={streak} />
        </div>

        {/* Bottom Section */}
        <div className="max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DailyGoals 
              goals={goals}
              onToggleSubTask={toggleSubTask}
              onAddGoal={addGoal}
              onEditGoal={editGoal}
              onRemoveGoal={removeGoal}
              onAddSubTask={addSubTask}
              onEditSubTask={editSubTask}
              onRemoveSubTask={removeSubTask}
              getGoalProgress={getGoalProgress}
            />

            <Stopwatch />
          </div>
        </div>
      </div>
    </div>
  );
}