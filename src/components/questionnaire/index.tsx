import React from "react";
import "./styles.css";
import { Question, Questionaire } from "../../types";
import { Box } from "@mui/material";
import Button from "../Button";
import EditableInput from "../EditableInput";
import AddIcon from "@mui/icons-material/Add";
import { generateRandomId } from "../../util";
import EditableQuestionOptions from "../EditableQuestionOptions";

interface QuestionnaireProps {
  questionnaire: Questionaire;
}

const Questionnaire = ({ questionnaire }: QuestionnaireProps) => {
  const [name, setName] = React.useState(questionnaire.name);
  const [questions, setQuestions] = React.useState<Question[]>(
    questionnaire.questions
  );

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
      type: "NUMERIC",
      metadata: '{ "min": 1, "max": 7 }',
      questionnaireId: questionnaire.id,
    };
    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
  };

  const handleDeleteQuestion = (index: number) => {
    const newQuestions = questions.filter((_question, i) => i !== index);
    setQuestions(newQuestions);
  };

  const handleChangeQuantity = (quantity: number, index: number) => {
    const newQuestions = questions.map((question, i) => {
      if (quantity < 1) {
        return question;
      }
      if (i === index) {
        return { ...question, metadata: `{ "min": 1, "max": ${quantity} }` };
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
        {questions.map((question, index) => (
          <Box>
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
            <EditableQuestionOptions
              quantity={JSON.parse(question.metadata).max}
              handleIncrease={() =>
                handleChangeQuantity(
                  JSON.parse(question.metadata).max + 1,
                  index
                )
              }
              handleDecrease={() =>
                handleChangeQuantity(
                  JSON.parse(question.metadata).max - 1,
                  index
                )
              }
            />
          </Box>
        ))}
      </Box>
      <Box className={"button-container"}>
        <Button
          size="small"
          variant="green"
          onClick={handleAddQuestion}
          disabled={false}
        >
          <AddIcon />
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Guardar
        </Button>
      </Box>
    </Box>
  );
};

export default Questionnaire;
