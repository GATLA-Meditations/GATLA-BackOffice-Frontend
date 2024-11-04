import {Box} from "@mui/material";
import {RightArrowIcon} from "../../assets/Icons/RightArrowIcon";
export interface OptionsComponentProps {
    title: string;
    onClick: () => void;

}


const OptionComponent = ({title, onClick}: OptionsComponentProps) => {

    return (
        <Box className={'item'} onClick={onClick}>
            <p className={'body1'}>
                {title}
            </p>
            <RightArrowIcon/>
        </Box>
    )


}
export default OptionComponent