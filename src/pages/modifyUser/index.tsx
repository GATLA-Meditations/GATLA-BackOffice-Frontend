import {useEffect, useState} from "react";
import {Box, Checkbox, FormControl, MenuItem, Select} from "@mui/material";
import styles from "../activity/styles.module.css";
import EditableInput from "../../components/EditableInput";
import Button from "../../components/Button";
import "./styles.css";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../redux/hooks";
import {deleteUser, getAllTreatments, useUpdateUser} from "../../service/api";
import {User} from "../../types";
import DeleteUserModal from "../deleteUser";

type attributeType = keyof User;

const ModifyUser = () => {
    const nav = useNavigate();
    const {user} = useAppSelector((state) => state.user);
    const [selectedUser, setSelectedUser] = useState(user);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const updateUser = useUpdateUser();
    const [treatments, setTreatments] = useState([{id: "", name: ""}]);

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

    const handleChange = (attribute: attributeType, newValue: string) => {
        setSelectedUser({...selectedUser, [attribute]: newValue});
    };

    const handleSubmit = () => {
        const data = {
            patient_code: selectedUser.patient_code,
            password: selectedUser.password,
            meditationType: selectedUser.meditationType,
            treatmentId: selectedUser.treatments[0].id,
            sendQuestionnaire: selectedUser.sendQuestionnaire,
        };
        try {
            updateUser.mutate({id: selectedUser.id, data});
            nav("/users");
        } catch (error) {
            console.log(error);
        }
    };

    const handleOpenDeleteModal = () => {
        setIsDeleteModalOpen(!isDeleteModalOpen)
    }

    const handleDeleteUser = async () => {
        try {
            await deleteUser(selectedUser.patient_code.trim()).then(() => {
                nav("/users");
            })
        } catch (error) {
            console.error(error);
        }
        setIsDeleteModalOpen(false);
    }

    const handleTreatmentIdChange = (newId: string) => {
        setSelectedUser((prevState) => ({
            ...prevState,
            treatments: [
                {
                    ...prevState.treatments[0],
                    id: newId
                },
                ...prevState.treatments.slice(1)
            ]
        }));

    };

    return (
        <Box className={"home-display"}>
            <Box className={styles.activityContainer}>
                <EditableInput
                    title={"Código de usuario"}
                    text={selectedUser.patient_code}
                    placeholder={"Escribe el código"}
                    type={"text"}
                    name={"UserCode"}
                    handleChange={(e) => handleChange("patient_code", e.target.value)}
                />
                <EditableInput
                    title={"Contraseña de usuario"}
                    text={selectedUser.password}
                    placeholder={"Escribe la contraseña"}
                    type={"text"}
                    name={"UserPassword"}
                    handleChange={(e) => handleChange("password", e.target.value)}
                />

                <p className={'h6'}>Tipo de meditación</p>
                <FormControl>
                    <Select
                        value={selectedUser.meditationType}
                        onChange={(e) => handleChange("meditationType", e.target.value)}
                    >
                        <MenuItem value={"Cristiana"}>Cristiana</MenuItem>
                        <MenuItem value={"No cristiana"}>No cristiana</MenuItem>
                    </Select>
                </FormControl>

                <h3>Tratamiento</h3>
                <FormControl>
                    <Select
                        value={selectedUser.treatments[0] ? selectedUser.treatments[0].id : ''}
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
                    <h3>Enviar cuestionario</h3>
                    <Checkbox
                        checked={selectedUser.sendQuestionnaire}
                        onChange={() => {
                            setSelectedUser((prevState) => ({
                                ...prevState,
                                sendQuestionnaire: !prevState.sendQuestionnaire
                            }));
                        }}
                        sx={{ '& .MuiSvgIcon-root': { fontSize: 32 } }}
                    />
                </Box>

                <Box className={styles.buttonsContainer}>
                    <Button onClick={handleSubmit} variant={"primary"} size={"medium"}>
                        Guardar
                    </Button>
                    <Button onClick={() => handleOpenDeleteModal()} variant={"red"} size={"medium"}>
                        Eliminar
                    </Button>
                </Box>
                {isDeleteModalOpen && (
                    <DeleteUserModal open={isDeleteModalOpen} deleteUserFunction={() => handleDeleteUser()}
                                     closeModal={() => handleOpenDeleteModal()} userCode={selectedUser.patient_code}/>
                )}
            </Box>
        </Box>
    );
};

export default ModifyUser;
