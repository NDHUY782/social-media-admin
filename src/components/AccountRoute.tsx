// import React from "react";
// import { Navigate, RouteProps } from "react-router-dom";
// import { Login } from "../pages/Account";
// import { AccountState } from "../store/accounts/types";
// import { useSelector } from "react-redux";
// import { AppState } from "../store";

// // export const AccountRoute = ({ children }: { children: React.ReactNode }) => {
// //   const account: AccountState = useSelector((state: AppState) => state.account);

// //   return account.token ? <Navigate to="/admin" replace /> : <>{children}</>;
// // };

// interface AccountRouteProps {
//   children: React.ReactNode;
// }

// export const AccountRoute: React.FC<AccountRouteProps> = ({ children }) => {
//   const account: AccountState = useSelector((state: AppState) => state.account);

//   // Nếu đã đăng nhập (có token), chuyển hướng về trang chính
//   return account.token ? <Navigate to="/" replace /> : <>{children}</>;
// };

// AccountRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { AccountState } from "../store/accounts/types";
import { useSelector } from "react-redux";
import { AppState } from "../store";

interface AccountRouteProps {
  children: React.ReactNode;
}

export const AccountRoute: React.FC<AccountRouteProps> = ({ children }) => {
  const account: AccountState = useSelector((state: AppState) => state.account);

  // Nếu đã đăng nhập (có token), chuyển hướng về trang chính
  return account.token ? <Navigate to="/admin" replace /> : <>{children}</>;
};
