import { useState } from "react";
import { Box, FormControl, MenuItem, Select } from "@mui/material";
import { userMock } from "../../mocks";
import styles from "../activity/styles.module.css";
import EditableInput from "../../components/EditableInput";
import Button from "../../components/Button";

type attributeType = keyof typeof userMock;

const ModifyUser = () => {
  const [mockUser, setMockUser] = useState(userMock);

  const handleChange = (attribute: attributeType, newValue: string) => {
    setMockUser({ ...mockUser, [attribute]: newValue });
  };

  const handleSubmit = () => {
    // First would be the post to the backend then the dispatch
    console.log(mockUser);
  };

  return (
    <Box className={"home-display"}>
      <Box className={styles.activityContainer}>
        <EditableInput
          title={"Código de usuario"}
          text={mockUser.code}
          placeholder={"Escribe el código"}
          type={"text"}
          name={"UserCode"}
          handleChange={(e) => handleChange("code", e.target.value)}
        />
        <EditableInput
          title={"Contraseña de usuario"}
          text={mockUser.password}
          placeholder={"Escribe la contraseña"}
          type={"text"}
          name={"UserPassword"}
          handleChange={(e) => handleChange("password", e.target.value)}
        />

        <h3>Tipo de meditación</h3>
        <FormControl>
          <Select
            value={mockUser.meditation_type}
            onChange={(e) => handleChange("meditation_type", e.target.value)}
          >
            <MenuItem value={"Cristiana"}>Cristiana</MenuItem>
            <MenuItem value={"No cristiana"}>No cristiana</MenuItem>
          </Select>
        </FormControl>

        <Button
          onClick={() => handleSubmit()}
          variant={"primary"}
          size={"medium"}
        >
          Guardar
        </Button>
      </Box>
    </Box>
  );
};

export default ModifyUser;
