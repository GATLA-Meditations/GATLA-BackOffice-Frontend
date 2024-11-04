import { Box } from '@mui/material';
import './styles.css';
import DeleteIcon from '@mui/icons-material/Delete';
import '../../common/globals.css'

interface ShopItemContainerProps {
    type: string;
    url: string;
    onDelete: (itemId: string) => void;
}

const ShopItemContainer = ({type, url}: ShopItemContainerProps) => {
    return (
        <Box className={'shop-item'}>
            <Box className={`element-container-${type}`}>
                <img
                    src={url}
                    alt=""
                    style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 'inherit',
                    }}
                />
            </Box>
            <DeleteIcon className='icon delete-icon' />
        </Box>
    );
};

export default ShopItemContainer;