import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css';

export interface WithToastProps {
    showToast: (message: string, type?: 'success' | 'error') => void;
}

const withToast = (WrappedComponent: React.ComponentType<any>) => {
    // eslint-disable-next-line react/display-name
    return (props: any) => {
        const showToast = (message: string, type: 'success' | 'error') => {
            switch (type) {
                case 'success':
                    toast.success(message);
                    break;
                case 'error':
                    toast.error(message);
                    break;
                default:
                    toast(message);
                    break;
            }
        };

        return (
            <>
                <WrappedComponent {...props} showToast={showToast} />
                <ToastContainer />
            </>
        );
    };
};

export default withToast;
