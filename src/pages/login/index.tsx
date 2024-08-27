import { useState } from 'react';
import './styles.css';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from "../../components/Button";
import { emptyAdminMock } from "../../mocks";
import { Form } from "react-router-dom";
import logo from '../../assets/Logo/logo.png';

type attributeType = keyof typeof emptyAdminMock;

const LoginPage = () => {
    const [adminData, setAdminData] = useState({ email: '', password: '' });

    const handleChange = (attribute: attributeType, newValue: string) => {
        setAdminData({ ...adminData, [attribute]: newValue });
    }

    const handleSubmit = async () => {
        console.log(adminData);
    }

    return (
        <Box className="loginPageContainer">
            <Box className="headerContainer">
                <img src={logo} alt="logo" width={100} height={150}/>
                <Typography variant="h3" className="title">Renacentia</Typography>
                <Typography variant="h5" className="subtitle">Administración</Typography>
            </Box>
            <Form className="inputContainer">
                <input
                    className={"input"}
                    value={adminData.email}
                    placeholder="Ingrese su email"
                    name="adminEmail"
                    onChange={(e) => handleChange('email', e.target.value)}
                />
                <input
                    className={"input"}
                    value={adminData.password}
                    type="password"
                    placeholder="Ingrese su contraseña"
                    name="adminPassword"
                    onChange={(e) => handleChange('password', e.target.value)}
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
