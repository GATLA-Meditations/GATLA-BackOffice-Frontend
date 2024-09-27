import {useNavigate, useParams} from "react-router-dom";
import {Module} from "../../types";
import '../../common/globals.css';
import {Box} from "@mui/material";
import {RightArrowIcon} from "../../assets/Icons/RightArrowIcon";
import EditableInput from "../../components/EditableInput";
import {useState} from "react";
import {useAppDispatch} from "../../redux/hooks.ts";
import {updateRoutePath} from "../../redux/routeSlice.ts";

const modulesMock: Module[] = [{
    id: '1',
    name: 'Módulo 1',
    description: 'Descripción del módulo 1',
    activities: [],
    type: "",
    progress: null
}, {
    id: '2',
    name: 'Módulo 2',
    description: 'Descripción del módulo 2',
    type: "",
    activities: [],
    progress: null
},
    {
        id: '3',
        name: 'Módulo 3',
        description: 'Descripción del módulo 3',
        type: "",
        activities: [],
        progress: null
    },
    {
        id: '4',
        name: 'Módulo 4',
        description: 'Descripción del módulo 4',
        type: "",
        activities: [],
        progress: null
    },
    {
        id: '5',
        name: 'Módulo 5',
        description: 'Descripción del módulo 5',
        type: "",
        activities: [],
        progress: null
    }];

const treatmentMok = {
    id: '1',
    name: 'Tratamiento 1',
    description: 'Descripción del tratamiento 1',
    modules: modulesMock
}

const Treatment = () => {
    const id = useParams().id;
    const nav = useNavigate();
    const dispatch = useAppDispatch();
    const [treatment, setTreatment] = useState(treatmentMok); // set will be used to fetch the treatment from the backend
    const [treatmentName, setTreatmentName] = useState<string>(''); // treatment name will be used in case of update treatment integration
    const [treatmentDescription, setTreatmentDescription] = useState<string>(''); // same as treatment name

    const handleClickModule = (module: Module) => {
        dispatch(updateRoutePath({name: module.name, route: `/module/${module.id}`}));
        nav(`/module/${module.id}`);
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
                <h3>Módulos:</h3>
                <Box className='items'>
                    {treatment.modules.length > 0 ? treatment.modules.map(module => (
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

export default Treatment;