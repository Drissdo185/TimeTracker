interface StreakBadgeProps {
  streak: number;
}

export default function StreakBadge({ streak }: StreakBadgeProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col items-center justify-center">
      <div className="text-5xl mb-2">🔥</div>
      <div className="text-2xl font-bold text-gray-900 mb-1">{streak}</div>
      <div className="text-xl font-bold text-gray-900 mb-1">Day Streak</div>
    </div>
  );
}