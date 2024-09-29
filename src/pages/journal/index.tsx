import {useGetAllTreatments} from "../../service/api.ts";
import {Box, FormControl, MenuItem, Select} from "@mui/material";
import {useEffect, useState} from "react";

import UsersList from "../../components/UsersList";


const JournalReview = () => {
    const {data: treatments, isLoading} = useGetAllTreatments();
    const [selectedTreatmentId, setSelectedTreatmentId] = useState("");


    const handleTreatmentIdChange = (id: string) => {
        setSelectedTreatmentId(id);
    }

    useEffect(() => {
        if (treatments) {
            setSelectedTreatmentId(treatments[0].id);
        }

    }, [isLoading]);

    if (isLoading) {
        return <h1>Loading</h1>
    }

    return (
        <Box>
            <FormControl>
                <Select
                    value={selectedTreatmentId || treatments[0].id}
                    onChange={(e) => handleTreatmentIdChange(e.target.value)}
                >
                    {treatments.map((treatment) => (
                        <MenuItem key={treatment.id} value={treatment.id}>
                            {treatment.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Box className={"display-items-page"}>
                <UsersList users={filteredUsers} handleClickUser={handleClickUser}/>
            </Box>
        </Box>

    )
}

export default JournalReview