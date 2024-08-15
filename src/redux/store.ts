import { configureStore } from '@reduxjs/toolkit';
import moduleSlice from './moduleSlice';

const store = configureStore({
    reducer: {
        module: moduleSlice,
        // Add other slices here if needed
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type StoreType = typeof store
export default store;