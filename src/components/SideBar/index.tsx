import {Box} from "@mui/material";
import {RightArrowIcon} from "../../assets/Icons/RightArrowIcon";
import styles from './styles.module.css'
import {useAppDispatch, useAppSelector} from "../../redux/hooks.ts";
import {Route, sliceRoutePath, updateRoutePath} from "../../redux/routeSlice.ts";
import {useNavigate} from "react-router-dom";

export type OptionsType = {
    name: string;
    redirect?: string; // Mark as optional since it's not required in all cases
}

export const SideBar = () => {


    const options: OptionsType[] = [
        {
            name: "Usuarios",
            redirect: '/users/'
        },
        {
            name: "Tratamientos",
            redirect: '/treatments',
        },
        {
            name: "Fondos y Perfiles",
            redirect: '/upload/content'
        },
        {
            name: "Diario",
            redirect: '/journalReview'
        }
    ];

    const dispatch = useAppDispatch();
    const route: Route = useAppSelector((store) => store.route)
    const navigate = useNavigate()



    const handleSelectItem = (index: number) => {
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
            {options.map((option, index) => (
                <Box className={styles.menuTextContainer} onClick={() => handleSelectItem(index)}>
                    <h5>{option.name}</h5>
                    <RightArrowIcon width="16" height="16"/>
                </Box>))}
        </Box>
    )

}

export default SideBar;
