import EditableInput from "../../components/EditableInput";
import {Box} from "@mui/material";
import {activityMock} from "../../mocks";
import {useState} from "react";
import styles from './styles.module.css'
import Button from "../../components/Button";


type attributeType = keyof typeof activityMock;

const ActivityEdit = () => {

    const [mockActivity, setMockActivity] = useState(activityMock);

    const handleChange = (attribute:attributeType, newValue:string) => {
        setMockActivity({...mockActivity, [attribute]: newValue })
    }

    const handleSubmit = () => {
        // First would be the post to the backend then the dispatch
        console.log(mockActivity)
    }

    return (
        <Box className={styles.activityContainer}>
            <EditableInput title={'Título'} text={mockActivity.title} placeholder={'afeaf'} type={'text'} name={'Título'} handleChange={(e) => handleChange('title', e.target.value)}/>
            <EditableInput title={'Descripción'} text={mockActivity.description} placeholder={'anfeanef'} type={'text'} name={'Descripción'} handleChange={(e) => handleChange('description', e.target.value)}/>
            <EditableInput title={'Url del video'} text={mockActivity.videoUrl} placeholder={'aeffafea'} type={'text'} name={'Url del video'} handleChange={(e) => handleChange('videoUrl', e.target.value)}/>
            <Button onClick={() => handleSubmit()} variant={'primary'} size={'medium'}>Guardar</Button>
        </Box>

    )


}
export default ActivityEdit