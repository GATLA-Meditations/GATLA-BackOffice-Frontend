import {exportQuestionnaire, useGetAllQuestionnaires} from "../../service/api.ts";
import Loader from "../../components/Loader";
import {FormControl, MenuItem, Select} from "@mui/material";
import Button from "../../components/Button";
import {useState} from "react";
import './styles.css';
import { saveAs } from 'file-saver';


const Export = () => {

    const {data: questionnaires, isLoading} = useGetAllQuestionnaires();
    const [questionnaireId, setQuestionnaireId] = useState<string>('');


    const handleChange = (newQuestionnaireId: string) => {
        setQuestionnaireId(newQuestionnaireId)
    };

    const handleQuestionnaireExport = async () => {
        try{
            const file = await exportQuestionnaire(questionnaireId);
            saveAs(file, `questionnaire_${questionnaireId}.csv`);
        } catch (e){
            console.log(e);
        }
    }


    if (isLoading) {
        return <Loader/>
    }

    return(
        <div className={'export-container'}>
            <div className={'export-questionnaires-container'}>
                <FormControl>
                    <Select
                        variant={'outlined'}
                        value={questionnaireId}
                        onChange={(e) => handleChange(e.target.value)}
                    >
                        {questionnaires?.map((questionnaire: any) => (
                            <MenuItem value={questionnaire.id}>{questionnaire.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button onClick={handleQuestionnaireExport} disabled={questionnaireId === ''} variant={'primary'}>Exportar</Button>
            </div>

        </div>

    );


}
export default Export