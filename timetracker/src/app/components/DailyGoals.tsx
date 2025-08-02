"use client";
import { useState } from "react";
import { Plus, Edit2, Trash2, Check, X } from "lucide-react";

interface SubTask {
  id: number;
  text: string;
  completed: boolean;
}

interface Goal {
  id: number;
  title: string;
  completed: boolean;
  expanded: boolean;
  subTasks: SubTask[];
}

interface DailyGoalsProps {
  goals: Goal[];
  onToggleSubTask: (goalId: number, subTaskId: number) => void;
  onAddGoal: (title: string) => boolean;
  onEditGoal: (goalId: number, title: string) => void;
  onRemoveGoal: (goalId: number) => void;
  onAddSubTask: (goalId: number, text: string) => boolean;
  onEditSubTask: (goalId: number, subTaskId: number, text: string) => void;
  onRemoveSubTask: (goalId: number, subTaskId: number) => void;
  getGoalProgress: (goal: Goal) => number;
  canAddGoal: () => boolean;
  canAddSubTask: (goalId: number) => boolean;
  maxDailyGoals: number;
  maxSubTasksPerGoal: number;
  onSelectTask: (goalId: number, subTaskId: number, taskName: string) => void;
  formatTime: (seconds: number) => string;
  selectedTask?: {goalId: number, subTaskId: number, taskName: string} | null;
  activeTask?: {goalId: number, subTaskId: number, taskName: string} | null;
}

export default function DailyGoals({ 
  goals, 
  onToggleSubTask,
  onAddGoal,
  onEditGoal,
  onRemoveGoal,
  onAddSubTask,
  onEditSubTask,
  onRemoveSubTask,
  getGoalProgress,
  canAddGoal,
  canAddSubTask,
  maxDailyGoals,
  maxSubTasksPerGoal,
  onSelectTask,
  formatTime,
  selectedTask,
  activeTask
}: DailyGoalsProps) {
  const [editingGoal, setEditingGoal] = useState<number | null>(null);
  const [editingSubTask, setEditingSubTask] = useState<{goalId: number, subTaskId: number} | null>(null);
  const [newGoalTitle, setNewGoalTitle] = useState("");
  const [editGoalTitle, setEditGoalTitle] = useState("");
  const [newSubTaskText, setNewSubTaskText] = useState("");
  const [editSubTaskText, setEditSubTaskText] = useState("");
  const [showNewGoalForm, setShowNewGoalForm] = useState(false);
  const [showNewSubTaskForm, setShowNewSubTaskForm] = useState<number | null>(null);
  const handleAddGoal = () => {
    if (newGoalTitle.trim()) {
      const success = onAddGoal(newGoalTitle.trim());
      if (success) {
        setNewGoalTitle("");
        setShowNewGoalForm(false);
      }
    }
  };

  const handleEditGoal = (goalId: number) => {
    if (editGoalTitle.trim()) {
      onEditGoal(goalId, editGoalTitle.trim());
      setEditingGoal(null);
      setEditGoalTitle("");
    }
  };

  const handleAddSubTask = (goalId: number) => {
    if (newSubTaskText.trim()) {
      const success = onAddSubTask(goalId, newSubTaskText.trim());
      if (success) {
        setNewSubTaskText("");
        setShowNewSubTaskForm(null);
      }
    }
  };

  const handleEditSubTask = (goalId: number, subTaskId: number) => {
    if (editSubTaskText.trim()) {
      onEditSubTask(goalId, subTaskId, editSubTaskText.trim());
      setEditingSubTask(null);
      setEditSubTaskText("");
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Daily Goals</h3>
          <p className="text-sm text-gray-500">{goals.length}/{maxDailyGoals} goals</p>
        </div>
        <button
          onClick={() => setShowNewGoalForm(true)}
          disabled={!canAddGoal()}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-colors ${
            canAddGoal() 
              ? 'bg-green-500 hover:bg-green-600 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <Plus size={16} />
          <span>Add Goal</span>
        </button>
      </div>

      {/* New Goal Form */}
      {showNewGoalForm && (
        <div className="mb-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={newGoalTitle}
              onChange={(e) => setNewGoalTitle(e.target.value)}
              placeholder="Enter goal title..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              autoFocus
            />
            <button
              onClick={handleAddGoal}
              className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors"
            >
              <Check size={16} />
            </button>
            <button
              onClick={() => {setShowNewGoalForm(false); setNewGoalTitle("");}}
              className="p-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {goals.map(goal => (
          <div key={goal.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3 flex-1">
                {editingGoal === goal.id ? (
                  <div className="flex items-center space-x-2 flex-1">
                    <input
                      type="text"
                      value={editGoalTitle}
                      onChange={(e) => setEditGoalTitle(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 bg-white"
                      autoFocus
                    />
                    <button
                      onClick={() => handleEditGoal(goal.id)}
                      className="p-1 text-green-600 hover:text-green-800"
                    >
                      <Check size={16} />
                    </button>
                    <button
                      onClick={() => {setEditingGoal(null); setEditGoalTitle("");}}
                      className="p-1 text-gray-600 hover:text-gray-800"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <h4 className="font-medium text-gray-900 flex-1">{goal.title}</h4>
                )}
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-sm text-gray-600">
                  {getGoalProgress(goal)}%
                </div>
                {editingGoal !== goal.id && (
                  <button
                    onClick={() => {
                      setEditingGoal(goal.id);
                      setEditGoalTitle(goal.title);
                    }}
                    className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-1 rounded transition-colors"
                    title="Edit goal"
                  >
                    <Edit2 size={16} />
                  </button>
                )}
                <button
                  onClick={() => onRemoveGoal(goal.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded transition-colors"
                  title="Remove goal"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4">
              <div 
                className="bg-green-500 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${getGoalProgress(goal)}%` }}
              ></div>
            </div>

            {/* Always show subtasks */}
            <div className="space-y-2 pl-4">
              {goal.subTasks.map(subTask => (
                <div key={subTask.id} className={`group flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg ${
                  selectedTask?.goalId === goal.id && selectedTask?.subTaskId === subTask.id 
                    ? 'bg-blue-50 border-2 border-blue-200' 
                    : activeTask?.goalId === goal.id && activeTask?.subTaskId === subTask.id
                    ? 'bg-green-50 border-2 border-green-200'
                    : ''
                }`}>
                  <input
                    type="checkbox"
                    checked={subTask.completed}
                    onChange={() => onToggleSubTask(goal.id, subTask.id)}
                    className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                  />
                  {editingSubTask?.goalId === goal.id && editingSubTask?.subTaskId === subTask.id ? (
                    <div className="flex items-center space-x-2 flex-1">
                      <input
                        type="text"
                        value={editSubTaskText}
                        onChange={(e) => setEditSubTaskText(e.target.value)}
                        className="flex-1 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm text-gray-900 bg-white"
                        autoFocus
                      />
                      <button
                        onClick={() => handleEditSubTask(goal.id, subTask.id)}
                        className="p-1 text-green-600 hover:text-green-800"
                      >
                        <Check size={14} />
                      </button>
                      <button
                        onClick={() => {setEditingSubTask(null); setEditSubTaskText("");}}
                        className="p-1 text-gray-600 hover:text-gray-800"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex-1 flex flex-col">
                        <button
                          onClick={() => !subTask.completed && onSelectTask(goal.id, subTask.id, subTask.text)}
                          disabled={subTask.completed}
                          className={`text-left text-sm ${
                            subTask.completed 
                              ? 'line-through text-gray-500' 
                              : 'text-gray-700 hover:text-blue-600 cursor-pointer'
                          }`}
                        >
                          {subTask.text}
                        </button>
                        {subTask.completed && subTask.timeSpent && (
                          <span className="text-xs text-green-600 mt-1">
                            ⏱️ {formatTime(subTask.timeSpent)}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          setEditingSubTask({goalId: goal.id, subTaskId: subTask.id});
                          setEditSubTaskText(subTask.text);
                        }}
                        className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-1 rounded transition-colors opacity-0 group-hover:opacity-100"
                        title="Edit subtask"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => onRemoveSubTask(goal.id, subTask.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded transition-colors opacity-0 group-hover:opacity-100"
                        title="Remove subtask"
                      >
                        <Trash2 size={14} />
                      </button>
                    </>
                  )}
                </div>
              ))}

              {/* Add SubTask Form */}
              {showNewSubTaskForm === goal.id ? (
                <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                  <div className="w-4 h-4"></div> {/* Spacer for checkbox alignment */}
                  <input
                    type="text"
                    value={newSubTaskText}
                    onChange={(e) => setNewSubTaskText(e.target.value)}
                    placeholder="Enter subtask..."
                    className="flex-1 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm text-gray-900"
                    autoFocus
                  />
                  <button
                    onClick={() => handleAddSubTask(goal.id)}
                    className="p-1 text-green-600 hover:text-green-800"
                  >
                    <Check size={14} />
                  </button>
                  <button
                    onClick={() => {setShowNewSubTaskForm(null); setNewSubTaskText("");}}
                    className="p-1 text-gray-600 hover:text-gray-800"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowNewSubTaskForm(goal.id)}
                  disabled={!canAddSubTask(goal.id)}
                  className={`flex items-center space-x-2 p-2 rounded-lg transition-colors text-sm w-full ${
                    canAddSubTask(goal.id)
                      ? 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                      : 'text-gray-400 cursor-not-allowed'
                  }`}
                  title={!canAddSubTask(goal.id) ? `Maximum ${maxSubTasksPerGoal} subtasks allowed` : ''}
                >
                  <div className="w-4 h-4"></div> {/* Spacer for checkbox alignment */}
                  <Plus size={14} />
                  <span className="text-gray-900">Add subtask ({goal.subTasks.length}/{maxSubTasksPerGoal})</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}