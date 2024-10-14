import { Box, Modal, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './styles.css';
import Button from '../Button';

interface GenericModalProps {
    open: boolean;
    title?: string;
    onClose: () => void;
    description?: string;
    topButton?: boolean;
    topButtonText?: string;
    topButtonAction: () => void;
    bottomButton?: boolean;
    bottomButtonText?: string;
    children?: React.ReactNode;
    disabled?: boolean;
}

const GenericModal = ({
    open,
    title,
    description,
    topButtonAction,
    onClose,
    topButtonText = 'Confirmar',
    bottomButton = true,
    bottomButtonText = 'Cancelar',
    children,
    disabled,
}: GenericModalProps) => {
    const handleConfirm = () => {
        topButtonAction();
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <Modal open={open} onClose={handleClose} className="modal-container">
            <Box
                className={'modal-style modal-medium'}
                style={{ position: 'relative' }}
            >
                <IconButton
                    className="modal-close-button"
                    onClick={handleClose}
                    style={{ position: 'absolute', top: 8, right: 8 }}
                >
                    <CloseIcon />
                </IconButton>

                <Box>
                    {title && (
                        <Typography className="modal-title">{title}</Typography>
                    )}
                </Box>

                {description && (
                    <Typography className="modal-description">
                        {description}
                    </Typography>
                )}

                {children}

                <Box className="button-box">
                    <Button
                        onClick={handleConfirm}
                        variant='primary'
                        disabled={disabled}
                    >
                        {topButtonText}
                    </Button>
                    {bottomButton && (
                        <Button
                            onClick={handleClose}
                            variant='red'
                        >
                            {bottomButtonText}
                        </Button>
                    )}
                </Box>
            </Box>
        </Modal>
    );
};

export default GenericModal;