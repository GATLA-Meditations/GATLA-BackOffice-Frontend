import {Box, FormControl, MenuItem, Select} from "@mui/material";
import styles from "../activity/styles.module.css";
import Button from "../../components/Button";
import {emptyUserMock} from "../../mocks";
import InputField from "../../components/InputField";
import {useState} from "react";
import { createUser } from "../../service/api";
import {useNavigate} from "react-router-dom";

type attributeType = keyof typeof emptyUserMock;

const CreateUser = () => {
    const navigate = useNavigate();
    const [mockUser, setMockUser] = useState({patient_code: " ", password: " "});

    const handleSubmit = async () => {
        if (mockUser.patient_code === "" || mockUser.password === "") {
            alert("Por favor llena todos los campos");
            return;
        }
        try {
            const response = createUser(mockUser)
            navigate('/users/')
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    const handleChange = (attribute: attributeType, newValue: string) => {
        setMockUser({...mockUser, [attribute]: newValue})
    }

    return (
        <Box className={"home-display"}>
            <Box className={styles.activityContainer}>
                <InputField title={'Código de usuario'} text={mockUser.patient_code} placeholder={'codigo de usuario'}
                            name={'UserCode'}
                            handleChange={(e) => handleChange('patient_code', e.target.value)}/>
                <InputField title={'Contraseña de usuario'} text={mockUser.password}
                            placeholder={'contraseña de usuario'}
                            name={'UserPass'} handleChange={(e) => handleChange('password', e.target.value)}/>

                <h3>Tipo de meditación</h3>
                <FormControl>
                    <Select
                        value="Cristiana"
                        defaultValue={'Cristiana'}
                        onChange={(e) => handleChange('patient_code', e.target.value)}
                     variant={'outlined'}>
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
