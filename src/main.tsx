import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { persistor, store } from './redux/store.ts';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { Router } from './components/Router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { PersistGate } from 'redux-persist/integration/react';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <RouterProvider router={Router} />
                </PersistGate>
            </Provider>
        </QueryClientProvider>
    </StrictMode>
);
