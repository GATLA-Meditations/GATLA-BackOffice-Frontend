import { configureStore } from '@reduxjs/toolkit';
import moduleSlice from './moduleSlice';

const store = configureStore({
    reducer: {
        module: moduleSlice,
        // Add other slices here if needed
    },
});

export default store;