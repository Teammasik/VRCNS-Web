import {createSlice} from "@reduxjs/toolkit";

export const testResultsSlice = createSlice({
    name: "testResults",
    initialState: {
        testResultsTable: [
            {id: 1, name: "Олег", surname: "Щербаков", group: "БПОи", mark: '1'},
            {id: 2, name: "Роберт", surname: "Селимов", group: "К3-51Б", mark: '1'},
        ]
    },
    reducers: {
        setTestResults: (state, action) => {
            state.testResults = action.payload;
        }
    }
})

export const {actions: testResultsActions} = testResultsSlice;
export const {reducer: testResultsReducer} = testResultsSlice;