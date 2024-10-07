import { CircularProgress } from '@mui/material';
import './styles.css';

const Loader = () => {
    return (
        <div className='loader-container'>
            <CircularProgress size={'50px'} color={'secondary'} />
        </div>
    );
};

export default Loader;