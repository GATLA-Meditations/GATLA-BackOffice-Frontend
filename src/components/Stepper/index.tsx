import {useAppSelector} from "../../redux/hooks.ts";
import {Box} from "@mui/material";
import {RightArrowIcon} from "../../assets/Icons/RightArrowIcon";
import styles from './styles.module.css'
import {LeftArrowIcon} from "../../assets/Icons/LeftArrowIcon";


export const Stepper = () => {
    const route: string[] = useAppSelector((store) => store.route.path)

    const handleItemOnClick = () => {
        console.log('item')
    }


    return (
        <Box className={styles.routeContainer}>
            <LeftArrowIcon width='16' height='16'/>
            {route.map((item) =>
                (
                    <Box className={styles.routeItem} onClick={() => handleItemOnClick()}>
                        <p>{item}</p>

                            <RightArrowIcon width="16" height="16"/>
                    </Box>
                )
            )}
        </Box>

    )

}
export default Stepper