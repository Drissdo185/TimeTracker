import { Flame } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StreakBadgeProps {
  streak: number;
}

export default function StreakBadge({ streak }: StreakBadgeProps) {
  return (
    <Card className="p-6 flex flex-col items-center justify-center">
      <Flame className="w-12 h-12 text-orange-500 mb-2" />
      <div className="text-2xl font-bold text-gray-900 mb-1">{streak}</div>
      <div className="text-xl font-bold text-gray-900 mb-1">Day Streak</div>
    </Card>
  );
}