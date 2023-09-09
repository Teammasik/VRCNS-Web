import {createSlice} from "@reduxjs/toolkit";

export const testResultsSlice = createSlice({
    name: "testResults",
    initialState: {
        testResultsTable: [
            {id: 1, name: "Олег", surname: "Щербаков", group: "БПОи", mark: '1'},
            {id: 2, name: "Роберт", surname: "Селимов", group: "К3-51Б", mark: '1'},
            {id: 3, name: "Тимур", surname: "Терегулов", group: "К3-52Б", mark: '1'},
            {id: 4, name: "Александр", surname: "Турбин", group: "К3-51Б", mark: '0'},
        ],
        testOption: [
            {id: "test-1", name: "Тест-1"},
            {id: "test-2", name: "Тест-2"},
            {id: "test-3", name: "Тест-3"},
        ],
        selectedUserInfo: {
            name: "",
            surname: "",
            data: [
                {name: "pass", value: 12},
                {name: "failed", value: 2}
            ]
        },
        testScoreData: [{
            id: "test-1",
            name: "Тест 1",
            data: [
                {name: "0-5", value: 1},
                {name: "6-10", value: 2},
                {name: "11-15", value: 8},
                {name: "16-20", value: 6},
                {name: "21-25", value: 2},
            ]
        }, {
            id: "test-2",
            name: "Тест 2",
            data: [
                {name: "0-5", value: 0},
                {name: "6-10", value: 4},
                {name: "11-15", value: 8},
                {name: "16-20", value: 6},
                {name: "21-25", value: 1},
            ]
        }, {
            id: "test-3",
            name: "Тест 3",
            data: [
                {name: "0-5", value: 2},
                {name: "6-10", value: 4},
                {name: "11-15", value: 8},
                {name: "16-20", value: 4},
                {name: "21-25", value: 1},
            ]
        }],
        selectedTest: "",
        selectedUserId: ""
    },
    reducers: {
        setTestResults: (state, action) => {
            state.testResults = action.payload;
        },
        setSelectedTest: (state, action) => {
            state.selectedTest = action.payload;
        }
    }
})

export const {actions: testResultsActions} = testResultsSlice;
export const {reducer: testResultsReducer} = testResultsSlice;