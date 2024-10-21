import { Box, Input } from '@mui/material';
import { useCreateTreatment, useGetAllTreatments } from '../../../service/api.ts';
import {useEffect, useState} from "react";
import {Treatment} from "../../../types";
import SearchBar from "../../../components/SearchBar";
import '../../../common/globals.css';
import {RightArrowIcon} from "../../../assets/Icons/RightArrowIcon";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../../redux/hooks.ts";
import {updateRoutePath} from "../../../redux/routeSlice.ts";
import Loader from '../../../components/Loader';
import Button from '../../../components/Button';
import GenericModal from '../../../components/GenericModal';
import withToast, { WithToastProps } from '../../../hoc/withToast.tsx';
import './styles.css';
// import {useNavigate} from "react-router-dom";

const TreatmentsPage = ({showToast}: WithToastProps) => {
    const {data: treatments, isLoading} = useGetAllTreatments();
    const [filteredTreatments, setFilteredTreatments] = useState<Treatment[]>(treatments);
    const [search, setSearch] = useState<string>('');
    const nav = useNavigate();
    const dispatch = useAppDispatch();
    const [createTreatmentModal, setCreateTreatmentModal] = useState<boolean>(false);
    const [treatmentName, setTreatmentName] = useState<string>('');
    const [treatmentDescription, setTreatmentDescription] = useState<string>('');
    const {data: createdTreatment, mutate: createTreatment, isSuccess: createTreatmentSuccess} = useCreateTreatment();

    const handleSearch = (value: string) => {
        setSearch(value);
        const filtered = treatments.filter((treatment: Treatment) =>
            treatment.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredTreatments(filtered);
    }

    const handleClickTreatment = (treatment: Treatment) => {
        dispatch(updateRoutePath({name: treatment.name, route: `/treatments/${treatment.id}`}))
        nav(`/treatments/${treatment.id}`);
    }

    useEffect(() => {
        if (treatments) {
            setFilteredTreatments(treatments);
        }
    }, [treatments]);

    const handleCloseModal = () => {
        setCreateTreatmentModal(false);
        setTreatmentName('');
        setTreatmentDescription('');
    }

    const handleCreateTreatment = () => {
        createTreatment({name: treatmentName, description: treatmentDescription, modules: [], questionnaires: []});
        handleCloseModal();
    }

    useEffect(() => {
        if (createTreatmentSuccess) {
            showToast('Tratamiento creado correctamente', 'success');
            setFilteredTreatments([...filteredTreatments, createdTreatment]);
        }
    }, [createTreatmentSuccess]);

    if (isLoading) {
        return <Loader/>;
    }

    return (
        <Box className='display-items-page'>
            <Box className={'display-searchbar-button'}>
                <SearchBar placeholder={"Buscar tratamiento"} value={search} onChange={(value) => handleSearch(value)} />
                <Button onClick={() => setCreateTreatmentModal(true)} variant={'green'} size={'medium'}>
                    Crear tratamiento
                </Button>
            </Box>
            <GenericModal
                open={createTreatmentModal}
                onClose={handleCloseModal}
                topButtonAction={handleCreateTreatment}
                title={'Crear tratamiento'}
                disabled={!treatmentName || !treatmentDescription}
            >
                <Box className={'create-treatment-modal'}>
                    <Box className='input-container'>
                        <h4>Nombre:</h4>
                        <Input
                            value={treatmentName}
                            onChange={(e) => setTreatmentName(e.target.value)}
                            placeholder={'Nombre del tratamiento'}
                        />
                    </Box>
                    <Box className='input-container'>
                        <h4>Descripción</h4>
                        <Input
                            value={treatmentDescription}
                            onChange={(e) => setTreatmentDescription(e.target.value)}
                            placeholder={'Descripción del tratamiento'}
                        />
                    </Box>
                </Box>
            </GenericModal>
            <Box className='items'>
                {filteredTreatments && filteredTreatments.length > 0 ? (
                    filteredTreatments.map((treatment: Treatment) => (
                        <Box key={treatment.id} className='item' onClick={() => handleClickTreatment(treatment)}>
                            <h4>{treatment.name}</h4>
                            <RightArrowIcon />
                        </Box>
                    ))
                ) : (
                    <h4>No hay tratamientos</h4>
                )}
            </Box>
        </Box>
    );
};

export default withToast(TreatmentsPage);