import "./styles.css";
import { Box } from "@mui/material";
import { LeftArrowIcon } from "../../assets/Icons/LeftArrowIcon";
import Questionnaire from "../../components/questionnaire";
import { questionnaireMock } from "../../mocks";
import SideBar from "../../components/SideBar";
import Route from "../../components/Route";

const Home = () => {
  //orden: tratamientos, modulo, actividades


  return (
    <Box className={"home-display"}>
      <SideBar/>
      <Box className={"module"}>
        <Box className={"route"}>
          <LeftArrowIcon width="16" height="16" onClick={() => console.log('hola')} />
          <Route/>
        </Box>
        <Questionnaire questionnaire={questionnaireMock} />
      </Box>
    </Box>
  );
};

export default Home;
