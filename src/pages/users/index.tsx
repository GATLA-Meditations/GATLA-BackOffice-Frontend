import { User } from "../../types";
import { useGetUsers } from "../../service/api";
import { Box } from "@mui/material";
import "./styles.css";
import { RightArrowIcon } from "../../assets/Icons/RightArrowIcon";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/userSlice";
import SearchBar from "../../components/SearchBar";
import { useState } from "react";

const UsersPage = () => {
  const { data: users } = useGetUsers();
  // const users = [
  //   {
  //     id: "1",
  //     patient_code: "gtl-135",
  //     password: "fake_user",
  //     meditationType: "Cristiana",
  //   },
  //   {
  //     id: "2",
  //     patient_code: "gtl-136",
  //     password: "fake_user",
  //     meditationType: "Cristiana",
  //   },
  //   {
  //     id: "3",
  //     patient_code: "gtl-137",
  //     password: "fake_user",
  //     meditationType: "Cristiana",
  //   },
  //   {
  //     id: "4",
  //     patient_code: "gtl-138",
  //     password: "fake_user",
  //     meditationType: "Cristiana",
  //   },
  // ];
  const [userSearch, setUserSearch] = useState<string>("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);
  const nav = useNavigate();
  const dispatch = useAppDispatch();

  const handleClickUser = (user: User) => {
    dispatch(setUser(user));
    nav("/user/modify");
  };

  const handleSearch = (value: string) => {
    setUserSearch(value);
    const filtered = users.filter((user: User) =>
      user.patient_code.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleDeleteInput = () => {
    setUserSearch("");
    setFilteredUsers(users);
  };

  return (
    <Box className={"users-screen"}>
      <SearchBar
        placeholder={"Buscar usuario"}
        onChange={handleSearch}
        value={userSearch}
        onDeleteInput={handleDeleteInput}
      />
      <Box className={"users"}>
        {filteredUsers && filteredUsers.length > 0 ? (
          filteredUsers.map((user: User) => (
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
          <p>No se encontraron usuarios</p>
        )}
      </Box>
    </Box>
  );
};

export default UsersPage;
