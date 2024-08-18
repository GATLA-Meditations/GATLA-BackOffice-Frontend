import React, {useState} from "react";
import "./styles.css";
import {Box, FormControl, MenuItem, Select} from "@mui/material";
import {RightArrowIcon} from "../../assets/Icons/RightArrowIcon";
import {LeftArrowIcon} from "../../assets/Icons/LeftArrowIcon";
import styles from "../activity/styles.module.css";
import Button from "../../components/Button";
import {emptyUserMock} from "../../mocks";
import InputField from "../../components/InputField";

type attributeType = keyof typeof emptyUserMock;

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
    const [mockUser, setMockUser] = useState(emptyUserMock);

    //orden: tratamientos, modulo, actividades

    const handleClick = (option: string) => {
        setRoute(option);
    };

    const handleBackClick = () => {
        setRoute("");
    };

    const handleSubmit = () => {
        if (mockUser.code === "" || mockUser.password === "" || mockUser.meditation_type === "") {
            alert("Por favor llena todos los campos");
            return;
        }
        console.log(mockUser)
    }

    const handleChange = (attribute: attributeType, newValue: string) => {
        setMockUser({...mockUser, [attribute]: newValue})
    }

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

            <Box className={styles.activityContainer}>
                <InputField title={'Código de usuario'} text={mockUser.code} placeholder={'codigo de usuario'}
                            name={'UserCode'}
                            handleChange={(e) => handleChange('code', e.target.value)}/>
                <InputField title={'Contraseña de usuario'} text={mockUser.password}
                            placeholder={'contraseña de usuario'}
                            name={'UserPass'} handleChange={(e) => handleChange('password', e.target.value)}/>

                <h3>Tipo de meditación</h3>
                <FormControl>
                    <Select
                        value={mockUser.meditation_type}
                        onChange={(e) => handleChange('meditation_type', e.target.value)}
                    >
                        <MenuItem value={"Cristiana"}>Cristiana</MenuItem>
                        <MenuItem value={"No cristiana"}>No cristiana</MenuItem>
                    </Select>
                </FormControl>

                <Button onClick={() => handleSubmit()} variant={'primary'} size={'medium'}>Crear</Button>
            </Box>

        </Box>
    );
};

export default Home;
