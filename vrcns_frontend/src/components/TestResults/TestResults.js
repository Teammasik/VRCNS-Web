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

    const prepareData = testData.map((el, index) => {
        const temp = {};

        for (const param in el) {
            temp[param] = el[param]
        }

        temp.number = index + 1;
        temp.uDate = new Date(temp.uDate).getDay() + "-" + new Date(temp.uDate).getMonth() + "-" + new Date(temp.uDate).getFullYear();

        return temp;
    })

    const handleClick = (id) => {
        setModal(!isModalOpen);
        dispatch(fetchUserData({id: id}))
    }

    useEffect(() => {
        dispatch(fetchResultTable({id: selectedTestId}));
    }, [selectedTestId]);

    const handleSortString = (name) => {

        prepareData.sort((a, b) => {
            const nameA = a[name];
            const nameB = b[name];
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }

            return 0;
        })
    }

    const handleSortNumbers = (name) => {
        prepareData.sort((a, b) => a[name] - b[name]);
    }

    return (
        <div className={"TestResults"}>
            {isLoading && <Loader/>}
            <TestSettingsBar/>
            <TestTable data={prepareData} tableMapper={userTestMapper} handleClick={handleClick}
                       onHeaderClick={handleSortString}/>
            <UserTestInfo isModalOpen={isModalOpen} closeModal={() => setModal(false)}/>
        </div>
    );
}

export default TestResults;