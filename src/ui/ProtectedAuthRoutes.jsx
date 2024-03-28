import { Navigate } from "react-router-dom";

function ProtectedAuthRoutes({ children }) {
  return (
    <>{!localStorage.getItem("userId") ? children : <Navigate to="/" />}</>
  );
}

export default ProtectedAuthRoutes;
