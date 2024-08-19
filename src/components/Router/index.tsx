import {createBrowserRouter, Outlet} from "react-router-dom";
import Home from "../../pages/home";
import Activity from "../../pages/activity";
import SideBar from "../SideBar";
import Stepper from "../Stepper";
import {Box} from "@mui/material";


const WithSideBarAndStepper = () => {
    return (
        <Box display={'flex'} flexDirection={'row'} height={'100vh'} width={'100%'}>
            <SideBar/>
            <Box flexDirection={'column'}>
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
                }
            ]
        }
    ]
)