import { configureStore } from '@reduxjs/toolkit';
import moduleSlice from './moduleSlice';
import routeSlice from './routeSlice.ts';
import userSlice from './userSlice.ts';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const persistConfig = {
    key: 'root',
    storage,
};

const persistedRouteReducer = persistReducer(persistConfig, routeSlice);

const store = configureStore({
    reducer: {
        module: moduleSlice,
        route: persistedRouteReducer,
        user: userSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type StoreType = typeof store;
const persistor = persistStore(store);

export { store, persistor };
