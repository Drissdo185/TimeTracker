"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function DateTime() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <Card className="p-6 flex flex-col items-center justify-center">
      <Calendar className="w-12 h-12 text-blue-500 mb-2" />
      <div className="text-2xl font-bold text-gray-900 mb-1">
        {formatTime(currentTime)}
      </div>
      <div className="text-xl font-bold text-gray-900 mb-1">
        {formatDate(currentTime)}
      </div>
    </Card>
  );
}