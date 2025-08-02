"use client";
import { Play, Pause, CheckCircle, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface StopwatchProps {
  selectedTask?: {goalId: number, subTaskId: number, taskName: string} | null;
  activeTask?: {goalId: number, subTaskId: number, taskName: string} | null;
  onStartTask?: () => void;
  onFinishTask?: (timeSpent: number) => void;
  onCancelTask?: () => void;
  onCancelSelection?: () => void;
}

export default function Stopwatch({ 
  selectedTask, 
  activeTask, 
  onStartTask, 
  onFinishTask, 
  onCancelTask, 
  onCancelSelection 
}: StopwatchProps) {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  // Reset when activeTask becomes null
  useEffect(() => {
    if (!activeTask) {
      resetStopwatch();
    }
  }, [activeTask]);

  const startStopwatch = () => {
    if (!isRunning) {
      startTimeRef.current = Date.now() - elapsedTime;
      intervalRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
      setIsRunning(true);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setIsRunning(false);
    }
  };

  const resetStopwatch = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setElapsedTime(0);
    setIsRunning(false);
  };

  const handleStartTask = () => {
    resetStopwatch();
    if (onStartTask) {
      onStartTask();
    }
  };

  const handleFinishTask = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
    
    const timeInSeconds = Math.round(elapsedTime / 1000);
    if (onFinishTask) {
      onFinishTask(timeInSeconds);
    }
    resetStopwatch();
  };

  const handleCancelTask = () => {
    resetStopwatch();
    if (onCancelTask) {
      onCancelTask();
    }
  };

  const handleCancelSelection = () => {
    if (onCancelSelection) {
      onCancelSelection();
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const centiseconds = Math.floor((time % 1000) / 10);
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Show selection state (task selected but not started)
  if (selectedTask && !activeTask) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Task Timer</h3>
        
        {/* Selected Task Display */}
        <div className="bg-white rounded-lg p-4 mb-6 shadow-sm border-2 border-blue-200">
          <h4 className="text-xl text-gray-900 text-center mb-2">Selected Task</h4>
          <p className="text-lg text-gray-900 text-center">{selectedTask.taskName}</p>
        </div>
        
        {/* Ready to Start */}
        <div className="text-center mb-6">
          <div className="text-4xl md:text-5xl font-mono font-bold text-gray-800 mb-2">
            00:00.00
          </div>
          <div className="text-sm text-gray-600">Ready to start</div>
        </div>

        {/* Start/Cancel Buttons */}
        <div className="flex justify-center space-x-3">
          <button
            onClick={handleStartTask}
            className="flex items-center space-x-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
          >
            <Play size={20} />
            <span>Start</span>
          </button>

          <button
            onClick={handleCancelSelection}
            className="flex items-center space-x-2 px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
          >
            <X size={20} />
            <span>Cancel</span>
          </button>
        </div>
      </div>
    );
  }

  // Show active task state (timer running)
  if (activeTask) {
    return (
      <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Task Timer</h3>
        
        {/* Active Task Display */}
        <div className="bg-white rounded-lg p-4 mb-6 shadow-sm border-2 border-green-200">
          <h4 className="font-medium text-gray-900 text-center mb-2">Active Task</h4>
          <p className="text-sm text-gray-600 text-center">{activeTask.taskName}</p>
        </div>
        
        {/* Time Display */}
        <div className="text-center mb-8">
          <div 
            className="text-4xl md:text-5xl font-mono font-bold text-gray-800 mb-2"
            aria-live="polite"
            aria-label={`Task timer: ${formatTime(elapsedTime)}`}
          >
            {formatTime(elapsedTime)}
          </div>
          <div className="text-sm text-gray-600">MM:SS.CS</div>
        </div>

        {/* Control Buttons */}
        <div className="flex justify-center space-x-3 mb-4">
          <button
            onClick={startStopwatch}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              isRunning
                ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
            aria-label={isRunning ? 'Pause timer' : 'Resume timer'}
          >
            {isRunning ? <Pause size={18} /> : <Play size={18} />}
            <span>{isRunning ? 'Pause' : 'Resume'}</span>
          </button>

          <button
            onClick={handleFinishTask}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
            aria-label="Finish task"
          >
            <CheckCircle size={18} />
            <span>Finish</span>
          </button>

          <button
            onClick={handleCancelTask}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
            aria-label="Cancel task"
          >
            <X size={18} />
            <span>Cancel</span>
          </button>
        </div>

        {/* Status Indicator */}
        <div className="text-center">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
            isRunning 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {isRunning ? '🟢 Running' : '⏸️ Paused'}
          </span>
        </div>
      </div>
    );
  }

  // Default state (no task selected)
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col items-center justify-center">
      <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Task Timer</h3>
      <div className="text-center text-gray-500">
        <div className="text-3xl mb-2">⏱️</div>
        <p className="text-xl font-bold text-gray-900 mb-1">Click on a task to start timing</p>
      </div>
    </div>
  );
}