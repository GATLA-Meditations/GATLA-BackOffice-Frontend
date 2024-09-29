import {Box} from "@mui/material";
import "./styles.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import EditableInput from '../EditableInput';
import Button from '../Button';

interface QuestionOptionsProps {
  metadata: string;
  questionType: string;
  handleEdit: (metadata: string) => void;
}

const EditableQuestionOptions = (props: QuestionOptionsProps) => {
  const metadata = JSON.parse(props.metadata);

  const handleIncrease = () => {
    const newMetadata = { ...metadata, max: metadata.max + 1 };
    props.handleEdit(JSON.stringify(newMetadata));
  }

  const handleDecrease = () => {
    if (metadata.max === 1) return;
    const newMetadata = { ...metadata, max: metadata.max - 1 };
    props.handleEdit(JSON.stringify(newMetadata));
  }

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newOptions = metadata.options.map((option: string, index: number) => {
      if (index === parseInt(event.target.name.split("-")[1])) {
        return event.target.value;
      }
      return option;
    });
    const newMetadata = { ...metadata, options: newOptions };
    props.handleEdit(JSON.stringify(newMetadata));
  }

  const handleAddOption = () => {
    const newOptions = [...metadata.options, ""];
    const newMetadata = { ...metadata, options: newOptions };
    props.handleEdit(JSON.stringify(newMetadata));
  }

  const handleDeleteOption = (index: number) => {
    const newOptions = metadata.options.filter((_option: any, i: number) => {
      return i !== index;
    });
    const newMetadata = { ...metadata, options: newOptions };
    props.handleEdit(JSON.stringify(newMetadata));
  }

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMetadata = { ...metadata, comment: event.target.value };
    props.handleEdit(JSON.stringify(newMetadata));
  }

  return (
      <>
        {props.questionType === "NUMERIC" ? (
            <Box className="edit-circles-container">
              <h5>Cantidad de posibles respuestas (circulitos):</h5>
              <Box className="edit-circles">
                <Box className="circles">
                  {[...Array(metadata.max)].map((_, index) => (
                      <Box key={index} className="circle"></Box>
                  ))}
                </Box>
                <Box className="manage-circles">
                  <AddIcon
                      className="circle-function"
                      onClick={handleIncrease}
                  />
                  <RemoveIcon
                      className="circle-function"
                      onClick={handleDecrease}
                  />
                </Box>
              </Box>
            </Box>
        ) :
        props.questionType === "SINGLE_CHOICE" ? (
            <Box>
              <Box className={'options-title'}>
            <h5>Opciones:</h5>
            <Button
                className="add-option"
                onClick={handleAddOption}
                variant={'green'}
            >Agregar opción</Button>
              </Box>
              {metadata.options.map((option: string, index: number) => (
                  <EditableInput
                      text={option}
                      placeholder={'Escribe una opción'}
                      type={'text'}
                      name={`option-${index}`}
                      isDeletaable={true}
                      onDelete={() => handleDeleteOption(index)}
                      handleChange={handleOptionChange}
                  />
                ))}
            </Box>
        ) : props.questionType === "NOT_A_QUESTION" ? (
            <Box>
              <h5>Comentario:</h5>
              <EditableInput
                  text={metadata.comment}
                  placeholder={'Escribe un comentario'}
                  type={'text'}
                  name={'comment'}
                  handleChange={handleCommentChange}
              />
            </Box>
        ) : null}
      </>
  );
};

export default EditableQuestionOptions;
