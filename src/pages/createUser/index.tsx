import React, {useState} from "react";
import {Box, FormControl, MenuItem, Select} from "@mui/material";
import {RightArrowIcon} from "../../assets/Icons/RightArrowIcon";
import {LeftArrowIcon} from "../../assets/Icons/LeftArrowIcon";
import styles from "../activity/styles.module.css";
import Button from "../../components/Button";
import {emptyUserMock} from "../../mocks";
import InputField from "../../components/InputField";

type attributeType = keyof typeof emptyUserMock;

const CreateUser = () => {

    const [mockUser, setMockUser] = useState(emptyUserMock);

    //orden: tratamientos, modulo, actividades


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

export default CreateUser;
