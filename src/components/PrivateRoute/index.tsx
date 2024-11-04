import { Navigate, Outlet } from "react-router-dom";
import {useGetUsers} from "../../service/api.ts";
import {getToken} from "../../service/store.ts";

const PrivateRoute = () => {
    const token = getToken();
    // Make a query to the backend to verify that the token is valid
    useGetUsers(1, '');
    return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;