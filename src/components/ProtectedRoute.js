// components/ProtectedRoute.js
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import toast from "react-hot-toast";

const ProtectedRoute = ({ children }) => {
  const { user } = useUser();

  if (!user) {
    toast.error("Please login to continue checkout"); // show toast
    return <Navigate to="/sign-in" replace />;
  }

  return children;
};

export default ProtectedRoute;
