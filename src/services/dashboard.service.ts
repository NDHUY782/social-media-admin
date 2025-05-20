import { api } from "../helpers";

export interface IDashboardStats {
  totalPosts: number;
  hiddenPosts: number;
  visiblePosts: number;
  reportedPosts: number;
  weekReported: number;
  monthReported: number;
}

const getDashboardStats = async (): Promise<IDashboardStats> => {
  const [statsRes, totalRes] = await Promise.all([
    api.get("/reported-posts/stats"),
    api.get("/reported-posts/total"),
  ]);

  return {
    totalPosts: totalRes.data.totalPosts,
    hiddenPosts: totalRes.data.hiddenPosts,
    visiblePosts: totalRes.data.visiblePosts,
    reportedPosts: totalRes.data.totalReported,
    weekReported: statsRes.data.weekReported,
    monthReported: statsRes.data.monthReported,
  };
};

export const dashboardService = {
  getDashboardStats,
};
