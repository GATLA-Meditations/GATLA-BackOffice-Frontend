import { useState } from 'react';
import './styles.css';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '../../components/Button';
import { emptyAdminMock } from '../../mocks';
import { Form, useNavigate } from 'react-router-dom';
import logo from '../../assets/Logo/logo.png';
import { login } from '../../service/api.ts';
import { setToken } from '../../service/store.ts';
import withToast, { WithToastProps } from '../../hoc/withToast.tsx';
import { EyeClosedIcon } from '../../assets/Icons/EyeClosedIcon';
import { EyeIcon } from '../../assets/Icons/EyeIcon';

type attributeType = keyof typeof emptyAdminMock;

const LoginPage = ({ showToast }: WithToastProps) => {
    const [adminData, setAdminData] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (attribute: attributeType, newValue: string) => {
        setAdminData({ ...adminData, [attribute]: newValue });
    };

    const handleSubmit = async () => {
        try {
            const token = await login(adminData);
            setToken(token);
            navigate('/');
        } catch (error) {
            console.log(error);
            showToast('Error al iniciar sesión', 'error');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
        <Box className="loginPageContainer">
            <Box className="headerContainer">
                <img src={logo} alt="logo" width={100} height={150} />
                <Typography variant="h3" className="title">
                    Renacentia
                </Typography>
                <Typography variant="h5" className="subtitle">
                    Administración
                </Typography>
            </Box>
            <Form className="inputContainer">
                <input
                    className={'input'}
                    value={adminData.email}
                    placeholder="Ingrese su email"
                    name="adminEmail"
                    onChange={(e) => handleChange('email', e.target.value)}
                />
                <Box className="passwordContainer">
                    <input
                        className={'input'}
                        value={adminData.password}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Ingrese su contraseña"
                        name="adminPassword"
                        onChange={(e) =>
                            handleChange('password', e.target.value)
                        }
                    />
                    <button
                        type="button"
                        className="togglePasswordButton"
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? <EyeClosedIcon /> : <EyeIcon />}
                    </button>
                </Box>
                <Box className="buttonContainer">
                    <Button onClick={handleSubmit} variant="green">
                        Iniciar Sesión
                    </Button>
                </Box>
            </Form>
        </Box>
    );
};

export default withToast(LoginPage);
