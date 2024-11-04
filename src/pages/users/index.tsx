import {User} from "../../types";
import {Box} from "@mui/material";
import "../../common/globals.css";
import "./styles.css";
import {RightArrowIcon} from "../../assets/Icons/RightArrowIcon";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../redux/hooks";
import {setUser} from "../../redux/userSlice";
import SearchBar from "../../components/SearchBar";
import {useEffect, useState} from "react";
import {useGetUsers} from "../../service/api.ts";
import Button from "../../components/Button";
import {updateRoutePath} from "../../redux/routeSlice.ts";
import Loader from '../../components/Loader';
import {ArrowBack, ArrowForward} from "@mui/icons-material";

const UsersPage = () => {
    const [page, setCurrentPage] = useState(1);
    const {data: users, isLoading} = useGetUsers(page);
    const [userSearch, setUserSearch] = useState<string>("");
    const [filteredUsers, setFilteredUsers] = useState<User[]>(users);
    const nav = useNavigate();
    const dispatch = useAppDispatch();

    const handleClickUser = (user: User) => {
        dispatch(setUser(user));
        dispatch(updateRoutePath({name: user.patient_code, route: '/user/modify'}))
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

    if (isLoading) {
        return <Loader/>;
    }

    return (
        <Box className={"display-items-page"}>
            <Box className={'display-searchbar-button'}>
                <Box width={'100%'}>
                    <SearchBar
                        placeholder={"Buscar usuario"}
                        onChange={handleSearch}
                        value={userSearch}
                        onDeleteInput={handleDeleteInput}
                    />
                </Box>
                <Button onClick={() => handleAddUserButton()} variant={'green'} size={'medium'}>
                    <p className={'body1'}>Crear</p>
                </Button>
            </Box>

            <Box className={'users-list-container'}>
                <Box className={"items"}>
                    {filteredUsers && filteredUsers.length > 0 ? (
                        filteredUsers.map((user: User) => (
                            <Box
                                key={user.id}
                                className={"item"}
                                onClick={() => handleClickUser(user)}
                            >
                                <p className={'body1'}>{user.patient_code}</p>
                                <RightArrowIcon/>
                            </Box>
                        ))
                    ) : (
                        <h4>No se encontraron usuarios</h4>
                    )}
                </Box>
                <Box className={'users-footer-container'}>
                    <Box className={'users-amount-container'}>
                        {users.length + '/' + '10'}
                    </Box>
                    <Box className={'users-arrows-container'} display={'flex'}>
                        <ArrowBack className={'cursor-pointer'} onClick={() => page > 1 ? setCurrentPage(page - 1) : null}/>
                        {page}
                        <ArrowForward className={'cursor-pointer'} onClick={() => setCurrentPage(page + 1)}/>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default UsersPage;
