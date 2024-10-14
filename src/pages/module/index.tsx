import { useCreateNewActivity, useGetModule, useUpdateModule } from '../../service/api.ts';
import {useNavigate, useParams} from "react-router-dom";
import {Box} from "@mui/material";
import OptionComponent from "../../components/OptionComponent";
import styles from './styles.module.css'
import {useAppDispatch} from "../../redux/hooks.ts";
import {updateRoutePath} from "../../redux/routeSlice.ts";
import { ActivityPreview } from '../../types';
import Loader from '../../components/Loader';
import EditableInput from '../../components/EditableInput';
import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import withToast, { WithToastProps } from '../../hoc/withToast.tsx';

const Module = ({showToast}: WithToastProps) => {
    const moduleId = useParams().id;
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { data, isLoading } = useGetModule(moduleId as string);
    const [moduleName, setModuleName] = useState('');
    const [moduleDescription, setModuleDescription] = useState('');
    const [activities, setActivities] = useState<ActivityPreview[]>([]);
    const {mutate: updateModule, isSuccess: updateModuleSuccess} = useUpdateModule();
    const {mutate: createActivity, data: newActivity , isSuccess: createActivitySuccess} = useCreateNewActivity();

    useEffect(() => {
        if(data){
            setModuleName(data.name);
            setModuleDescription(data.description);
            setActivities(data.activities);
        }
    }, [data]);

    useEffect(() => {
        if(updateModuleSuccess){
            showToast('Módulo actualizado', 'success')
        }
    }, [updateModuleSuccess]);

    useEffect(() => {
        if(createActivitySuccess){
            showToast('Actividad creada', 'success')
            setActivities([...activities, newActivity]);
        }
    }, [createActivitySuccess]);

    const handleAddActivity = () => {
        createActivity(moduleId as string);
    }

    const handleSave = () => {
        updateModule({id: moduleId as string, data: {name: moduleName, description: moduleDescription}});
    }

    if(isLoading){
        return <Loader/>;
    }

    const handleActivityOnClick = (activity: ActivityPreview) => {
        dispatch(updateRoutePath({id: activity.id, name:activity.name, route: `/activity/${activity.id}`}))
        navigate(`/activity/${activity.id}`)
    }

    return(
        <Box className={styles.modulePage}>
            <Box>
                <EditableInput
                    text={moduleName}
                    placeholder={'Nombre'}
                    type={'text'}
                    name='treatmentName'
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
            <Box>
                <h3>Actividades:</h3>
                <Box className={styles.moduleContainer}>
                    {activities.length > 0 ? activities.map((activity) => (
                        <OptionComponent title={activity.name} onClick={() => handleActivityOnClick(activity)}/>
                    )) :
                        <h4>No hay actividades asignadas a este módulo</h4>
                    }
                </Box>
                <Button onClick={handleAddActivity} variant={'green'}>Agregar actividad</Button>
            </Box>
            <Button onClick={handleSave} variant={'primary'}>Guardar</Button>
        </Box>
    );
}

export default withToast(Module);