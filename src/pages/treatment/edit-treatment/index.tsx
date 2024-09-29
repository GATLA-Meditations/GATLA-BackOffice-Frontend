import {useNavigate, useParams} from "react-router-dom";
import {Module, Questionnaire} from "../../../types";
import '../../../common/globals.css';
import {Box} from "@mui/material";
import {RightArrowIcon} from "../../../assets/Icons/RightArrowIcon";
import EditableInput from "../../../components/EditableInput";
import {useState} from "react";
import {useAppDispatch} from "../../../redux/hooks.ts";
import {updateRoutePath} from "../../../redux/routeSlice.ts";
import {useGetTreatmentById} from "../../../service/api.ts";

const EditTreatment = () => {
    const id = useParams().id;
    const nav = useNavigate();
    const dispatch = useAppDispatch();
    const {data: treatment, isLoading} = useGetTreatmentById(id as string);
    const [treatmentName, setTreatmentName] = useState<string>(''); // treatment name will be used in case of update treatment integration
    const [treatmentDescription, setTreatmentDescription] = useState<string>(''); // same as treatment name

    const handleClickModule = (module: Module) => {
        dispatch(updateRoutePath({name: module.name, route: `/module/${module.id}`}));
        nav(`/module/${module.id}`);
    }

    if (isLoading) {
        return <h1>Loading</h1>
    }

    return (
        <Box className='display-items-page'>
            <Box>
                <EditableInput
                    text={treatment.name}
                    placeholder={'Nombre'}
                    type={'text'}
                    name='treatmentName'
                    handleChange={(e) => setTreatmentName(e.target.value)}
                    title={'Nombre del tratamiento:'}
                />
                <EditableInput
                    text={treatment.description}
                    placeholder={'Descripción'}
                    type={'text'}
                    name={'treatmentDescription'}
                    handleChange={(e) => setTreatmentDescription(e.target.value)}
                    title={'Descripción del tratamiento:'}
                />
            </Box>
            <Box>
                <h3>Cuestionarios:</h3>
                {treatment.questionnaires.length > 0 ? treatment.questionnaires.map((questionnaire: Questionnaire) => (
                    <Box key={questionnaire.id}>
                        <h4>- {questionnaire.name}</h4>
                    </Box>
                    ))
                    : <h4>No hay cuestionarios asignados a este tratamiento</h4>
                }
            </Box>
            <Box>
                <h3>Módulos:</h3>
                <Box className='items'>
                    {treatment.modules.length > 0 ? treatment.modules.map((module: Module) => (
                        <Box key={module.id} className='item' onClick={() => handleClickModule(module)}>
                            <Box>
                                <h4>{module.name}</h4>
                                <p>{module.description}</p>
                            </Box>
                            <RightArrowIcon/>
                        </Box>
                    ))
                        : <h4>No hay módulos</h4>
                    }
                </Box>
            </Box>
        </Box>
    );
};

export default EditTreatment;