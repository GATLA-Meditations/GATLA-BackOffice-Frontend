import GenericModal from '../../../components/GenericModal';
import { Typography } from '@mui/material';

interface DeleteTreatmentModalProps {
    open: boolean;
    onClose: () => void;
    onDelete: () => void;
    treatmentName: string;
}

const DeleteTreatmentModal = ({open, onClose, onDelete, treatmentName}: DeleteTreatmentModalProps) => {
    return (
        <GenericModal
            open={open}
            onClose={onClose}
            topButtonAction={onDelete}
            title={'Eliminar tratamiento'}
            topButtonText={'Eliminar'}
            description={`¿Estás seguro de que deseas eliminar el tratamiento ${treatmentName}?`}
        >
            <Typography sx={{textAlign: 'center'}}>
                Aclaración: no se puede eliminar un tratamiento que esta siendo utilizado por algun usuario.
            </Typography>
        </GenericModal>
    );
};

export default DeleteTreatmentModal;