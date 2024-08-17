import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface Route {
    path: string;
}

const initialState: Route = {
    path:''
}

const routeSlice = createSlice({
    name:'route',
    initialState,
    reducers: {
        updateRoutePath: (
            state, action: PayloadAction<{ path: string }>
        ) => {
            state.path.concat(action.payload.path)
        },
        removeRoutePath: (
            state, action: PayloadAction<{ path: string }>
        ) => {
            const lengthWithoutPath = state.path.length - action.payload.path.length
            state.path.slice(0, lengthWithoutPath)
        }
    }
})

export const {updateRoutePath, removeRoutePath} = routeSlice.actions

export default routeSlice.reducer