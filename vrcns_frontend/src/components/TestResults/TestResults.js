import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux"
import "./TestResults.scss"
import {fetchResultTable} from "../api/TestResultsSlice";
import TestSettingsBar from "../TestSettingsBar/TestSettingsBar";
import Loader from "../UI/Loader/Loader";
import {fetchUserData} from "../api/UserResultsSlice";
import UserTestInfo from "../UserTestInfo/userTestInfo";
import {tableMapper} from "../../constants";


const TestResults = () => {

    const dispatch = useDispatch();

    const selectedTestId = useSelector(state => state.testResults.selectedTest)
    const results = useSelector(state => state.testResults.data);
    const isLoading = useSelector(state => state.testResults.isLoading);

    // const [prepareResult, setPrepareResult] = useState([]);
    const [isModalOpen, setModal] = useState(false);

    const handleClick = (id) => {
        setModal(!isModalOpen);
        dispatch(fetchUserData({id: id}));
    }

    // useEffect(() => {
    //     setPrepareResult(results)
    // }, [results]);

    useEffect(() => {
        dispatch(fetchResultTable({id: selectedTestId}));
    }, [selectedTestId]);

    const tableHead = <thead>
    <tr>
        {
            tableMapper.map(el => {
                return <th key={el.key}>{el.name}</th>
            })
        }
    </tr>
    </thead>

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

    const tableBody = results && <tbody>{
        results.map((user, index) => {
            return <tr key={user.id} onClick={() => handleClick(user.id)}>
                <td>{index + 1}</td>
                {
                    tableMapper.map((e, index) => {
                        if (index > 0)
                            return <td key={e.key + `_${user.name}`}>{user[e.key]}</td>
                    })
                }
            </tr>
        })
    }
    </tbody>


    return (
        <div className={"TestResults"}>
            {isLoading && <Loader/>}
            <TestSettingsBar/>
            <table className={"table"}>
                {tableHead}
                {tableBody}
            </table>
            <UserTestInfo isModalOpen={isModalOpen} closeModal={() =>setModal(false)}/>
        </div>
    );
}

export default TestResults;