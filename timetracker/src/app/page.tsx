"use client";
import { User, Search } from "lucide-react";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import StreakBadge from "./components/StreakBadge";
import DateTime from "./components/DateTime";
import DailyGoals from "./components/DailyGoals";
import Stopwatch from "./components/Stopwatch";
import TimeRadarChart from "./components/TimeRadarChart";
import { useGoals } from "./hooks/useGoals";

export default function Home() {
  const [streak, setStreak] = useState(0);
  const [selectedTask, setSelectedTask] = useState<{goalId: number, subTaskId: number, taskName: string} | null>(null);
  const [activeTask, setActiveTask] = useState<{goalId: number, subTaskId: number, taskName: string} | null>(null);
  
  const {
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
    maxDailyGoals,
    maxSubTasksPerGoal
  } = useGoals();

  const handleToggleSubTask = (goalId: number, subTaskId: number) => {
    toggleSubTask(goalId, subTaskId, () => setStreak(prev => prev + 1));
  };

  const handleAddGoal = (title: string): boolean => {
    return addGoal(title);
  };

  const handleAddSubTask = (goalId: number, text: string): boolean => {
    return addSubTask(goalId, text);
  };

  const handleSelectTask = (goalId: number, subTaskId: number, taskName: string) => {
    setSelectedTask({ goalId, subTaskId, taskName });
  };

  const handleStartTask = () => {
    if (selectedTask) {
      setActiveTask(selectedTask);
    }
  };

  const handleCancelSelection = () => {
    setSelectedTask(null);
  };

  const handleFinishTask = (timeSpent: number) => {
    if (activeTask) {
      finishSubTask(activeTask.goalId, activeTask.subTaskId, timeSpent, () => setStreak(prev => prev + 1));
      setActiveTask(null);
      setSelectedTask(null);
    }
  };

  const handleCancelTask = () => {
    setActiveTask(null);
    setSelectedTask(null);
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
                <Search className="w-4 h-4 text-gray-400" />
              </div>
            </div>
            
            {/* User Avatar */}
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-medium">
              <User size={20} />
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="w-full space-y-3">
          {/* Top Row */}
          <div className="flex gap-6">
            {/* Streak Badge */}
            <div className="flex-shrink-0 w-80">
              <StreakBadge streak={streak} />
            </div>
            
            {/* DateTime */}
            <div className="flex-shrink-0 w-80">
              <DateTime />
            </div>
            
            {/* Radar Chart - Takes remaining width */}
            <div className="flex-1">
              <TimeRadarChart 
                goals={goals}
                formatTime={formatTime}
              />
            </div>
          </div>
          
          {/* Bottom Row - Daily Goals spanning under Streak + DateTime */}
          <div className="w-[680px]">
            <DailyGoals 
              goals={goals}
              onToggleSubTask={handleToggleSubTask}
              onAddGoal={handleAddGoal}
              onEditGoal={editGoal}
              onRemoveGoal={removeGoal}
              onAddSubTask={handleAddSubTask}
              onEditSubTask={editSubTask}
              onRemoveSubTask={removeSubTask}
              getGoalProgress={getGoalProgress}
              canAddGoal={canAddGoal}
              canAddSubTask={canAddSubTask}
              maxDailyGoals={maxDailyGoals}
              maxSubTasksPerGoal={maxSubTasksPerGoal}
              onSelectTask={handleSelectTask}
              formatTime={formatTime}
              selectedTask={selectedTask}
              activeTask={activeTask}
            />
          </div>
        </div>
      </div>
    </div>
  );
}