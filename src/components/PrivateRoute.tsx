// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { AppState } from "../store";
// import { AccountState } from "../store/accounts/types";

// interface PrivateRouteProps {
//   children: React.ReactNode;
// }
// export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
//   const account: AccountState = useSelector((state: AppState) => state.account);

//   return account.token ? <>{children}</> : <Navigate to="/login" replace />;
// };
// PrivateRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState } from "../store";
import { AccountState } from "../store/accounts/types";

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const account: AccountState = useSelector((state: AppState) => state.account);

  // Nếu không có token, chuyển hướng đến trang đăng nhập
  return account.token ? <>{children}</> : <Navigate to="/login" replace />;
};
