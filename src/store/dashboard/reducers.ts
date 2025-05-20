import {
  DashboardState,
  DashboardActionTypes,
  LOAD_DASHBOARD_STATS_REQUEST,
  LOAD_DASHBOARD_STATS_SUCCESS,
  LOAD_DASHBOARD_STATS_FAILURE,
} from "./types";

const initialState: DashboardState = {
  totalPosts: 0,
  hiddenPosts: 0,
  monthReported: 0,
  weekReported: 0,
  visiblePosts: 0,
  reportedPosts: 0,
  loading: false,
  error: null,
};

export const dashboardReducer = (
  state: DashboardState = initialState,
  action: DashboardActionTypes
): DashboardState => {
  switch (action.type) {
    case LOAD_DASHBOARD_STATS_REQUEST:
      return { ...state, loading: true, error: null };
    case LOAD_DASHBOARD_STATS_SUCCESS:
      return { ...state, ...action.payload, loading: false };
    case LOAD_DASHBOARD_STATS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
