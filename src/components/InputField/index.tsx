import { Box } from "@mui/material";
import React from "react";
import "./styles.css";

interface InputFieldProps {
  text: string | number;
  title?: string;
  placeholder: string;
  name: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = (props: InputFieldProps) => {

  return (
    <Box className={'input-main-container'}>
      <p className={'h6'}>{props.title}</p>
      <Box className={"input-container"}>
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
