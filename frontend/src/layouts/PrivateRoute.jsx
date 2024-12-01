import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import { isAccessTokenExpired } from '../utils/auth';

const PrivateRoute = ({ children }) => {
    const loggedIn = useAuthStore((state) => state.isLoggedIn);

    // Check if the access token is expired
    const accessToken = localStorage.getItem("access_token");
    if (accessToken && isAccessTokenExpired(accessToken)) {
        loggedIn = False;
        console.log(loggedIn);
    }

    return loggedIn ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;