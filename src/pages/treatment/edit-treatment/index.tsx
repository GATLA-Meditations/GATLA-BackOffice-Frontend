import {useNavigate, useParams} from "react-router-dom";
import { Module, Questionnaire } from '../../../types';
import '../../../common/globals.css';
import { Box, FormControl, MenuItem, Select } from '@mui/material';
import {RightArrowIcon} from "../../../assets/Icons/RightArrowIcon";
import EditableInput from "../../../components/EditableInput";
import { useEffect, useState } from 'react';
import {useAppDispatch} from "../../../redux/hooks.ts";
import { removeRoutePath, updateRoutePath } from '../../../redux/routeSlice.ts';
import {
    useAddQuestionnaireToTreatment,
    useCreateNewModule, useDeleteTreatment, useDisconnectQuestionnaire,
    useGetAllQuestionnaires,
    useGetTreatmentById,
    useUpdateTreatment,
} from '../../../service/api.ts';
import Loader from '../../../components/Loader';
import Button from '../../../components/Button';
import withToast, { WithToastProps } from '../../../hoc/withToast.tsx';
import GenericModal from '../../../components/GenericModal';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteTreatmentModal from '../deleteTreatment';

const EditTreatment = ({showToast}: WithToastProps) => {
    const id = useParams().id;
    const nav = useNavigate();
    const dispatch = useAppDispatch();
    const {data: treatment, isLoading} = useGetTreatmentById(id as string);
    const [deleteTreatmentModal, setDeleteTreatmentModal] = useState<boolean>(false);
    const {
        mutate: deleteTreatment,
        isSuccess: deletedTreatmentSuccess,
        isError: deletedTreatmentError} = useDeleteTreatment();
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
    const {mutate: disconnectQuestionnaire, isSuccess: questionnaireDisconnected} = useDisconnectQuestionnaire()

    const handleDeleteTreatment = () => {
        deleteTreatment(id as string);
    }

    useEffect(() => {
        if (deletedTreatmentSuccess) {
            dispatch(removeRoutePath());
            nav('/treatments');
        }
    }, [deletedTreatmentSuccess]);

    useEffect(() => {
        if (deletedTreatmentError) {
            showToast('Error al eliminar el tratamiento', 'error');
        }
    }, [deletedTreatmentError]);

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

    const handleDisconnectQuestionnaire = (questionnaireId: string) => {
        disconnectQuestionnaire({ treatmentId: id as string, questionnaireId })
        setTreatmentQuestionnaires(treatmentQuestionnaires.filter(questionnaire => questionnaire.id !== questionnaireId));
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
            setTreatmentQuestionnaires([...treatmentQuestionnaires, questionnaires.find((questionnaire: Questionnaire) => questionnaire.id === selectedQuestionnaire)]);
        }
    }, [questionnaireAdded]);

    useEffect(() => {
        if (questionnaireDisconnected) {
            showToast('Cuestionario eliminado', 'success')
        }
    }, [questionnaireDisconnected]);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <Box className='display-items-page'>
            <DeleteTreatmentModal
                open={deleteTreatmentModal}
                onClose={() => setDeleteTreatmentModal(false)}
                onDelete={handleDeleteTreatment}
                treatmentName={treatment.name}
            />
            <Box className={'treatment-info-container'}>
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
            <Box className={'buttons-container'}>
            <Button variant="primary" onClick={handleSave}>
                Guardar
            </Button>
            <Button onClick={() => setDeleteTreatmentModal(true)} variant={'red'} size={'medium'}>Eliminar</Button>
            </Box>
            <Box>
                <p className={'h6 bold'}>Cuestionario/s:</p>
                {treatmentQuestionnaires.length > 0 ? treatmentQuestionnaires.map((questionnaire: Questionnaire) => (
                    <Box key={questionnaire.id} sx={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <p className={'body1'}>- {questionnaire.name}</p>
                        <DeleteIcon className='icon delete-icon' onClick={() => handleDisconnectQuestionnaire(questionnaire.id)}/>
                    </Box>
                    ))
                    : <p className={'body1bold'}>No hay cuestionarios asignados a este tratamiento</p>
                }
                <Button onClick={() => {setIsEditingQuestionnaire(true)}} variant={'green'} size={'medium'}>Agregar</Button>
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
                <p className={'h6 bold'}>Módulos:</p>
                <Box className='items'>
                    {treatmentModules.length > 0 ? treatmentModules.map((module: Module) => (
                        <Box key={module.id} className='item' onClick={() => handleClickModule(module)}>
                            <Box>
                                <p className={'body1 bold'}>{module.name}</p>
                                <p className={'body2 '}>{module.description}</p>
                            </Box>
                            <RightArrowIcon/>
                        </Box>
                    ))
                        : <p className={'body1 bold'}>No hay módulos</p>
                    }
                </Box>
                <Button onClick={handleAddModule} variant={'green'}>Agregar</Button>
            </Box>
        </Box>
    );
};

export default withToast(EditTreatment);