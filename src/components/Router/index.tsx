import {createBrowserRouter, Navigate, Outlet} from "react-router-dom";
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
import UploadContent from "../../pages/shopItems/uploadContent";
import PrivateRoute from "../PrivateRoute";
import ShopItemsPage from '../../pages/shopItems';

const WithSideBarAndStepper = () => {
    return (
        <Box display={'flex'} flexDirection={'row'} height={'100vh'} width={'100%'}>
            <SideBar/>
            <Box flexDirection={'column'} display={'flex'} alignItems={'start'} padding={'0 16px'} width={'100%'}
                 style={{overflowX: 'scroll', backgroundColor: 'var(--secondary-100)'}}>
                <Box height={'100px'} width={'100%'}>
                    <Stepper/>
                </Box>
                <Box display={'flex'} justifyContent={'center'} margin={'24px 0'} width={'100%'} padding={'0 100px'} >
                    <Outlet/>
                </Box>
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
            element: <PrivateRoute/>,
            children: [
                {
                    element: <WithSideBarAndStepper/>,
                    children: [
                        {
                            path:'/',
                            element: <Navigate to={'/users/'}/>
                        },
                        {
                            path: '/users/',
                            element: <UsersPage/>
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
                        },
                        {
                            path: '*',
                            element: <h1>¿Te confundiste? 🧐</h1>
                        },
                        {
                            path: '/shop-items',
                            element: <ShopItemsPage/>
                        }
                    ]
                }
            ]
        },
    ]
)