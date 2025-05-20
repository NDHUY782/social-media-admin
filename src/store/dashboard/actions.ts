import { Dispatch } from "redux";
import {
  LOAD_DASHBOARD_STATS_REQUEST,
  LOAD_DASHBOARD_STATS_SUCCESS,
  LOAD_DASHBOARD_STATS_FAILURE,
  DashboardActionTypes,
} from "./types";
import { dashboardService } from "../../services/dashboard.service";

export const loadDashboardStats = () => {
  return async (dispatch: Dispatch<DashboardActionTypes>) => {
    try {
      dispatch({ type: LOAD_DASHBOARD_STATS_REQUEST });

      const stats = await dashboardService.getDashboardStats();

      dispatch({
        type: LOAD_DASHBOARD_STATS_SUCCESS,
        payload: stats,
      });
    } catch (error) {
      dispatch({
        type: LOAD_DASHBOARD_STATS_FAILURE,
        payload: (error as Error).message,
      });
    }
  };
};
