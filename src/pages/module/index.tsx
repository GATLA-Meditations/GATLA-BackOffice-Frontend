import { useCreateNewActivity, useDeleteModule, useGetModule, useUpdateModule } from '../../service/api.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import OptionComponent from '../../components/OptionComponent';
import styles from './styles.module.css';
import { useAppDispatch } from '../../redux/hooks.ts';
import { removeRoutePath, updateRoutePath } from '../../redux/routeSlice.ts';
import { ActivityPreview } from '../../types';
import Loader from '../../components/Loader';
import EditableInput from '../../components/EditableInput';
import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import withToast, { WithToastProps } from '../../hoc/withToast.tsx';
import DeleteModuleModal from './deleteModule';

const Module = ({ showToast }: WithToastProps) => {
    const moduleId = useParams().id;
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { data, isLoading } = useGetModule(moduleId as string);
    const [deleteModuleModal, setDeleteModuleModal] = useState<boolean>(false);
    const { mutate: deleteModule, isSuccess: deleteModuleSuccess } = useDeleteModule();
    const [moduleName, setModuleName] = useState('');
    const [moduleDescription, setModuleDescription] = useState('');
    const [activities, setActivities] = useState<ActivityPreview[]>([]);
    const { mutate: updateModule, isSuccess: updateModuleSuccess } = useUpdateModule();
    const { mutate: createActivity, data: newActivity, isSuccess: createActivitySuccess } = useCreateNewActivity();

    const handleDeleteModule = () => {
        deleteModule(moduleId as string);
    };

    useEffect(() => {
        if (data) {
            setModuleName(data.name);
            setModuleDescription(data.description);
            setActivities(data.activities);
        }
    }, [data]);

    useEffect(() => {
        if (deleteModuleSuccess) {
            const treatmentId = localStorage.getItem('treatmentId');
            dispatch(removeRoutePath());
            navigate(`/treatments/${treatmentId}`, { replace: true });
        }
    }, [deleteModuleSuccess]);

    useEffect(() => {
        if (updateModuleSuccess) {
            showToast('Módulo actualizado', 'success');
        }
    }, [updateModuleSuccess]);

    useEffect(() => {
        if (createActivitySuccess) {
            showToast('Actividad creada', 'success');
            setActivities([...activities, newActivity]);
        }
    }, [createActivitySuccess]);

    const handleAddActivity = () => {
        createActivity(moduleId as string);
    };

    const handleSave = () => {
        updateModule({ id: moduleId as string, data: { name: moduleName, description: moduleDescription } });
    };

    if (isLoading) {
        return <Loader />;
    }

    const handleActivityOnClick = (activity: ActivityPreview) => {
        dispatch(updateRoutePath({ id: activity.id, name: activity.name, route: `/activity/${activity.id}` }));
        navigate(`/activity/${activity.id}`);
    };

    return (
        <Box className={styles.modulePage}>
            <Box className={'treatment-info-container'}>
                <Button onClick={() => setDeleteModuleModal(true)} variant={'red'}>Eliminar módulo</Button>
                <DeleteModuleModal
                    open={deleteModuleModal}
                    onClose={() => setDeleteModuleModal(false)}
                    onDelete={handleDeleteModule}
                    moduleName={data ? data.name : ''}
                />
                <Box>
                    <EditableInput
                        text={moduleName}
                        placeholder={'Nombre'}
                        type={'text'}
                        name="treatmentName"
                        handleChange={(e) => setModuleName(e.target.value)}
                        title={'Nombre del módulo:'}
                    />
                    <EditableInput
                        text={moduleDescription}
                        placeholder={'Descripción'}
                        type={'text'}
                        name={'treatmentDescription'}
                        handleChange={(e) => setModuleDescription(e.target.value)}
                        title={'Descripción del módulo:'}
                    />
                </Box>
                <Button onClick={handleSave} variant={'primary'}>Guardar</Button>

                <Box className={'display-items-page'}>

                    <Box className={'items'}>
                        <p className={'h6 bold'}>Actividades:</p>
                        {activities.length > 0 ? activities.map((activity) => (
                                <OptionComponent title={activity.name} onClick={() => handleActivityOnClick(activity)} />
                            )) :
                            <p className={'body1 bold'}>No hay actividades asignadas a este módulo</p>
                        }
                        <Button onClick={handleAddActivity} variant={'green'}>Agregar actividad</Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default withToast(Module);