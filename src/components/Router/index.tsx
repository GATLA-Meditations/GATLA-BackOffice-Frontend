import {createBrowserRouter, Outlet} from "react-router-dom";
import Home from "../../pages/home";
import Activity from "../../pages/activity";
import SideBar from "../SideBar";
import Stepper from "../Stepper";
import {Box} from "@mui/material";
import DeleteUser from "../../pages/deleteUser";
import CreateUser from "../../pages/createUser";
import ModifyUser from "../../pages/modifyUser";
import UsersPage from "../../pages/users";


const WithSideBarAndStepper = () => {
    return (
        <Box display={'flex'} flexDirection={'row'} height={'100vh'} width={'100%'}>
            <SideBar/>
            <Box flexDirection={'column'} display={'flex'} alignItems={'start'} marginLeft={'16px'}>
                    <Stepper/>
                    <Outlet/>
            </Box>
        </Box>

    )
}

export const Router = createBrowserRouter([
        {
            element: <WithSideBarAndStepper/>,
            children: [
                {
                    path: '/',
                    element: <Home/>
                },
                {
                    path: '/activity/:id',
                    element: <Activity/>
                },
                {
                    path:'/users/',
                    element: <UsersPage/>
                },
                {
                    path: '/user/delete',
                    element: <DeleteUser/>
                },
                {
                    path: '/user/create',
                    element: <CreateUser/>
                },
                {
                    path: '/user/modify',
                    element: <ModifyUser/>
                }
            ]
        }
    ]
)