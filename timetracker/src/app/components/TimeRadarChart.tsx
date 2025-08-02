"use client";

import { TrendingUp, Clock, Target } from "lucide-react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface SubTask {
  id: number;
  text: string;
  completed: boolean;
  timeSpent?: number;
}

interface Goal {
  id: number;
  title: string;
  completed: boolean;
  expanded: boolean;
  subTasks: SubTask[];
}

interface TimeRadarChartProps {
  goals: Goal[];
  formatTime: (seconds: number) => string;
}

const chartConfig = {
  timeSpent: {
    label: "Time Spent",
    color: "var(--chart-1)",
  },
  completionRate: {
    label: "Completion Rate",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export default function TimeRadarChart({ goals, formatTime }: TimeRadarChartProps) {
  // Transform goals data for radar chart
  const chartData = goals.map((goal) => {
    const completedTasks = goal.subTasks.filter(task => task.completed).length;
    const totalTasks = goal.subTasks.length;
    const totalTimeSpent = goal.subTasks.reduce((sum, task) => sum + (task.timeSpent || 0), 0);
    
    // Convert time to minutes for better chart visualization
    const timeInMinutes = Math.round(totalTimeSpent / 60);
    
    // Calculate completion percentage (0-100)
    const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    
    return {
      goal: goal.title.length > 15 ? goal.title.substring(0, 15) + "..." : goal.title,
      fullTitle: goal.title,
      timeSpent: timeInMinutes,
      timeSpentSeconds: totalTimeSpent,
      completedTasks,
      totalTasks,
      completionRate: Math.round(completionRate),
    };
  });

  // Calculate max values for better scaling
  const maxTime = Math.max(...chartData.map(d => d.timeSpent), 10);
  const maxTasks = Math.max(...chartData.map(d => d.totalTasks), 3);
  
  // Normalize data for radar chart (scale to 0-100 for better visualization)
  const normalizedData = chartData.map(item => ({
    ...item,
    normalizedTime: (item.timeSpent / maxTime) * 100,
    normalizedTotal: (item.totalTasks / maxTasks) * 100,
  }));

  // Calculate total metrics for footer
  const totalTimeSpent = chartData.reduce((sum, goal) => sum + goal.timeSpentSeconds, 0);
  const totalCompleted = chartData.reduce((sum, goal) => sum + goal.completedTasks, 0);
  const totalTasks = chartData.reduce((sum, goal) => sum + goal.totalTasks, 0);
  const averageCompletion = totalTasks > 0 ? Math.round((totalCompleted / totalTasks) * 100) : 0;

  if (goals.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Goal Progress Radar
          </CardTitle>
          <CardDescription>
            Track time spent and task completion across your goals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[300px] text-muted-foreground">
            <div className="text-center">
              <Target className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No goals available</p>
              <p className="text-sm">Add some goals to see the radar chart</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center flex-shrink-0">
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5" />
          Goal Progress Radar
        </CardTitle>
        <CardDescription>
          Time spent and task completion across your goals
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0 flex-1 flex flex-col">
        <ChartContainer
          config={chartConfig}
          className="w-full h-[250px]"
        >
          <RadarChart data={normalizedData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="goal" />
            <PolarGrid />
            <Radar
              dataKey="normalizedTime"
              fill="var(--color-timeSpent)"
              fillOpacity={0.6}
              dot={{
                r: 4,
                fillOpacity: 1,
              }}
            />
            <Radar
              dataKey="completionRate"
              fill="var(--color-completionRate)"
              fillOpacity={0.4}
              dot={{
                r: 3,
                fillOpacity: 1,
              }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Total progress: {averageCompletion}% completion rate
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground flex items-center gap-2 leading-none">
          <Clock className="h-3 w-3" />
          {formatTime(totalTimeSpent)} total time • {totalCompleted}/{totalTasks} tasks completed
        </div>
      </CardFooter>
    </Card>
  );
}