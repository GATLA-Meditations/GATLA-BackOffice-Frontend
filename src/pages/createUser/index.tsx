import {Box, Checkbox, FormControl, MenuItem, Select} from "@mui/material";
import styles from "../activity/styles.module.css";
import Button from "../../components/Button";
import {emptyUserMock} from "../../mocks";
import InputField from "../../components/InputField";
import {useEffect, useState} from "react";
import {createUser, getAllTreatments} from "../../service/api";
import {useNavigate} from "react-router-dom";
import withToast, {WithToastProps} from "../../hoc/withToast.tsx";

type attributeType = keyof typeof emptyUserMock;

const CreateUser = ({showToast}: WithToastProps) => {

    const [user, setUser] = useState({patient_code: "", password: "", email:"",treatment: {id: "", delayed: false}});
    const [treatments, setTreatments] = useState([{id: "", name: ""}]);
    const nav = useNavigate()


    useEffect(() => {
        const fetchTreatments = async () => {
            try {
                const response = await getAllTreatments();
                setTreatments(response);
            } catch (error) {
                console.error("Error fetching treatments:", error);
            }
        };

        fetchTreatments();
    }, []);

    const handleSubmit = async () => {
        if (user.patient_code === "" || user.password === "") {
            showToast('Por favor llena todos los campos', 'error');
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(user.email)) {
            showToast('Ingresa un email valido', 'error');
            return;
        }

        const userToSubmit = {
            ...user,
            treatment: user.treatment.id === "" ? null : user.treatment
        };

        try {
            await createUser(userToSubmit);
            showToast('Usuario creado correctamente', 'success');
            setTimeout(() => {
                nav('/users');
            }, 2000);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (attribute: attributeType, newValue: string) => {
        setUser((prevState) => ({...prevState , [attribute]: newValue}))
    }

    const handleDelayedChange = (newValue: boolean) => {
        setUser((prevState) => ({
            ...prevState,
            treatment: {
                ...prevState.treatment,
                delayed: newValue
            }
        }));
    };

    const handleTreatmentIdChange = (newId: string) => {
        setUser((prevState) => ({
            ...prevState,
            treatment: {
                ...prevState.treatment,
                id: newId
            }
        }));
    };

    return (
        <Box className={"home-display"}>
            <Box className={styles.activityContainer}>
                <InputField title={'Código de usuario'} text={user.patient_code} placeholder={'codigo de usuario'}
                            name={'UserCode'}
                            handleChange={(e) => handleChange('patient_code', e.target.value)}/>
                <InputField title={'Contraseña de usuario'} text={user.password}
                            placeholder={'contraseña de usuario'}
                            name={'UserPass'} handleChange={(e) => handleChange('password', e.target.value)}/>

                <h3>Tratamiento</h3>
                <FormControl>
                    <Select
                        value={user.treatment.id}
                        onChange={(e) => handleTreatmentIdChange(e.target.value)}
                    >
                        {treatments.map((treatment) => (
                            <MenuItem key={treatment.id} value={treatment.id}>
                                {treatment.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <h3>Paciente control</h3>
                    <Checkbox
                        checked={user.treatment.delayed}
                        onChange={(e) => handleDelayedChange(e.target.checked)}
                        sx={{ '& .MuiSvgIcon-root': { fontSize: 32 } }}
                    />
                </Box>
                <InputField title={'Email de usuario'} text={user.email} placeholder={'Email de usuario'}
                            name={'UserEmail'}
                            handleChange={(e) => handleChange('email', e.target.value)}/>
                <Button onClick={() => handleSubmit()} variant={'primary'} size={'medium'}>Crear</Button>
            </Box>

        </Box>
    );
};

export default withToast(CreateUser);
