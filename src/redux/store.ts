import { configureStore } from '@reduxjs/toolkit';
import moduleSlice from './moduleSlice';
import routeSlice from "./routeSlice.ts";

const store = configureStore({
    reducer: {
        module: moduleSlice,
        route: routeSlice
        // Add other slices here if needed
    },
});

export default store;