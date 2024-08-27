import React, { useState } from 'react';
import './styles.css';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import { emptyAdminMock } from "../../mocks";
import { Form } from "react-router-dom";

type attributeType = keyof typeof emptyAdminMock;

const LoginPage = () => {
    const [adminData, setAdminData] = useState({ adminEmail: '', adminPassword: '' });

    const handleChange = (attribute: attributeType, newValue: string) => {
        setAdminData({ ...adminData, [attribute]: newValue });
    }

    const handleSubmit = async () => {
        console.log(adminData);
    }

    return (
        <Box className="loginPageContainer">
            <Box className="headerContainer">
                <Typography variant="h3" className="title">Renacentia</Typography>
                <Typography variant="subtitle1" className="subtitle">Administración</Typography>
            </Box>
            <Form className="inputContainer">
                <InputField
                    text={adminData.adminEmail}
                    placeholder="Ingrese su email"
                    name="adminEmail"
                    handleChange={(e) => handleChange('email', e.target.value)}
                />
                <InputField
                    text={adminData.adminPassword}
                    placeholder="Ingrese su contraseña"
                    name="adminPassword"
                    handleChange={(e) => handleChange('password', e.target.value)}
                />
                <Box className="buttonContainer">
                    <Button onClick={handleSubmit} variant="green">
                        Iniciar Sesión
                    </Button>
                </Box>
            </Form>
        </Box>
    );
};

export default LoginPage;
