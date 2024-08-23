import {Box} from "@mui/material";
import {RightArrowIcon} from "../../assets/Icons/RightArrowIcon";
import {useState} from "react";
import styles from './styles.module.css'
import React from "react";
import {useAppDispatch, useAppSelector} from "../../redux/hooks.ts";
import {Route, updateRoutePath} from "../../redux/routeSlice.ts";
import {useNavigate} from "react-router-dom";

export type OptionsType = {
    name: string;
    isOpen: boolean;
    redirect?: string; // Mark as optional since it's not required in all cases
    children?: OptionsType[];
}

export const SideBar = () => {


    const optionsMock: OptionsType[] = [
        {
            name: "Usuarios",
            isOpen: false,
            redirect: '/users/'
        },
        {
            name: "Tratamientos",
            isOpen: false,
            children: [
                {
                    name: "Cristianos",
                    isOpen: false,
                    redirect: '/'
                },
                {
                    name: "No Cristianos",
                    isOpen: false,
                    redirect: '/',
                }
            ]
        },
    ];

    const [options, setOptions] = useState(optionsMock);
    const dispatch = useAppDispatch();
    const route: Route = useAppSelector((store) => store.route)
    const navigate = useNavigate()

    const handleSelectItem = (index: number) => {
        const updatedOptions = options.map((option, i) =>
            i === index ? {...option, isOpen: !option.isOpen} : option
        );
        // falta el set de la route cuando se hace un select
        const optionSelected = options[index]
        dispatch(updateRoutePath({id:'', name:optionSelected.name, route:optionSelected.redirect, position: route.path.length}))
        navigate(optionSelected.redirect ? optionSelected.redirect : '')
        setOptions(updatedOptions);
    }

    return (
        <Box className={styles.homeMenu}>
            {options.map((option, index) => (
                <>
                    <Box className={styles.menuTextContainer} onClick={() => handleSelectItem(index)}>
                        <h5>{option.name}</h5>
                        <RightArrowIcon width="16" height="16"/>
                    </Box>
                    {option.isOpen &&
                        option.children?.map((child, childIndex) => (
                            <Box key={childIndex} className={styles.menuTextContainer}>
                                <h5>{child.name}</h5>
                                <RightArrowIcon width="16" height="16"/>
                            </Box>
                        ))
                    }
                </>
            ))}
        </Box>


    )

}

export default SideBar;