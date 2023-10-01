import {combineReducers} from "redux";
import {testResultsReducer} from "../components/api/TestResultsSlice";
import {userResultsReducer} from "../components/api/UserResultsSlice";
import {chartResultsReducer} from "../components/api/ChartResultSlice";

const rootReducer = combineReducers({
    testResults: testResultsReducer,
    userResults: userResultsReducer,
    chartResults: chartResultsReducer
})

export default rootReducer;