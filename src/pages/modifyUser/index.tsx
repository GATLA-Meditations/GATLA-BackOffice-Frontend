import { useState } from "react";
import { Box, FormControl, MenuItem, Select } from "@mui/material";
import { userMock } from "../../mocks";
import styles from "../activity/styles.module.css";
import EditableInput from "../../components/EditableInput";
import Button from "../../components/Button";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { useUpdateUser } from "../../service/api";

type attributeType = keyof typeof userMock;

const ModifyUser = () => {
  const nav = useNavigate();
  const { user } = useAppSelector((state) => state.user);
  const [mockUser, setMockUser] = useState(user);
  const updateUser = useUpdateUser();

  const handleChange = (attribute: attributeType, newValue: string) => {
    setMockUser({ ...mockUser, [attribute]: newValue });
  };

  const handleSubmit = () => {
    // First would be the post to the backend then the dispatch
    console.log(mockUser);
    const data = {
      patientCode: mockUser.patientCode,
      password: mockUser.password,
      meditationType: mockUser.meditationType,
    };
    try {
      updateUser.mutate({ id: mockUser.id, data });
      nav("/users");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box className={"home-display"}>
      <Box className={styles.activityContainer}>
        <EditableInput
          title={"Código de usuario"}
          text={mockUser.patientCode}
          placeholder={"Escribe el código"}
          type={"text"}
          name={"UserCode"}
          handleChange={(e) => handleChange("patientCode", e.target.value)}
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
            value={mockUser.meditationType}
            onChange={(e) => handleChange("meditationType", e.target.value)}
          >
            <MenuItem value={"Cristiana"}>Cristiana</MenuItem>
            <MenuItem value={"No cristiana"}>No cristiana</MenuItem>
          </Select>
        </FormControl>
        <Button onClick={handleSubmit} variant={"primary"} size={"medium"}>
          Guardar
        </Button>
      </Box>
    </Box>
  );
};

export default ModifyUser;
