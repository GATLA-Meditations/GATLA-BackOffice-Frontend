import {Box} from "@mui/material";
import "./styles.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface QuestionOptionsProps {
  quantity: number;
  handleIncrease: () => void;
  handleDecrease: () => void;
}

const EditableQuestionOptions = (props: QuestionOptionsProps) => {
  return (
    <Box className={"edit-circles-container"}>
      <h5>Cantidad de posibles respuestas (circulitos):</h5>
      <Box className={"edit-circles"}>
        <Box className={"circles"}>
          {[...Array(props.quantity)].map((_, index) => (
            <Box key={index} className={"circle"}></Box>
          ))}
        </Box>
        <Box className={"manage-circles"}>
          <AddIcon
            className={"circle-function"}
            onClick={() => props.handleIncrease()}
          />
          <RemoveIcon
            className={"circle-function"}
            onClick={() => props.handleDecrease()}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default EditableQuestionOptions;
