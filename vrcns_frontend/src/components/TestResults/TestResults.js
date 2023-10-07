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

const TestResults = () => {

    const dispatch = useDispatch();

    const selectedTestId = useSelector(state => state.testResults.selectedTest)
    const results = useSelector(state => state.testResults.data);
    const isLoading = useSelector(state => state.testResults.isLoading);

    // const [prepareResult, setPrepareResult] = useState([]);
    const [isModalOpen, setModal] = useState(false);

    const handleClick = (id) => {
        setModal(!isModalOpen);
        dispatch(fetchUserData({id: id}))
    }

    useEffect(() => {
        dispatch(fetchResultTable({id: selectedTestId}));
    }, [selectedTestId]);

    // const handleSortString = () => {
    //
    //     let data = [...results];
    //
    //     data.sort((a, b) => {
    //         const nameA = a.userSurname.toUpperCase(); // ignore upper and lowercase
    //         const nameB = b.userSurname.toUpperCase(); // ignore upper and lowercase
    //         if (nameA < nameB) {
    //             return -1;
    //         }
    //         if (nameA > nameB) {
    //             return 1;
    //         }
    //
    //         // names must be equal
    //         return 0;
    //     })
    //
    //     setPrepareResult(data)
    // }
    //
    // const handleSortNumbers = () => {
    //
    //     let data = [...prepareResult];
    //
    //     data.sort((a, b) => a.value - b.value);
    //
    //     console.log(data)
    //
    //     setPrepareResult(data)
    // }

    return (
        <div className={"TestResults"}>
            {isLoading && <Loader/>}
            <TestSettingsBar/>
            <SimpleTable data={results} tableMapper={userTestMapper} handleClick={handleClick}/>
            <UserTestInfo isModalOpen={isModalOpen} closeModal={() => setModal(false)}/>
        </div>
    );
}

export default TestResults;