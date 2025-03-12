import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState } from "../store";
import { AccountState } from "../store/accounts/types";

// Định nghĩa props interface rõ ràng
interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const account: AccountState = useSelector((state: AppState) => state.account);

  // Kiểm tra token tồn tại
  return account.token ? <>{children}</> : <Navigate to="/login" replace />;
};
