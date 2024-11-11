import {useState} from "react";
import {Box} from "@mui/material";
import styles from "../activity/styles.module.css";
import EditableInput from "../../components/EditableInput";
import Button from "../../components/Button";
import "./styles.css";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {deleteUser, useUpdateUser} from "../../service/api";
import {User} from "../../types";
import DeleteUserModal from "../deleteUser";
import withToast, {WithToastProps} from "../../hoc/withToast.tsx";
import {removeRoutePath} from "../../redux/routeSlice.ts";

type attributeType = keyof User;

const ModifyUser = ({showToast}: WithToastProps) => {
    const nav = useNavigate();
    const {user} = useAppSelector((state) => state.user);
    const [selectedUser, setSelectedUser] = useState({...user, password:''});
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const dispatch = useAppDispatch();
    const updateUser = useUpdateUser();

    const handleChange = (attribute: attributeType, newValue: string) => {
        setSelectedUser({...selectedUser, [attribute]: newValue});
    };

    const handleSubmit = () => {
        // First would be the post to the backend then the dispatch
        const data = {
            patient_code: selectedUser.patient_code,
            password: selectedUser.password,
            meditationType: selectedUser.meditationType,
        };
        try {
            showToast('Usuario modificado correctamente', 'success');
            dispatch(removeRoutePath());
            updateUser.mutate({id: selectedUser.id, data});
            setTimeout(() => {
                nav('/users');
            }, 2000)
        } catch (error) {
            console.log(error);
        }
    };

    const handleOpenDeleteModal = () => {
        setIsDeleteModalOpen(!isDeleteModalOpen)
    }

    const handleDeleteUser = async () => {
        try {
            showToast('Usuario eliminado correctamente', 'success');
            await deleteUser(selectedUser.patient_code.trim())
            dispatch(removeRoutePath());
            setTimeout(() => {
                nav('/users');
            }, 2000)
        } catch (error) {
            console.error(error);
        }
        setIsDeleteModalOpen(false);
    }

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

export default withToast(ModifyUser);
