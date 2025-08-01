"use client";
import { User, Search } from "lucide-react";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import StreakBadge from "../components/StreakBadge";
import DateTime from "../components/DateTime";
import DailyGoals from "../components/DailyGoals";
import Stopwatch from "../components/Stopwatch";
import TimeRadarChart from "../components/TimeRadarChart";
import { useGoalsApi } from "../hooks/useGoalsApi";
import { useAuth } from "@/components/auth/AuthProvider";

export default function Dashboard() {
  const { user, signOut } = useAuth()
  const [streak, setStreak] = useState(0);
  const [selectedTask, setSelectedTask] = useState<{goalId: number, subTaskId: number, taskName: string} | null>(null);
  const [activeTask, setActiveTask] = useState<{goalId: number, subTaskId: number, taskName: string} | null>(null);
  
  const {
    goals,
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
    maxDailyGoals,
    maxSubTasksPerGoal
  } = useGoalsApi();

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

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg text-red-600">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 p-6 bg-gray-50 overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          
          {/* Search Bar and User */}
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
            
            {/* User Avatar with Dropdown */}
            <div className="relative group">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-medium cursor-pointer">
                <User size={20} />
              </div>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                <div className="py-1">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">
                    {user?.email}
                  </div>
                  <button
                    onClick={signOut}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="w-full">
          {/* Top Row */}
          <div className="flex gap-6 mb-0">
            {/* Streak Badge */}
            <div className="flex-shrink-0 w-80 h-30">
              <StreakBadge streak={streak} />
            </div>
            
            {/* DateTime */}
            <div className="flex-shrink-0 w-80 h-30">
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
          
          {/* Bottom Row */}
          <div className="flex gap-6">
            {/* Daily Goals spanning under Streak + DateTime */}
            <div className="w-[665px] -mt-50">
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
            
            {/* Stopwatch below radar chart */}
            <div className="flex-1 mt-6">
              <Stopwatch 
                selectedTask={selectedTask}
                activeTask={activeTask}
                onStartTask={handleStartTask}
                onFinishTask={handleFinishTask}
                onCancelTask={handleCancelTask}
                onCancelSelection={handleCancelSelection}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}