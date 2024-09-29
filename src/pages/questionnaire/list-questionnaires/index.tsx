import { useGetAllQuestionnaires } from '../../../service/api.ts';
import { Questionnaire } from '../../../types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../redux/hooks.ts';
import { updateRoutePath } from '../../../redux/routeSlice.ts';
import SearchBar from '../../../components/SearchBar';
import { Box } from '@mui/material';
import { RightArrowIcon } from '../../../assets/Icons/RightArrowIcon';

const QuestionnairesPage = () => {
    const {data: questionnaires, isLoading} = useGetAllQuestionnaires();
    const [filteredQuestionnaires, setFilteredQuestionnaires] = useState<Questionnaire[]>(questionnaires);
    const [search, setSearch] = useState<string>('');
    const nav = useNavigate();
    const dispatch = useAppDispatch();

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

    useEffect(() => {
        if (questionnaires) {
            setFilteredQuestionnaires(questionnaires);
        }
    }, [questionnaires]);

    if (isLoading) {
        return <h1>Loading</h1>
    }

    return (
        <Box className='display-items-page'>
            <SearchBar placeholder={"Buscar cuestionario"} value={search} onChange={(value) => handleSearch(value)} />
            <Box className='items'>
                {filteredQuestionnaires && filteredQuestionnaires.length > 0 ? (
                    filteredQuestionnaires.map((questionnaire: Questionnaire) => (
                        <Box key={questionnaire.id} className='item' onClick={() => handleClickQuestionnaire(questionnaire)}>
                            <h4>{questionnaire.name}</h4>
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

export default QuestionnairesPage;