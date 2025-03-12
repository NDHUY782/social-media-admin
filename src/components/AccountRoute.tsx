import React from "react";
import { Navigate, RouteProps } from "react-router-dom";
import { Login } from "../pages/Account";
import { AccountState } from "../store/accounts/types";
import { useSelector } from "react-redux";
import { AppState } from "../store";

export const AccountRoute = ({ children }: RouteProps) => {
  const account: AccountState = useSelector((state: AppState) => state.account);

  return account?.token ? (
    <Navigate to="/admin/home" replace />
  ) : (
    <Navigate to="/login" replace />
  );
};
