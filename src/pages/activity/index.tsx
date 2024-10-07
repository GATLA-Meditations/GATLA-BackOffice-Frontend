import EditableInput from "../../components/EditableInput";
import {Box} from "@mui/material";
import { useEffect, useState } from 'react';
import styles from './styles.module.css'
import Button from "../../components/Button";
import {useParams} from "react-router-dom";
import { useGetActivity, useUpdateActivity } from '../../service/api.ts';
import { Activity, ActivityContent } from '../../types';
import Loader from '../../components/Loader';

const ActivityEdit = () => {

    const activityId = useParams().id;
    const {data, isLoading} = useGetActivity(activityId as string);
    const [activity, setActivity] = useState<Activity>();
    const [contents, setContents] = useState<ActivityContent[]>([]);
    const {mutate: updateActivity} = useUpdateActivity();

    useEffect(() => {
        if(data){
            setActivity(data);
            setContents(data.contents)
        }
    }, [data]);

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
            default:
                return '';
        }
    }

    const handleSubmit = () => {
        if(activity){
            updateActivity({content: contents, activity: {id: activity.id, title: activity.name}})
        }
    }

    if(isLoading){
        return <Loader />;
    }

    if (activity && contents) {
        return (
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
                        handleChange={(e) => handleChange('content', e.target.value, content.id)} />
                ))}
                <Button onClick={() => handleSubmit()} variant={'primary'} size={'medium'}>Guardar</Button>
            </Box>
        )
    }
}
export default ActivityEdit