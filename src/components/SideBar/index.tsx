import {Box} from "@mui/material";
import {useState} from "react";
import styles from './styles.module.css'
import {useAppDispatch, useAppSelector} from "../../redux/hooks.ts";
import {Route, sliceRoutePath, updateRoutePath} from "../../redux/routeSlice.ts";
import {useNavigate} from "react-router-dom";
import Button from "../Button";
import {useLogOut} from "../../service/api.ts";

export type OptionsType = {
    name: string;
    redirect: string; // Mark as optional since it's not required in all cases
    children?: OptionsType[];
    active: boolean;
}

export const SideBar = () => {


    const optionsMock: OptionsType[] = [
        {
            name: "Usuarios",
            redirect: '/users/',
            active: false,
        },
        {
            name: "Tratamientos",
            redirect: '/treatments',
            active:false,
        },
        {
            name: "Fondos y Perfiles",
            redirect: '/upload/content',
            active:false,
        },
        {
            name: "Cuestionarios",
            redirect: '/questionnaire',
            active:false,
        },
        {
            name: "Exportar",
            redirect: '/export',
            active:false,
        }
    ];

    const [options, setOptions] = useState(optionsMock);
    const dispatch = useAppDispatch();
    const route: Route = useAppSelector((store) => store.route)
    const navigate = useNavigate()

    const handleLogOut = () => {
        useLogOut()
        window.location.href = "/login"
    }



    const handleSelectItem = (index: number) => {
        const updatedOptions = options.map((option, i) =>
            i === index ? {...option, active: true} : {...option, active: false}
        );
        setOptions(updatedOptions)
        dispatchRoute(options[index])
    }

    const dispatchRoute = (option: OptionsType | undefined) => {
        if (option?.redirect) {
            dispatch(sliceRoutePath(-1));
            dispatch(updateRoutePath({
                id: '',
                name: option.name,
                route: option.redirect,
                position: route.path.length
            }));
            navigate(option.redirect);
        }

    }
    


    return (
        <Box className={styles.homeMenu}>
            <Box className={styles.sidebarItems}>
                {options.map((option, index) => (
                    <Box className={`${styles.menuTextContainer} ${option.active || window.location.pathname.includes(option.redirect) ? styles.active : ''}`} onClick={() => handleSelectItem(index)}>
                        <p className={'body1'}>{option.name}</p>
                    </Box>))}
            </Box>
            <Button onClick={() => handleLogOut()} variant={'red'} size={'medium'}>
                <p className={'body1'}>Cerrar Sesión</p>
            </Button>
        </Box>
    )

}

export default SideBar;
