import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks.ts';
import { updateRoutePath } from '../../redux/routeSlice.ts';
import { useDeleteShopItem, useGetShopItems } from '../../service/api.ts';
import { ShopItem, ShopItemInput } from '../../types';
import styles from './styles.module.css';
import '../../common/globals.css';
import ShopItemContainer from '../../components/ShopItemContainer';
import withToast, { WithToastProps } from '../../hoc/withToast.tsx';
import GenericModal from '../../components/GenericModal';
import Loader from '../../components/Loader';

const ShopItemsPage = ({showToast}: WithToastProps) => {
    const nav = useNavigate();
    const dispatch = useAppDispatch();
    const { data, isLoading } = useGetShopItems();
    const [backgrounds, setBackgrounds] = React.useState<ShopItem[]>([]);
    const [avatars, setAvatars] = React.useState<ShopItem[]>([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
    const [itemId, setItemId] = React.useState<string>('');
    const { mutate: deleteItem, isSuccess: deleteItemSuccess } = useDeleteShopItem();

    useEffect(() => {
        if (data) {
            setBackgrounds(data.filter((item: ShopItemInput) => item.type === 'BACKGROUND'));
            setAvatars(data.filter((item: ShopItemInput) => item.type === 'AVATAR'));
        }
    }, [data]);

    useEffect(() => {
        if (deleteItemSuccess) {
            showToast('Elemento eliminado correctamente', 'success');
        }
    }, [deleteItemSuccess]);

    const handleAdd = () => {
        dispatch(updateRoutePath({ name: 'Agregar fondo o icono', route: '/upload/content' }));
        nav('/upload/content');
    }

    const handleOpenDeleteModal = (itemId: string) => {
        setIsDeleteModalOpen(true);
        setItemId(itemId);
    }

    const handleCloseModal = () => {
        setIsDeleteModalOpen(false);
        setItemId('');
    }

    const handleDelete = () => {
        deleteItem(itemId);
        handleCloseModal();
    }

    if (isLoading) {
        return <Loader/>;
    }

    return (
        <Box className={styles.shopItemsPage}>
            <p className={'h6 bold'}>Fondos:</p>
            <Box className={styles.itemsDisplay}>
                {backgrounds.map((shopItem, index) => (
                    <ShopItemContainer
                        type={shopItem.type}
                        url={shopItem.content_url}
                        key={index}
                        onDelete={() => handleOpenDeleteModal(shopItem.itemId)}
                    />
                ))}
            </Box>
            <p className={'h6 bold'}>Iconos:</p>
            <Box className={styles.itemsDisplay}>
                {avatars.map((shopItem, index) => (
                    <ShopItemContainer
                        type={shopItem.type}
                        url={shopItem.content_url}
                        key={index}
                        onDelete={() => handleOpenDeleteModal(shopItem.itemId)}
                    />
                ))}
            </Box>
            <Button onClick={handleAdd} variant={'green'}>Agregar</Button>
            <GenericModal
                open={isDeleteModalOpen}
                onClose={handleCloseModal}
                topButtonAction={handleDelete}
                title={'Eliminar elemento'}
                description={'¿Estás seguro que deseas eliminar este elemento?'}
            />
        </Box>
    );
};

export default withToast(ShopItemsPage);