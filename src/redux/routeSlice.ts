import {createSlice} from "@reduxjs/toolkit";

interface Route {
    path: string[];
}

const initialState: Route = {
    path:['Tratamiento', 'Cristiano', 'Semana 1', 'Actividad 1']
}

const routeSlice = createSlice({
    name:'route',
    initialState,
    reducers: {
        updateRoutePath: (
            state, action
        ) => {
            state.path.push(action.payload)
        },
        removeRoutePath: (
            state
        ) => {
            state.path.pop()
        }
    }
})

export const {updateRoutePath, removeRoutePath} = routeSlice.actions

export default routeSlice.reducer