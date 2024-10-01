import { createSlice } from '@reduxjs/toolkit';
import { StepperItem } from '../types';

export interface Route {
    path: StepperItem[];
    size: number;
}

const initialState: Route = {
    path: [],
    size: 0,
};

const routeSlice = createSlice({
    name: 'route',
    initialState,
    reducers: {
        updateRoutePath: (state, action) => {
            state.path.push({ ...action.payload, position: state.size });
            state.size += 1;
        },
        sliceRoutePath: (state, action) => {
            state.path = state.path.slice(0, action.payload + 1);
            state.size = state.path.length;
        },
        removeRoutePath: (state) => {
            state.path.pop();
            state.size -= 1;
        },
    },
});

export const { updateRoutePath, sliceRoutePath, removeRoutePath } =
    routeSlice.actions;

export default routeSlice.reducer;
