import {Box} from "@mui/material";
import {RightArrowIcon} from "../../assets/Icons/RightArrowIcon";
import {useState} from "react";
import styles from './styles.module.css'
import React from "react";

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
            redirect: '/'
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

    const handleSelectItem = (index: number) => {
        const updatedOptions = options.map((option, i) =>
            i === index ? {...option, isOpen: !option.isOpen} : option
        );
        // falta el set de la route cuando se hace un select

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