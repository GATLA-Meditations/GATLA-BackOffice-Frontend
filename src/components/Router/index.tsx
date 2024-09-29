import {createBrowserRouter, Outlet} from "react-router-dom";
import Home from "../../pages/home";
import Activity from "../../pages/activity";
import SideBar from "../SideBar";
import Stepper from "../Stepper";
import {Box} from "@mui/material";
import CreateUser from "../../pages/createUser";
import ModifyUser from "../../pages/modifyUser";
import Module from "../../pages/module";
import UsersPage from "../../pages/users";
import Login from "../../pages/login";
import TreatmentsPage from "../../pages/treatment/list-treatments";
import EditTreatment from "../../pages/treatment/edit-treatment";
import EditQuestionnaire from '../../pages/questionnaire/edit-questionnaire';
import QuestionnairesPage from '../../pages/questionnaire/list-questionnaires';
import UploadContent from "../../pages/uploadContent";


const WithSideBarAndStepper = () => {
    return (
        <Box display={'flex'} flexDirection={'row'} height={'100vh'} width={'100%'}>
            <SideBar/>
            <Box flexDirection={'column'} display={'flex'} alignItems={'start'} margin={'0 16px'} width={'100%'} style={{overflowX:'scroll'}}>
                <Box height={'100px'} width={'100%'}>
                    <Stepper/>
                </Box>
                <Outlet/>
            </Box>
        </Box>

    )
}

export const Router = createBrowserRouter([
        {
            path: '/login',
            element: <Login/>
        },
        {
            element: <WithSideBarAndStepper/>,
            children: [
                {
                    path: '/',
                    element: <Home/>
                },
                {
                    path: '/module/:id',
                    element: <Module/>
                },
                {
                    path: '/activity/:id',
                    element: <Activity/>
                },
                {
                    path: '/users/',
                    element: <UsersPage/>
                },
                {
                    path: '/user/create',
                    element: <CreateUser/>
                },
                {
                    path: '/user/modify',
                    element: <ModifyUser/>
                },
                {
                    path: '/treatments',
                    element: <TreatmentsPage/>
                },
                {
                    path: '/treatments/:id',
                    element: <EditTreatment/>
                },
                {
                    path: '/questionnaire',
                    element: <QuestionnairesPage/>
                },
                {
                    path: '/questionnaire/:id',
                    element: <EditQuestionnaire/>
                },
                {
                    path: '/upload/content',
                    element: <UploadContent/>
                }
            ]
        }
    ]
)