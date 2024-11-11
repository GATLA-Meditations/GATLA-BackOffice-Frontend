import { useCreateQuestionnaire, useGetAllQuestionnaires } from '../../../service/api.ts';
import { Questionnaire } from '../../../types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../redux/hooks.ts';
import { updateRoutePath } from '../../../redux/routeSlice.ts';
import SearchBar from '../../../components/SearchBar';
import { Box, Input } from '@mui/material';
import { RightArrowIcon } from '../../../assets/Icons/RightArrowIcon';
import Loader from '../../../components/Loader';
import GenericModal from '../../../components/GenericModal';
import Button from '../../../components/Button';
import './styles.css';
import withToast, { WithToastProps } from '../../../hoc/withToast.tsx';

const QuestionnairesPage = ({ showToast }: WithToastProps) => {
    const {data: questionnaires, isLoading} = useGetAllQuestionnaires();
    const [filteredQuestionnaires, setFilteredQuestionnaires] = useState<Questionnaire[]>(questionnaires);
    const [search, setSearch] = useState<string>('');
    const nav = useNavigate();
    const dispatch = useAppDispatch();
    const { mutate: createQuestionnaire, data: newQuestionnaire, isSuccess: createQuestionnaireSuccess } = useCreateQuestionnaire();
    const [isCreateQuestionnaireOpen, setIsCreateQuestionnaireOpen] = useState<boolean>(false);
    const [questionnaireName, setQuestionnaireName] = useState<string>('');

    const handleSearch = (value: string) => {
        setSearch(value);
        const filtered = questionnaires.filter((questionnaire: Questionnaire) =>
            questionnaire.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredQuestionnaires(filtered);
    }

    const handleClickQuestionnaire = (questionnaire: Questionnaire) => {
        dispatch(updateRoutePath({name: questionnaire.name, route: `/questionnaire/${questionnaire.id}`}));
        nav(`/questionnaire/${questionnaire.id}`);
    }

    const handleCreateQuestionnaire = () => {
        createQuestionnaire({name: questionnaireName, questions: [], treatmentId: []});
        setIsCreateQuestionnaireOpen(false);
    }

    const handleCloseCreateQuestionnaire = () => {
        setIsCreateQuestionnaireOpen(false);
        setQuestionnaireName('');
    }

    useEffect(() => {
        if (questionnaires) {
            setFilteredQuestionnaires(questionnaires);
        }
    }, [questionnaires]);

    useEffect(() => {
        if (createQuestionnaireSuccess) {
            setFilteredQuestionnaires([...filteredQuestionnaires, newQuestionnaire]);
            showToast('Cuestionario creado exitosamente', 'success');
        }
    }, [createQuestionnaireSuccess]);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <Box className='display-items-page'>
            <GenericModal
                open={isCreateQuestionnaireOpen}
                onClose={handleCloseCreateQuestionnaire}
                topButtonAction={handleCreateQuestionnaire}
                title={'Crear cuestionario'}
                topButtonText={'Crear'}
                disabled={!questionnaireName}
            >
                <Box className='input-container'>
                    <Input
                        value={questionnaireName}
                        onChange={(e) => setQuestionnaireName(e.target.value)}
                        placeholder={'Nombre del cuestionario'}
                        disableUnderline
                    />
                </Box>
            </GenericModal>
            <Box className='display-searchbar-button'>
                <SearchBar placeholder={"Buscar cuestionario"} value={search} onChange={(value) => handleSearch(value)} />
                <Button onClick={() => setIsCreateQuestionnaireOpen(true)} variant={'green'}>Crear</Button>
            </Box>
            <Box className='items'>
                {filteredQuestionnaires && filteredQuestionnaires.length > 0 ? (
                    filteredQuestionnaires.map((questionnaire: Questionnaire) => (
                        <Box key={questionnaire.id} className='item' onClick={() => handleClickQuestionnaire(questionnaire)}>
                            <p className={'body1'}>{questionnaire.name}</p>
                            <RightArrowIcon />
                        </Box>
                    ))
                ) : (
                    <h4>No hay cuestionarios</h4>
                )}
            </Box>
        </Box>
    );
};

export default withToast(QuestionnairesPage);