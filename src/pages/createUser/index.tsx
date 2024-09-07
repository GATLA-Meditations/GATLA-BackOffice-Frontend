import {Box, Checkbox, FormControl, MenuItem, Select} from "@mui/material";
import styles from "../activity/styles.module.css";
import Button from "../../components/Button";
import {emptyUserMock} from "../../mocks";
import InputField from "../../components/InputField";
import {useEffect, useState} from "react";
import {createUser, getAllTreatments} from "../../service/api";

type attributeType = keyof typeof emptyUserMock;

const CreateUser = () => {

    const [mockUser, setMockUser] = useState({patient_code: "", password: "", treatment: {id: "", delayed: false}});
    const [treatments, setTreatments] = useState([{id: "", name: ""}]);


    useEffect(() => {
        const fetchTreatments = async () => {
            try {
                const response = await getAllTreatments();
                console.log(response)
                setTreatments(response);
            } catch (error) {
                console.error("Error fetching treatments:", error);
            }
        };

        fetchTreatments();
    }, []);

    const handleSubmit = async () => {
        if (mockUser.patient_code === "" || mockUser.password === "") {
            alert("Por favor llena todos los campos");
            return;
        }

        const userToSubmit = {
            ...mockUser,
            treatment: mockUser.treatment.id === "" ? null : mockUser.treatment
        };

        console.log(userToSubmit);

        try {
            const response = await createUser(userToSubmit);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (attribute: attributeType, newValue: string) => {
        setMockUser({...mockUser, [attribute]: newValue})
    }

    const handleDelayedChange = (newValue: boolean) => {
        setMockUser((prevState) => ({
            ...prevState,
            treatment: {
                ...prevState.treatment,
                delayed: newValue
            }
        }));
    };

    const handleTreatmentIdChange = (newId: string) => {
        setMockUser((prevState) => ({
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
                <InputField title={'Código de usuario'} text={mockUser.patient_code} placeholder={'codigo de usuario'}
                            name={'UserCode'}
                            handleChange={(e) => handleChange('patient_code', e.target.value)}/>
                <InputField title={'Contraseña de usuario'} text={mockUser.password}
                            placeholder={'contraseña de usuario'}
                            name={'UserPass'} handleChange={(e) => handleChange('password', e.target.value)}/>

                <h3>Tratamiento</h3>
                <FormControl>
                    <Select
                        value={mockUser.treatment.id}
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
                        checked={mockUser.treatment.delayed}
                        onChange={(e) => handleDelayedChange(e.target.checked)}
                        sx={{ '& .MuiSvgIcon-root': { fontSize: 32 } }}
                    />
                </Box>
                <Button onClick={() => handleSubmit()} variant={'primary'} size={'medium'}>Crear</Button>
            </Box>

        </Box>
    );
};

export default CreateUser;
