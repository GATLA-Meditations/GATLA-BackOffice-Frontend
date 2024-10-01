import { Box } from '@mui/material';
import React from 'react';
import './styles.css';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';

interface EditableInputProps {
    text: string;
    title?: string;
    placeholder: string;
    type: string;
    name: string;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    isDeletaable?: boolean;
    onDelete?: () => void;
}

const EditableInput = (props: EditableInputProps) => {
    const [isEditing, setIsEditing] = React.useState(false);

    return (
        <Box>
            <h3>{props.title}</h3>
            <Box className={'input-container'}>
                <input
                    name={props.name}
                    className="editable-input"
                    type={props.type}
                    value={props.text}
                    placeholder={props.placeholder}
                    onChange={props.handleChange}
                    disabled={!isEditing}
                />
                {!isEditing ? (
                    <EditIcon
                        className="icon"
                        onClick={() => setIsEditing(!isEditing)}
                    />
                ) : (
                    <CheckIcon
                        className="icon"
                        onClick={() => setIsEditing(!isEditing)}
                    />
                )}
                {!isEditing && props.isDeletaable && (
                    <DeleteIcon className="icon" onClick={props.onDelete} />
                )}
            </Box>
        </Box>
    );
};

export default EditableInput;
