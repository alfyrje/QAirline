import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import { isAccessTokenExpired } from '../utils/auth';

const PrivateRoute = ({ children }) => {
    const loggedIn = useAuthStore((state) => state.isLoggedIn);
    const setLogout = useAuthStore((state) => state.setLogout);

    const accessToken = localStorage.getItem("access_token");
    if (accessToken && isAccessTokenExpired(accessToken)) {
        setLogout();
    }
    return loggedIn ? <>{children}</> : <Navigate to="/login" />;
};
export default PrivateRoute;