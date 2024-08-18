import React from "react";
import "./styles.css";
import {Box} from "@mui/material";
import {RightArrowIcon} from "../../assets/Icons/RightArrowIcon";
import {LeftArrowIcon} from "../../assets/Icons/LeftArrowIcon";


const Home = () => {
    const options = [
        {
            name: "Usuarios",
        },
        {
            name: "Tratamientos",
        },
    ];

    const [route, setRoute] = React.useState("");

    //orden: tratamientos, modulo, actividades

    const handleClick = (option: string) => {
        setRoute(option);
    };


    const handleBackClick = () => {
        setRoute("");
    };


    return (
        <Box className={"home-display"}>
            <Box className={"home-menu"}>
                {options.map((option, index) => (
                    <Box
                        key={index}
                        className={"menu-option"}
                        onClick={() => handleClick(option.name)}
                    >
                        <h5>{option.name}</h5>
                        <RightArrowIcon width="16" height="16"/>
                    </Box>
                ))}
            </Box>
            <Box className={"module"}>
                <Box className={"route"}>
                    <LeftArrowIcon width="16" height="16" onClick={handleBackClick}/>
                    <h6>{route}</h6>
                </Box>
            </Box>
        </Box>
    );
};

export default Home;
