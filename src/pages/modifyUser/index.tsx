import { useEffect, useState } from 'react';
import { Box, FormControl, MenuItem, Select } from '@mui/material';
import styles from '../activity/styles.module.css';
import EditableInput from '../../components/EditableInput';
import Button from '../../components/Button';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import { deleteUser, useGetAllTreatments, useUpdateUser } from '../../service/api';
import { Treatment, User } from '../../types';
import DeleteUserModal from '../deleteUser';

type attributeType = keyof User;

const ModifyUser = () => {
    const nav = useNavigate();
    const { user } = useAppSelector((state) => state.user);
    const treatments = useGetAllTreatments();
    const [selectedUser, setSelectedUser] = useState(user);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const updateUser = useUpdateUser();

    const handleChange = (attribute: attributeType, newValue: string, id?: string) => {
        if (attribute === 'treatments' && id) {
            const updatedTreatments = selectedUser.treatments.map((treatment, index) => {
                if (index === 0) {
                    return { ...treatment, name: newValue, id: id };
                }
                return treatment;
            });
            setSelectedUser({ ...selectedUser, treatments: updatedTreatments });
        } else {
            setSelectedUser({ ...selectedUser, [attribute]: newValue });
        }
    };

    const handleSubmit = () => {
        // First would be the post to the backend then the dispatch
        const data = {
            patient_code: selectedUser.patient_code,
            password: selectedUser.password,
            treatment: {id: selectedUser.treatments[0].id},
        };
        try {
            updateUser.mutate({ id: selectedUser.id, data });
            nav('/users');
        } catch (error) {
            console.log(error);
        }
    };

    const handleOpenDeleteModal = () => {
        setIsDeleteModalOpen(!isDeleteModalOpen);
    };

    const handleDeleteUser = async () => {
        try {
            await deleteUser(selectedUser.patient_code.trim());
        } catch (error) {
            console.error(error);
        }
        setIsDeleteModalOpen(false);
    };

    return (
        <Box className={'home-display'}>
            <Box className={styles.activityContainer}>
                <EditableInput
                    title={'Código de usuario'}
                    text={selectedUser.patient_code}
                    placeholder={'Escribe el código'}
                    type={'text'}
                    name={'UserCode'}
                    handleChange={(e) => handleChange('patient_code', e.target.value)}
                />
                <EditableInput
                    title={'Contraseña de usuario'}
                    text={selectedUser.password}
                    placeholder={'Escribe la contraseña'}
                    type={'text'}
                    name={'UserPassword'}
                    handleChange={(e) => handleChange('password', e.target.value)}
                />

                <h3>Tratamiento asignado</h3>
                <FormControl>
                    <Select
                        value={selectedUser.treatments[0].name}
                        onChange={(e) => {
                            const selectedTreatment = treatments.data?.find(treatment => treatment.name === e.target.value);
                            handleChange('treatments', e.target.value, selectedTreatment?.id);
                        }}
                        variant="filled">
                        {treatments.data?.map((treatment: Treatment) => (
                            <MenuItem key={treatment.id} value={treatment.name}>
                                {treatment.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button onClick={handleSubmit} variant={'primary'} size={'medium'}>
                    Guardar
                </Button>
                <Button onClick={() => handleOpenDeleteModal()} variant={'red'} size={'medium'}>
                    Eliminar
                </Button>
                {isDeleteModalOpen && (
                    <DeleteUserModal open={isDeleteModalOpen} deleteUserFunction={() => handleDeleteUser()}
                                     closeModal={() => handleOpenDeleteModal()} userCode={selectedUser.patient_code} />
                )}
            </Box>
        </Box>
    );
};

export default ModifyUser;
