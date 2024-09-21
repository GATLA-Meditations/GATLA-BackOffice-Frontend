import {Box} from "@mui/material";
import {useGetAllTreatments} from "../../service/api.ts";
import {useEffect, useState} from "react";
import {Treatment} from "../../types";
import SearchBar from "../../components/SearchBar";
import '../../common/globals.css';
import {RightArrowIcon} from "../../assets/Icons/RightArrowIcon";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../redux/hooks.ts";
import {updateRoutePath} from "../../redux/routeSlice.ts";
// import {useNavigate} from "react-router-dom";

const TreatmentsPage = () => {
    const {data: treatments} = useGetAllTreatments();
    const [filteredTreatments, setFilteredTreatments] = useState<Treatment[]>(treatments);
    const [search, setSearch] = useState<string>('');
    const nav = useNavigate();
    const dispatch = useAppDispatch();

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

    return (
        <Box className='display-items-page'>
            <SearchBar placeholder={"Buscar tratamiento"} value={search} onChange={(value) => handleSearch(value)} />
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

export default TreatmentsPage;