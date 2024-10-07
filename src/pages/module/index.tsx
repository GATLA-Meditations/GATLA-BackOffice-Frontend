import {useGetModule} from "../../service/api.ts";
import {useNavigate, useParams} from "react-router-dom";
import {Box} from "@mui/material";
import OptionComponent from "../../components/OptionComponent";
import styles from './styles.module.css'
import {useAppDispatch} from "../../redux/hooks.ts";
import {updateRoutePath} from "../../redux/routeSlice.ts";
import {ActivityPreview} from "../../types";
import Loader from '../../components/Loader';


const Module = () => {
    const moduleId = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { data, isLoading } = useGetModule(moduleId.id as string);

    if(isLoading){
        return <Loader/>;
    }

    const handleActivityOnClick = (activity: ActivityPreview) => {
        dispatch(updateRoutePath({id: activity.id, name:activity.name, route: `/activity/${activity.id}`}))
        navigate(`/activity/${activity.id}`)
    }

    return(
        <Box className={styles.moduleContainer}>
            {data?.activities.map((activity) => (
                <OptionComponent title={activity.name} onClick={() => handleActivityOnClick(activity)}/>
            ))}
        </Box>

    );


}

export default Module;