import {useState} from "react";
import { Box } from "@mui/material";
import {userMock} from "../../mocks";
import EditableInput from "../../components/EditableInput";
import Button from "../../components/Button";
import styles from "../activity/styles.module.css";

type attributeType = keyof typeof userMock;

const DeleteUser = () => {

  const [mockUser, setMockUser] = useState(userMock);


  const handleChange = (attribute:attributeType, newValue:string) => {
    setMockUser({...mockUser, [attribute]: newValue })
  }


  const handleSubmit = () => {
    console.log("Deleted user: ", mockUser)
  }

  return (
    <Box className={"home-display"}>
        <Box className={styles.activityContainer}>
          <EditableInput title={'Codigo de usuario:'} text={mockUser.code} placeholder={'afeaf'} type={'text'} name={'UserCode'} handleChange={(e) => handleChange('code', e.target.value)}/>
          <Button onClick={() => handleSubmit()} variant={'primary'} size={'medium'}>Eliminar</Button>
        </Box>
    </Box>
  );
};

export default DeleteUser;
