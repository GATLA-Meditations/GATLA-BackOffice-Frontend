import {useAppDispatch, useAppSelector} from "../../redux/hooks.ts";
import {Box} from "@mui/material";
import {RightArrowIcon} from "../../assets/Icons/RightArrowIcon";
import styles from './styles.module.css'
import {LeftArrowIcon} from "../../assets/Icons/LeftArrowIcon";

import {useNavigate} from "react-router-dom";
import {removeRoutePath, Route, sliceRoutePath} from "../../redux/routeSlice.ts";
import {StepperItem} from "../../types";


export const Stepper = () => {
    const route: Route = useAppSelector((store) => store.route)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()


    const handleItemOnClick = (item: StepperItem) => {
        dispatch(sliceRoutePath(item.position));
        navigate(item.route + item.id)
    }

    const handleGoBackOnClick = async () => {
        dispatch(removeRoutePath());
        navigate(-1)
    }

    return (
        <Box className={styles.routeContainer}>
            <LeftArrowIcon width='24' height='24' onClick={() => handleGoBackOnClick()}/>
            {route.path.map((item) =>
                (
                    <Box className={styles.routeItem}>
                        <p className={styles.routeItemText} onClick={() => handleItemOnClick(item)}>{item.name}</p>
                        <RightArrowIcon width="14" height="14"/>
                    </Box>
                )
            )}
        </Box>

    )

}
export default Stepper