import {Box, Typography} from "@mui/material";
import {RightArrowIcon} from "../../assets/Icons/RightArrowIcon";
import styles from './styles.module.css'

export interface OptionsComponentProps {
    title: string;
    onClick: () => void;

}


const OptionComponent = ({title, onClick}: OptionsComponentProps) => {

    return (
        <Box className={styles.container} onClick={() => onClick()}>
            <Typography fontSize={'18px'}>
                {title}
            </Typography>
            <Box className={styles.arrowContainer}>
                <RightArrowIcon/>
            </Box>
        </Box>
    )


}
export default OptionComponent