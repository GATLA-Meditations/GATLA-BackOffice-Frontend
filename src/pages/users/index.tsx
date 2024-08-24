import { User } from "../../types";
import { useGetUsers } from "../../service/api";
import { Box } from "@mui/material";

const UsersPage = () => {
  const { data: users } = useGetUsers();
  console.log(users);

  return (
    <Box display={'flex'} height={'100%'} width={'100%'}>
      <Box>
        {users && users.length > 0 ? (
          users.map((user: User) => (
            <Box key={user.id}>
              <h3>{user.patientCode}</h3>
              <p>{user.meditationType}</p>
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
