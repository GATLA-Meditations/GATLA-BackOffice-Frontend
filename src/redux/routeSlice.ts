import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {StepperItem} from "../types";




export interface Route {
    path: StepperItem[];
}

const initialState: Route = {
    path:[],
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
        sliceRoutePath: (
            state, action
        ) => {
            state.path =  state.path.slice(0, action.payload + 1)
        },
        removeRoutePath:(
            state
        ) => {
            state.path.pop()
        }
    }
})

export const {updateRoutePath, sliceRoutePath, removeRoutePath} = routeSlice.actions

export default routeSlice.reducer