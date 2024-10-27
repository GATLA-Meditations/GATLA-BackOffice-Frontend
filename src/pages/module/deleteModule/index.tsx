import GenericModal from '../../../components/GenericModal';

interface DeleteModuleModalProps {
    open: boolean;
    onClose: () => void;
    onDelete: () => void;
    moduleName: string;
}

const DeleteModuleModal = ({open, onClose, onDelete, moduleName}: DeleteModuleModalProps) => {
    return (
        <GenericModal
            open={open}
            onClose={onClose}
            topButtonAction={onDelete}
            title={'Eliminar módulo'}
            description={`¿Estás seguro que deseas eliminar el módulo ${moduleName}?`}
            topButtonText={'Eliminar'}
        />
    );
};

export default DeleteModuleModal;