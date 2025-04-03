import React from "react";
import "./App.css";
import "./styles/sb-admin-2.min.css";
import "./styles/sb-admin-2.css";
import "./assets/font-awesome/css/all.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PrivateRoute, AccountRoute } from "./components";
import { Login } from "./pages/Account";
import { Admin } from "./pages/Admin";
import NoAccess from "./pages/No Access/NoAccess";

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
            path="/admin"
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            }
          />
          <Route
            path="*"
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            }
          />
          <Route path="/no-access" element={<NoAccess />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
