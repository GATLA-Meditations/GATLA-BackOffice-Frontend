import "./styles.css";
import { Box } from "@mui/material";
import {useLogOut} from "../../service/api.ts";
import Button from "../../components/Button";
const Home = () => {
  //orden: tratamientos, modulo, actividades

    const handleLogOut = () => {
        useLogOut()
        window.location.href = "/login"
    }

  return (
    <Box className={"home-display"}>
        <Button onClick={handleLogOut} variant={"red"} className={"top-right-corner"}>Cerrar sesión</Button>
        <Box className={"module"}>
        </Box>
    </Box>
  );
};

export default Home;
