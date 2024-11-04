import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks.ts';
import { updateRoutePath } from '../../redux/routeSlice.ts';
import { useGetShopItems } from '../../service/api.ts';
import { ShopItem, ShopItemInput } from '../../types';
import styles from './styles.module.css';
import '../../common/globals.css';
import ShopItemContainer from '../../components/ShopItemContainer';

const ShopItemsPage = () => {
    const nav = useNavigate();
    const dispatch = useAppDispatch();
    const { data } = useGetShopItems();
    const [backgrounds, setBackgrounds] = React.useState<ShopItem[]>([]);
    const [avatars, setAvatars] = React.useState<ShopItem[]>([]);

    useEffect(() => {
        if (data) {
            setBackgrounds(data.filter((item: ShopItemInput) => item.type === 'BACKGROUND'));
            setAvatars(data.filter((item: ShopItemInput) => item.type === 'AVATAR'));
        }
    }, [data]);

    const handleAdd = () => {
        dispatch(updateRoutePath({ name: 'Agregar fondo o icono', route: '/upload/content' }));
        nav('/upload/content');
    }

    return (
        <Box className={styles.shopItemsPage}>
            <p className={'h6 bold'}>Fondos:</p>
            <Box className={styles.itemsDisplay}>
                {backgrounds.map((shopItem, index) => (
                    <ShopItemContainer type={shopItem.type} url={shopItem.content_url} key={index} onDelete={() => {}} />
                ))}
            </Box>
            <p className={'h6 bold'}>Iconos:</p>
            <Box className={styles.itemsDisplay}>
                {avatars.map((shopItem, index) => (
                    <ShopItemContainer type={shopItem.type} url={shopItem.content_url} key={index} onDelete={() => {}} />
                ))}
            </Box>
            <Button onClick={handleAdd} variant={'green'}>Agregar</Button>
        </Box>
    );
};

export default ShopItemsPage;