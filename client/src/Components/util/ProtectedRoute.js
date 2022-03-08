import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ auth, children }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    if (auth !== isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
