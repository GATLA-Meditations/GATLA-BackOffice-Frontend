import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Module {
    type: string;
    id: string;
    name: string;
    description: string;
    activities: Activity[];
    progress: number | null;
}

interface Activity {
    id: string;
    name: string;
    completed: boolean;
}

const initialState: Module = {
    type: '',
    id: '',
    name: '',
    description: '',
    activities: [
        {
            id: '',
            name: '',
            completed: false,
        },
    ],
    progress: null,
};

const moduleSlice = createSlice({
    name: 'module',
    initialState,
    reducers: {
        updateActivityCompletion: (
            state,
            action: PayloadAction<{ activityId: string; completed: boolean }>
        ) => {
            const { activityId, completed } = action.payload;
            const activity = state.activities.find((a) => a.id === activityId);
            if (activity) {
                activity.completed = completed;
            }
        },
        updateProgress: (state, action: PayloadAction<number | null>) => {
            state.progress = action.payload;
        },
    },
});

export const { updateActivityCompletion, updateProgress } = moduleSlice.actions;

export default moduleSlice.reducer;
