import {useState} from "react";
import {Box} from "@mui/material";
import Button from "../../components/Button";
import styles from "../activity/styles.module.css";
import GenericModal from "../../components/GenericModal";
import {deleteUser} from "../../service/api.ts";
import InputField from "../../components/InputField";


const DeleteUser = () => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [userCode, setUserCode] = useState("");

    const handleChange = (newValue: string) => {
        setUserCode(newValue);
    };

    const handleSubmit = () => {
        setIsDeleteModalOpen(true);
    };

    const handleDelete = () => {
        try {
            const response = deleteUser(userCode.trim())
            console.log(response);
        } catch (error) {
            console.error(error);
        }
        setIsDeleteModalOpen(false);
    };

    return (
        <Box className={"home-display"}>
            <Box className={styles.activityContainer}>
                <InputField
                    title={"Codigo de usuario:"}
                    text={userCode}
                    placeholder={"Ingrese el codigo del usuario a eliminar"}
                    name={"UserCode"}
                    handleChange={(e) => handleChange(e.target.value)}
                />
                <Button
                    onClick={() => handleSubmit()}
                    variant={"primary"}
                    size={"medium"}
                >
                    Eliminar
                </Button>
            </Box>
            {isDeleteModalOpen && (
                <GenericModal
                    open={isDeleteModalOpen}
                    title={"Eliminar usuario"}
                    description={`¿Estás seguro que deseas eliminar al usuario ${userCode}?`}
                    topButtonAction={handleDelete}
                    onClose={() => setIsDeleteModalOpen(false)}
                    topButtonText={"Confirmar"}
                    bottomButton={true}
                    bottomButtonText={"Cancelar"}
                />
            )}
        </Box>
    );
};

export default DeleteUser;
