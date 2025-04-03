import React from "react";
import { useNavigate } from "react-router-dom";

const NoAccess: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Access Denied</h2>
      <button onClick={() => navigate("/")}>Go to Login</button>
    </div>
  );
};
export default NoAccess;
