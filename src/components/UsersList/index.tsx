import "../../common/globals.css";
import {Box} from "@mui/material";
import {User} from "../../types";
import {RightArrowIcon} from "../../assets/Icons/RightArrowIcon";

interface UsersListProps {
    users: User[];
    handleClickUser: (user:User) => void;

}

const UsersList = ({users, handleClickUser}: UsersListProps) => {

    return(
        <Box className={"items"}>
            {users && users.length > 0 ? (
                users.map((user: User) => (
                    <Box
                        key={user.id}
                        className={"item"}
                        onClick={() => handleClickUser(user)}
                    >
                        <h4>{user.patient_code}</h4>
                        <RightArrowIcon/>
                    </Box>
                ))
            ) : (
                <h4>No se encontraron usuarios</h4>
            )}
        </Box>
    )

}

export default UsersList