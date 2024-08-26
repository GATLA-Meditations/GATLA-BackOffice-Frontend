import { User } from "../../types";
import { useGetUsers } from "../../service/api";
import { Box } from "@mui/material";
import "./styles.css";
import { RightArrowIcon } from "../../assets/Icons/RightArrowIcon";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/userSlice";

const UsersPage = () => {
  const { data: users } = useGetUsers();
  // const users = [
  //   {
  //     id: "1",
  //     patient_code: "gtl-222",
  //     password: "1234",
  //     meditationType: "Cristiana",
  //   },
  //   {
  //     id: "2",
  //     patient_code: "gtl-501",
  //     password: "12345",
  //     meditationType: "No cristiana",
  //   },
  // ];
  const nav = useNavigate();
  const dispatch = useAppDispatch();

  const handleClickUser = (user: User) => {
    dispatch(setUser(user));
    nav("/user/modify");
  };

  return (
    <Box display={"flex"} height={"100%"} width={"100%"}>
      <Box className={"users"}>
        {users && users.length > 0 ? (
          users.map((user: User) => (
            <Box
              key={user.id}
              className={"user"}
              onClick={() => handleClickUser(user)}
            >
              <h4>{user.patient_code}</h4>
              <RightArrowIcon />
            </Box>
          ))
        ) : (
          <p>No hay usuarios</p>
        )}
      </Box>
    </Box>
  );
};

export default UsersPage;
