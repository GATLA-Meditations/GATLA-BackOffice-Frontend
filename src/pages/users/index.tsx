import {User} from "../../types";
import {Box} from "@mui/material";
import "../../common/globals.css";
import "./styles.css";
import {RightArrowIcon} from "../../assets/Icons/RightArrowIcon";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../redux/hooks";
import {setUser} from "../../redux/userSlice";
import SearchBar from "../../components/SearchBar";
import {useState} from "react";
import {useGetUsers} from "../../service/api.ts";
import Button from "../../components/Button";
import {updateRoutePath} from "../../redux/routeSlice.ts";
import Loader from '../../components/Loader';
import {ArrowBack, ArrowForward} from "@mui/icons-material";

const UsersPage = () => {
    const [page, setCurrentPage] = useState(1);
    const [userSearch, setUserSearch] = useState<{searchInput: string, searchQuery:string}>({
        searchInput: '',
        searchQuery: ''
    });
    // The userSearch is divided in two states to avoid the searchQuery to be updated every time the user types
    const {data: users, isLoading} = useGetUsers(page, userSearch.searchQuery);
    const nav = useNavigate();
    const dispatch = useAppDispatch();

    const handleClickUser = (user: User) => {
        dispatch(setUser(user));
        dispatch(updateRoutePath({name: user.patient_code, route: '/user/modify'}))
        nav("/user/modify");
    };

    const handleSearchInput = (value: string) => {
        setUserSearch((prevState) => ({ ...prevState, searchInput: value }));};

    const handleSearchQuery = ()=>  {
        setUserSearch((prevState) => ({ ...prevState, searchQuery: prevState.searchInput }));
    }

    const handleDeleteInput = () => {
        setUserSearch({searchQuery : '', searchInput: '' });    };

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
                <form onSubmit={(event) => {event.preventDefault(); handleSearchQuery()}}>
                    <SearchBar
                        placeholder={"Buscar usuario"}
                        onChange={(value) => handleSearchInput(value)}
                        value={userSearch.searchInput}
                        onDeleteInput={handleDeleteInput}
                    />
                </form>
                <Button onClick={() => handleAddUserButton()} variant={'green'} size={'medium'}>
                    <p className={'body1'}>Crear</p>
                </Button>
            </Box>

            <Box className={'users-list-container'}>
                <Box className={"items border-1px"}>
                    {users && users.length > 0 ? (
                        users.map((user: User) => (
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
