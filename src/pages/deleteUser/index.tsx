import { useState } from "react";
import { Box } from "@mui/material";
import { userMock } from "../../mocks";
import EditableInput from "../../components/EditableInput";
import Button from "../../components/Button";
import styles from "../activity/styles.module.css";
import GenericModal from "../../components/GenericModal";

type attributeType = keyof typeof userMock;

const DeleteUser = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [mockUser, setMockUser] = useState(userMock);

  const handleChange = (attribute: attributeType, newValue: string) => {
    setMockUser({ ...mockUser, [attribute]: newValue });
  };

  const handleSubmit = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    console.log("Eliminado");
    setIsDeleteModalOpen(false);
  };

  return (
    <Box className={"home-display"}>
      <Box className={styles.activityContainer}>
        <EditableInput
          title={"Codigo de usuario:"}
          text={mockUser.code}
          placeholder={"afeaf"}
          type={"text"}
          name={"UserCode"}
          handleChange={(e) => handleChange("code", e.target.value)}
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
          description={`¿Estás seguro que deseas eliminar al usuario ${userMock.code}?`}
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
