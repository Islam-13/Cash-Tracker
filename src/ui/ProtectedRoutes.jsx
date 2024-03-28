import { Navigate } from "react-router-dom";

function ProtectedRoutes({ children }) {
  return (
    <div>
      {localStorage.getItem("userId") ? children : <Navigate to="/signin" />}
    </div>
  );
}

export default ProtectedRoutes;
