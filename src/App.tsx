import React from "react";
import "./App.css";
import "./styles/sb-admin-2.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { PrivateRoute } from "./components";
import { Login } from "./pages/Account";
import { Admin } from "./pages/Admin/Admin";
import { AccountRoute } from "./components/AccountRoute";
function App() {
  return (
    <div className="App" id="wrapper">
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              <AccountRoute>
                <Login />
              </AccountRoute>
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
