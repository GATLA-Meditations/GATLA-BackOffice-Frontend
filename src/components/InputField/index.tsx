import { Box } from '@mui/material';
import React from 'react';
import './styles.css';

interface InputFieldProps {
    text: string;
    title?: string;
    placeholder: string;
    name: string;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = (props: InputFieldProps) => {
    return (
        <Box>
            <h3>{props.title}</h3>
            <Box className={'input-container'}>
                <input
                    name={props.name}
                    className="editable-input"
                    value={props.text}
                    placeholder={props.placeholder}
                    onChange={props.handleChange}
                />
            </Box>
        </Box>
    );
};

export default InputField;
