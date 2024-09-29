import {User} from "../../types";
import {Box} from "@mui/material";
import "../../common/globals.css";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../redux/hooks";
import {setUser} from "../../redux/userSlice";
import SearchBar from "../../components/SearchBar";
import {useEffect, useState} from "react";
import {useGetUsers} from "../../service/api.ts";
import Button from "../../components/Button";
import {updateRoutePath} from "../../redux/routeSlice.ts";
import UsersList from "../../components/UsersList";

const UsersPage = () => {
    const {data: users} = useGetUsers();
    const [userSearch, setUserSearch] = useState<string>("");
    const [filteredUsers, setFilteredUsers] = useState<User[]>(users);
    const nav = useNavigate();
    const dispatch = useAppDispatch();

    const handleClickUser = (user: User) => {
        dispatch(setUser(user));
        dispatch(updateRoutePath({name:user.patient_code, route:'/user/modify'}))
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

    const handleAddUserButton = () => {
        dispatch(updateRoutePath({name: 'Agregar usuario', route: '/user/create'}))
        nav("/user/create")

    }

    return (
        <Box className={"display-items-page"}>
            <Box className={'display-searchbar-button'}>
                <SearchBar
                    placeholder={"Buscar usuario"}
                    onChange={handleSearch}
                    value={userSearch}
                    onDeleteInput={handleDeleteInput}
                />
                <Button onClick={() => handleAddUserButton()} variant={'green'} size={'medium'}>
                    <h3>Agregar</h3>
                </Button>
            </Box>
            <UsersList users={filteredUsers} handleClickUser={handleClickUser}/>
        </Box>
    );
};

export default UsersPage;
