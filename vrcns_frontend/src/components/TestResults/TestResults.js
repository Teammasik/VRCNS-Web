import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux"
import "./TestResults.scss"
import {fetchResultTable} from "../api/TestResultsSlice";
import TestSettingsBar from "../TestSettingsBar/TestSettingsBar";
import Loader from "../UI/Loader/Loader";
import {fetchUserData} from "../api/UserResultsSlice";
import UserTestInfo from "../UserTestInfo/userTestInfo";
import {userTestMapper} from "../../constants";
import SimpleTable from "../Table/SimpleTable";
import TestTable from "../Table/TestTable";

const TestResults = () => {

    const dispatch = useDispatch();

    const selectedTestId = useSelector(state => state.testResults.selectedTest)
    const testData = useSelector(state => state.testResults.data);
    const isLoading = useSelector(state => state.testResults.isLoading);

    const [isModalOpen, setModal] = useState(false);

    const handleClick = (id) => {
        setModal(!isModalOpen);
        dispatch(fetchUserData({id: id}))
    }

    useEffect(() => {
        dispatch(fetchResultTable({id: selectedTestId}));
    }, [selectedTestId]);

    return (
        <div className={"TestResults"}>
            {isLoading && <Loader/>}
            <TestSettingsBar/>
            <TestTable data={testData} tableMapper={userTestMapper} handleClick={handleClick}/>
            <UserTestInfo isModalOpen={isModalOpen} closeModal={() => setModal(false)}/>
        </div>
    );
}

export default TestResults;