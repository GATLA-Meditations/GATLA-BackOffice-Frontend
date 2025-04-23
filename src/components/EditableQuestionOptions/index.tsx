import {Box} from "@mui/material";
import "./styles.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import EditableInput from '../EditableInput';
import Button from '../Button';

interface QuestionOptionsProps {
  metadata: string;
  metadataValues: number[];
  questionType: string;
  handleEdit: (metadata?: string, metadataValues?: number[]) => void;
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

  const handleOptionValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const index = parseInt(event.target.name.split("-")[1]);
    const newValue = parseInt(event.target.value);
    let newValues = [...props.metadataValues];

    if (index >= newValues.length) {
      newValues = [...newValues, ...Array(index - newValues.length).fill(0), newValue];
    } else {
      newValues[index] = newValue;
    }

    props.handleEdit(undefined, newValues);
  }

  const handleAddOption = () => {
    const newOptions = [...metadata.options, ""];
    const newMetadata = { ...metadata, options: newOptions };
    const newMetadataValues = [...props.metadataValues, props.metadataValues.length + 1];

    props.handleEdit(JSON.stringify(newMetadata), newMetadataValues);
  }

  const handleDeleteOption = (index: number) => {
    const newOptions = metadata.options.filter((_option: any, i: number) => i !== index);
    const newMetadata = { ...metadata, options: newOptions };
    const newMetadataValues = props.metadataValues.filter((_value, i) => i !== index);

    props.handleEdit(JSON.stringify(newMetadata), newMetadataValues);
  }

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMetadata = { ...metadata, comment: event.target.value };
    props.handleEdit(JSON.stringify(newMetadata));
  }

  return (
      <>
        {props.questionType === "NUMERIC" ? (
            <Box className="edit-circles-container">
              <p className={'body2'}>Cantidad de posibles respuestas (circulitos):</p>
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
            <Box className={'single-choice-container'}>
              <Box className={'options-title'}>
                  <p className={'body1'}>Opciones:</p>
              </Box>
              {metadata.options.map((option: string, index: number) => (
                  <Box style={{ display: 'flex', alignItems: 'center', gap: '12px' }} key={index}>
                    <EditableInput
                        text={option}
                        placeholder={'Escribe una opción'}
                        type={'text'}
                        name={`option-${index}`}
                        handleChange={handleOptionChange}
                    />
                    <EditableInput
                        text={props.metadataValues[index].toString()}
                        placeholder={'Valor'}
                        type={'number'}
                        name={`option-${index}`}
                        isDeletaable={true}
                        onDelete={() => handleDeleteOption(index)}
                        handleChange={handleOptionValueChange}
                    />
                  </Box>
                ))}
              <Button
                  className="add-option"
                  onClick={handleAddOption}
                  variant={'green'}
                  size={'medium'}
              >Agregar opción</Button>
            </Box>
        ) : props.questionType === "NOT_A_QUESTION" ? (
            <Box>
              <p className={'body1'}>Comentario:</p>
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
