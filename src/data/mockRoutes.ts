export interface RouteStep {
  instruction: string;
  distance: string;
  duration: string;
  icon: string; // 用于显示转向图标
}

export interface RouteInfo {
  totalDistance: string;
  totalDuration: string;
  steps: RouteStep[];
}

export const mockRoutes: Record<number, RouteInfo> = {
  1: {
    totalDistance: "5.2 km",
    totalDuration: "15 分钟",
    steps: [
      {
        instruction: "从当前位置出发,向东行驶",
        distance: "300m",
        duration: "2分钟",
        icon: "→"
      },
      {
        instruction: "在渋谷十字路口右转",
        distance: "1.2km",
        duration: "4分钟",
        icon: "↱"
      },
      {
        instruction: "沿明治通り直行",
        distance: "2.5km",
        duration: "6分钟",
        icon: "→"
      },
      {
        instruction: "在代々木站左转",
        distance: "800m",
        duration: "2分钟",
        icon: "↰"
      },
      {
        instruction: "到达目的地:渋谷区神南1-1-1",
        distance: "400m",
        duration: "1分钟",
        icon: "⚑"
      }
    ]
  },
  // 可以为其他联系人添加更多路线
};
