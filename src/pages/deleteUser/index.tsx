import {Box} from "@mui/material";
import GenericModal from "../../components/GenericModal";


interface DeleteUserModalProps {
    deleteUserFunction:  () => void
    closeModal: () => void
    userCode: string
    open:boolean
}


const DeleteUserModal = ({open, deleteUserFunction, closeModal, userCode}: DeleteUserModalProps) => {


    return (
        <Box className={"home-display"}>
            <GenericModal
                open={open}
                title={"Eliminar usuario"}
                description={`¿Estás seguro que deseas eliminar al usuario ${userCode}?`}
                topButtonAction={deleteUserFunction}
                onClose={closeModal}
                topButtonText={"Confirmar"}
                bottomButton={true}
                bottomButtonText={"Cancelar"}
            />
        </Box>
    );
};

export default DeleteUserModal;
