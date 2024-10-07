import React, { useEffect } from 'react';
import './styles.css';
import { Question, QuestionType } from '../../../types';
import { Box, FormControl, MenuItem, Select } from '@mui/material';
import Button from '../../../components/Button';
import EditableInput from '../../../components/EditableInput';
import { generateRandomId } from '../../../util';
import { useParams } from 'react-router-dom';
import { useGetQuestionnaireById } from '../../../service/api.ts';
import EditableQuestionOptions from '../../../components/EditableQuestionOptions';
import Loader from '../../../components/Loader';

const EditQuestionnaire = () => {
  const questionnaireId = useParams().id;
  const {data: questionnaire, isLoading} = useGetQuestionnaireById(questionnaireId as string);
  const [name, setName] = React.useState('');
  const [questions, setQuestions] = React.useState<Question[]>([]);

  useEffect(() => {
    if (questionnaire) {
      setName(questionnaire.name);
      setQuestions(questionnaire.questions);
    }
  }, [questionnaire]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const questionIndex = parseInt(event.target.name.split("-")[1]);
    const newQuestions = questions.map((question, index) => {
      if (index === questionIndex) {
        return { ...question, name: event.target.value };
      }
      return question;
    });
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    const newQuestion: Question = {
      id: generateRandomId(),
      name: "",
      type: QuestionType.NUMERIC,
      metadata: '{ "min": 1, "max": 7 }',
      questionnaireId: questionnaire.id,
    };
    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
  };

  const handleDeleteQuestion = (index: number) => {
    const newQuestions = questions.filter((_question, i) => i !== index);
    setQuestions(newQuestions);
  };

  const getMetadataMock = (type: QuestionType) => {
    switch (type) {
      case QuestionType.NUMERIC:
        return '{ "min": 1, "max": 7 }';
      case QuestionType.SINGLE_CHOICE:
        return '{ "options": [""] }';
      case QuestionType.NOT_A_QUESTION:
        return '{ "comment": "" }';
        default:
          return '';
    }
  }

  const handleChangeType = (type: QuestionType, index: number) => {
    const newQuestions = questions.map((question, i) => {
      if (i === index) {
        return { ...question, type: type, metadata: getMetadataMock(type) };
      }
      return question;
    });
    setQuestions(newQuestions);
  };

  const handleSave = () => {
    const values = {
      name,
      questions,
    };
    console.log(values);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box className={"questionnaire-container"}>
      <Box className={"questions"}>
        <EditableInput
          title="Nombre del cuestionario:"
          text={name}
          placeholder={"Nombre"}
          type={"text"}
          name={"name"}
          handleChange={handleNameChange}
          onDelete={() => console.log("delete")}
          isDeletaable={false}
        />
        {questions?.map((question, index) => (
          <Box className={'question'}>
            <EditableInput
              key={index}
              title={"Pregunta" + " " + (index + 1) + ":"}
              text={question.name}
              placeholder={"Escribe la pregunta"}
              type={"text"}
              name={`question-${index}`}
              handleChange={handleQuestionChange}
              onDelete={() => handleDeleteQuestion(index)}
              isDeletaable={true}
            />
            <FormControl>
              <h5>Tipo de pregunta:</h5>
              <Select
                  variant={'outlined'}
                  className={'question-type-selector'}
                  value={question.type}
                  onChange={(event) => handleChangeType(event.target.value as QuestionType, index)}
              >
                <MenuItem key={1} value={"NUMERIC"}>Numérica</MenuItem>
                <MenuItem key={2} value={"SINGLE_CHOICE"}>Una opción</MenuItem>
                <MenuItem key={3} value={"NOT_A_QUESTION"}>Comentario</MenuItem>
                {/*<MenuItem key={4} value={"MULTIPLE_CHOICE"}>Opción múltiple</MenuItem>*/}
              </Select>
            </FormControl>
            <EditableQuestionOptions
              metadata={question.metadata}
              questionType={question.type}
              handleEdit={(metadata: string) => {
                const newQuestions = questions.map((q, i) => {
                  if (i === index) {
                    return { ...q, metadata: metadata };
                  }
                  return q;
                });
                setQuestions(newQuestions);
              }}
            />
          </Box>
        ))}
      </Box>
      <Box className={"button-container"}>
        <Button
          size="medium"
          variant="green"
          onClick={handleAddQuestion}
          disabled={false}
        >
          Agregar Pregunta
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Guardar
        </Button>
      </Box>
    </Box>
  );
};

export default EditQuestionnaire;
