import { User } from "../../types";
import { Box } from "@mui/material";
import "../../common/globals.css";
import { RightArrowIcon } from "../../assets/Icons/RightArrowIcon";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/userSlice";
import SearchBar from "../../components/SearchBar";
import {useEffect, useState} from "react";
import {useGetUsers} from "../../service/api.ts";

const UsersPage = () => {
  const { data: users } = useGetUsers();
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

  useEffect(() => {
    if (users) {
      setFilteredUsers(users);
    }
  }, [users]);

  const handleDeleteInput = () => {
    setUserSearch("");
    setFilteredUsers(users);
  };

  return (
    <Box className={"display-items-page"}>
      <SearchBar
        placeholder={"Buscar usuario"}
        onChange={handleSearch}
        value={userSearch}
        onDeleteInput={handleDeleteInput}
      />
      <Box className={"items"}>
        {filteredUsers && filteredUsers.length > 0 ? (
          filteredUsers.map((user: User) => (
            <Box
              key={user.id}
              className={"item"}
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
