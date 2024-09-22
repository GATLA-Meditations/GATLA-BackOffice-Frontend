import {Box} from "@mui/material";
import {RightArrowIcon} from "../../assets/Icons/RightArrowIcon";
import {useState} from "react";
import styles from './styles.module.css'
import {useAppDispatch, useAppSelector} from "../../redux/hooks.ts";
import {Route, sliceRoutePath, updateRoutePath} from "../../redux/routeSlice.ts";
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
            redirect:'/treatments',
        },
    ];

    const [options, setOptions] = useState(optionsMock);
    const dispatch = useAppDispatch();
    const route: Route = useAppSelector((store) => store.route)
    const navigate = useNavigate()


    const handleSelectChildItem = (parentIndex:number, index:number) => {
        const optionSelected = options[parentIndex].children?.[index];
        dispatchRoute(optionSelected)
    }


    const handleSelectItem = (index: number) => {
        const updatedOptions = options.map((option, i) =>
            i === index ? {...option, isOpen: !option.isOpen} : option
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
            {options.map((option, index) => (
                <>
                    <Box className={styles.menuTextContainer} onClick={() => handleSelectItem(index)}>
                        <h5>{option.name}</h5>
                        <RightArrowIcon width="16" height="16"/>
                    </Box>
                    {option.isOpen &&
                        option.children?.map((child, childIndex) => (
                            <Box key={childIndex} className={styles.menuTextContainer} onClick={() => handleSelectChildItem(index, childIndex)}>
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
