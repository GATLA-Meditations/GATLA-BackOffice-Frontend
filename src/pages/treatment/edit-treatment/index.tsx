import {useNavigate, useParams} from "react-router-dom";
import { Module, Questionnaire } from '../../../types';
import '../../../common/globals.css';
import { Box, FormControl, MenuItem, Select } from '@mui/material';
import {RightArrowIcon} from "../../../assets/Icons/RightArrowIcon";
import EditableInput from "../../../components/EditableInput";
import { useEffect, useState } from 'react';
import {useAppDispatch} from "../../../redux/hooks.ts";
import {updateRoutePath} from "../../../redux/routeSlice.ts";
import {
    useAddQuestionnaireToTreatment,
    useCreateNewModule,
    useGetAllQuestionnaires,
    useGetTreatmentById,
    useUpdateTreatment,
} from '../../../service/api.ts';
import Loader from '../../../components/Loader';
import Button from '../../../components/Button';
import withToast, { WithToastProps } from '../../../hoc/withToast.tsx';
import GenericModal from '../../../components/GenericModal';

const EditTreatment = ({showToast}: WithToastProps) => {
    const id = useParams().id;
    const nav = useNavigate();
    const dispatch = useAppDispatch();
    const {data: treatment, isLoading} = useGetTreatmentById(id as string);
    const [treatmentName, setTreatmentName] = useState<string>(''); // treatment name will be used in case of update treatment integration
    const [treatmentDescription, setTreatmentDescription] = useState<string>(''); // same as treatment name
    const [treatmentQuestionnaires, setTreatmentQuestionnaires] = useState<Questionnaire[]>([]);
    const [treatmentModules, setTreatmentModules] = useState<Module[]>([]);
    const {mutate: updateTreatment, isSuccess: updateTreatmentSuccess} = useUpdateTreatment();
    const {mutate: createNewModule, data: newModule, isSuccess: createNewModuleSuccess} = useCreateNewModule();
    const [isEditingQuestionnaire, setIsEditingQuestionnaire] = useState<boolean>(false);
    const {data: questionnaires} = useGetAllQuestionnaires();
    const [selectedQuestionnaire, setSelectedQuestionnaire] = useState<string>('');
    const {mutate: addQuestionnaire, isSuccess: questionnaireAdded} = useAddQuestionnaireToTreatment();

    const handleSelectQuestionnaire = (questionnaireId: string) => {
        setSelectedQuestionnaire(questionnaireId);
    }

    const handleAddQuestionnaire = () => {
        if (selectedQuestionnaire) {
            addQuestionnaire({ treatmentId: id as string, questionnaireId: selectedQuestionnaire });
            setIsEditingQuestionnaire(false);
        }
    }

    const handleCancelAddQuestionnaire = () => {
        setSelectedQuestionnaire('');
        setIsEditingQuestionnaire(false);
    }

    const handleClickModule = (module: Module) => {
        dispatch(updateRoutePath({name: module.name, route: `/module/${module.id}`}));
        nav(`/module/${module.id}`);
        console.log(treatmentName);
        console.log(treatmentDescription);
    }

    const handleAddModule = () => {
        createNewModule(id as string);
    }

    const handleSave = () => {
        updateTreatment({id: id as string, data: {name: treatmentName, description: treatmentDescription}});
    }

    useEffect(() => {
        if (treatment) {
            setTreatmentName(treatment.name);
            setTreatmentDescription(treatment.description);
            setTreatmentModules(treatment.modules);
            setTreatmentQuestionnaires(treatment.questionnaires);
        }
    }, [treatment]);

    useEffect(() => {
        if (createNewModuleSuccess) {
            showToast('Módulo creado', 'success');
            setTreatmentModules([...treatmentModules, newModule]);
        }
    }, [createNewModuleSuccess]);

    useEffect(() => {
        if (newModule) {
            setTreatmentModules([...treatmentModules, newModule]);
        }
    }, [newModule]);

    useEffect(() => {
        if (updateTreatmentSuccess) {
            showToast('Tratamiento actualizado', 'success');
        }
    }, [updateTreatmentSuccess]);

    useEffect(() => {
        if (questionnaireAdded) {
            showToast('Cuestionario añadido', 'success');
        }
    }, [questionnaireAdded]);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <Box className='display-items-page'>
            <Box>
                <EditableInput
                    text={treatmentName}
                    placeholder={'Nombre'}
                    type={'text'}
                    name='treatmentName'
                    handleChange={(e) => setTreatmentName(e.target.value)}
                    title={'Nombre del tratamiento:'}
                />
                <EditableInput
                    text={treatmentDescription}
                    placeholder={'Descripción'}
                    type={'text'}
                    name={'treatmentDescription'}
                    handleChange={(e) => setTreatmentDescription(e.target.value)}
                    title={'Descripción del tratamiento:'}
                />
            </Box>
            <Box>
                <h3>Cuestionario:</h3>
                {treatmentQuestionnaires.length > 0 ? treatmentQuestionnaires.map((questionnaire: Questionnaire) => (
                    <Box key={questionnaire.id}>
                        <h4>- {questionnaire.name}</h4>
                    </Box>
                    ))
                    : <h4>No hay cuestionarios asignados a este tratamiento</h4>
                }
                <Button onClick={() => {setIsEditingQuestionnaire(true)}} variant={'green'}>Agregar cuestionario</Button>
                {isEditingQuestionnaire && (
                    <GenericModal
                        open={isEditingQuestionnaire}
                        onClose={handleCancelAddQuestionnaire}
                        topButtonAction={handleAddQuestionnaire}
                        title={'Seleccionar un cuestionario'}
                        description={'Los cuestionarios se mostrarán al principio y al final del tratamiento.'}
                        topButtonText={'Agregar'}
                        disabled={!selectedQuestionnaire}
                    >
                        <FormControl>
                            <Select
                                variant={'outlined'}
                                className={'questionnaire-selector'}
                                value={selectedQuestionnaire || ''}
                                onChange={(event) => handleSelectQuestionnaire(event.target.value)}
                                displayEmpty
                            >
                                <MenuItem key={0} value={''} disabled>
                                    Elige un cuestionario
                                </MenuItem>
                                {questionnaires?.map((questionnaire: Questionnaire) => (
                                    <MenuItem key={questionnaire.id} value={questionnaire.id}>
                                        {questionnaire.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </GenericModal>
                )}
            </Box>
            <Box>
                <h3>Módulos:</h3>
                <Box className='items'>
                    {treatmentModules.length > 0 ? treatmentModules.map((module: Module) => (
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
                <Button onClick={handleAddModule} variant={'green'}>Agregar módulo</Button>
            </Box>
            <Button variant="primary" onClick={handleSave}>
                Guardar
            </Button>
        </Box>
    );
};

export default withToast(EditTreatment);