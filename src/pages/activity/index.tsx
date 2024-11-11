import EditableInput from "../../components/EditableInput";
import { Box, FormControl, Input, MenuItem, Select } from '@mui/material';
import { useEffect, useState } from 'react';
import styles from './styles.module.css'
import Button from "../../components/Button";
import {useNavigate, useParams} from 'react-router-dom';
import {
    useAddContent,
    useDeleteActivity,
    useDeleteContent,
    useGetActivity,
    useUpdateActivity
} from '../../service/api.ts';
import { Activity, ActivityContent } from '../../types';
import Loader from '../../components/Loader';
import withToast, { WithToastProps } from '../../hoc/withToast.tsx';
import GenericModal from '../../components/GenericModal';
import {useAppDispatch} from "../../redux/hooks.ts";
import {removeRoutePath} from "../../redux/routeSlice.ts";



const ActivityEdit = ({showToast}:WithToastProps) => {

    const activityId = useParams().id;
    const {data, isLoading} = useGetActivity(activityId as string);
    const dispatch = useAppDispatch();
    const [activity, setActivity] = useState<Activity>();
    const [contents, setContents] = useState<ActivityContent[]>([]);
    const {mutate: updateActivity, isSuccess: updateActivitySuccess} = useUpdateActivity();
    const {mutate: deleteContent, isSuccess: deleteContentSuccess} = useDeleteContent();
    const {mutate: deleteActivity, isSuccess: deleteActivitySuccess} = useDeleteActivity();
    const {data: updatedContents, mutate: addContent, isSuccess: addContentSuccess} = useAddContent();
    const [createContentModalOpen, setCreateContentModalOpen] = useState<boolean>(false);
    const [contentType, setContentType] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const navigation = useNavigate();

    useEffect(() => {
        if(data){
            setActivity(data);
            setContents(data.contents.reverse())
        }
    }, [data]);

    useEffect(() => {
        if(updateActivitySuccess){
            showToast('Actividad actualizada', 'success')
        }
    }, [updateActivitySuccess]);

    useEffect(() => {
        if(deleteContentSuccess){
            showToast('Contenido eliminado', 'success')
        }
    }, [deleteContentSuccess]);

    useEffect(() => {
        if(addContentSuccess){
            showToast('Contenido agregado', 'success')
            setContents(updatedContents)
        }
    }, [addContentSuccess]);

    useEffect(() => {
        if(deleteActivitySuccess){
            setIsDeleteModalOpen(false)
            showToast('Actividad eliminada', 'success')
            const moduleId = localStorage.getItem('moduleId');
            dispatch(removeRoutePath());
            setTimeout(() => {
                navigation(`/module/${moduleId}`)
            }, 3000);
        }
    }, [deleteActivitySuccess]);

    const handleChange = (key: string, value: string, contentId?: string) => {
        if(activity){
            if(contentId){
                const newContents = contents.map((content) => {
                    if(content.id === contentId){
                        return {...content, [key]: value}
                    }
                    return content
                })
                setContents(newContents)
                setActivity({...activity, contents: newContents})
            } else
            setActivity({...activity, [key]: value})
        }
    }

    const getContentTitle = (type: string) => {
        switch (type) {
            case 'TEXT':
                return 'Texto';
            case 'VIDEO':
                return 'Video';
            case 'MED_INTRO':
                return 'Video';
            case 'MED_VIDEO':
                return 'Video';
            default:
                return '';
        }
    }

    const getContentPlaceholder = (type: string) => {
        switch (type) {
            case 'TEXT':
                return 'Contenido';
            case 'VIDEO':
                return 'URL del video';
            case 'MED_INTRO':
                return 'URL del video';
            case 'MED_VIDEO':
                return 'URL del video';
            default:
                return '';
        }
    }

    const handleDeleteContent = (contentId: string) => {
        if (contentId === '') return;
        deleteContent({id: activityId as string, contentId})
        const newContents = contents.filter((content) => content.id !== contentId)
        setContents(newContents)
    }

    const handleCloseModal = () => {
        setContentType('')
        setContent('')
        setCreateContentModalOpen(false)
    }

    const handleAddContent = () => {
        if(contentType && content){
            addContent({id: activityId as string, contents: [{type: contentType, content, order: contents.length + 1}, ...contents]})
            setContentType('')
            setContent('')
            setCreateContentModalOpen(false)
        }
    }

    const handleSubmit = () => {
        if(activity){
            updateActivity({content: contents, activity: {id: activity.id, title: activity.name}})
        }
    }

    const handleDelete = () => {
        if (activity){
            deleteActivity(activity.id)
        }
    };

    if(isLoading){
        return <Loader />;
    }

    if (activity && contents) {
        return (
            <>
                {
                    isDeleteModalOpen && (
                        <GenericModal
                            open={isDeleteModalOpen}
                            onClose={() => setIsDeleteModalOpen(false)}
                            topButtonAction={handleDelete}
                            title={'Eliminar actividad'}
                            description={'¿Estás seguro que quieres eliminar esta actividad?'}
                            topButtonText={'Eliminar'}
                        />
                    )
                }
                <Box className={styles.activityContainer}>
                    <EditableInput title={'Título'} text={activity.name} placeholder={'Título'} type={'text'} name={'title'}
                                   handleChange={(e) => handleChange('name', e.target.value)}/>
                    {contents.map((content) => (
                        <EditableInput
                            key={content.id}
                            text={content.content}
                            placeholder={getContentPlaceholder(content.type)}
                            type={'text'}
                            name={content.type}
                            title={getContentTitle(content.type)}
                            handleChange={(e) => handleChange('content', e.target.value, content.id)}
                            isDeletaable={!!content.id}
                            onDelete={() => handleDeleteContent(content.id ? content.id : '')}
                        />
                    ))}
                    <GenericModal
                        open={createContentModalOpen}
                        onClose={handleCloseModal}
                        topButtonAction={handleAddContent}
                        title={'Agregar Contenido'}
                        description={'Agrega un nuevo contenido a la actividad'}
                        topButtonText={'Agregar'}
                        disabled={!contentType || !content}
                    >
                        <Box className={styles.modalContainer}>
                            <Box>
                                <h4>Tipo:</h4>
                                <FormControl>
                                    <Select
                                        variant={'outlined'}
                                        className={'questionnaire-selector'}
                                        value={contentType || ''}
                                        onChange={(event) => setContentType(event.target.value)}
                                        displayEmpty
                                    >
                                        <MenuItem key={0} value={''} disabled>
                                            Elige un tipo
                                        </MenuItem>
                                        <MenuItem key={1} value={'TEXT'}>
                                            Texto
                                        </MenuItem>
                                        <MenuItem key={2} value={'VIDEO'}>
                                            Video
                                        </MenuItem>
                                        <MenuItem key={3} value={'MED_INTRO'}>
                                            Video de introducción
                                        </MenuItem>
                                        <MenuItem key={4} value={'MED_VIDEO'}>
                                            Video de meditación
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box>
                                <h4>Contenido:</h4>
                                <Input
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder={'Contenido'}
                                    className={styles.contentInput}
                                    disableUnderline
                                />
                            </Box>
                        </Box>
                    </GenericModal>
                    <Box className={'buttons-container'}>
                    <Button onClick={() => setCreateContentModalOpen(true)} variant={'green'} size={'medium'}>Agregar Contenido</Button>
                    <Button onClick={() => handleSubmit()} variant={'primary'} size={'medium'}>Guardar</Button>
                    <Button onClick={() => setIsDeleteModalOpen(true)} variant={'red'} size={'medium'}>Eliminar actividad</Button>
                    </Box>
                </Box>
            </>
        )
    }
}
export default withToast(ActivityEdit)