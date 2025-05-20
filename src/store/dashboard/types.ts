export const LOAD_DASHBOARD_STATS_REQUEST = "LOAD_DASHBOARD_STATS_REQUEST";
export const LOAD_DASHBOARD_STATS_SUCCESS = "LOAD_DASHBOARD_STATS_SUCCESS";
export const LOAD_DASHBOARD_STATS_FAILURE = "LOAD_DASHBOARD_STATS_FAILURE";

export interface DashboardStats {
  totalPosts: number;
  hiddenPosts: number;
  monthReported: number;
  weekReported: number;
  visiblePosts: number;
  reportedPosts: number;
}

export interface DashboardState extends DashboardStats {
  loading: boolean;
  error: string | null;
}

interface LoadDashboardStatsRequest {
  type: typeof LOAD_DASHBOARD_STATS_REQUEST;
}

interface LoadDashboardStatsSuccess {
  type: typeof LOAD_DASHBOARD_STATS_SUCCESS;
  payload: DashboardStats;
}

interface LoadDashboardStatsFailure {
  type: typeof LOAD_DASHBOARD_STATS_FAILURE;
  payload: string;
}

export type DashboardActionTypes =
  | LoadDashboardStatsRequest
  | LoadDashboardStatsSuccess
  | LoadDashboardStatsFailure;
