import React, {useState} from "react";
import {useSelector} from "react-redux"
import "./TestResults.scss"
import Modal from "../Modal/Modal";


const TestResults = () => {

    const tableMapper = [
        {key: "item", name: "№"},
        {key: "name", name: "Имя"},
        {key: "surname", name: "Фамилия"},
        {key: "group", name: "Группа"},
        {key: "mark", name: "Оценка"},
    ]

    const [isOpenModal, setModal] = useState(false);
    const [title, setTitle] = useState("");

    const results = useSelector(state => state.testResults.testResultsTable);

    const handleClick = (name) => {
        setModal(true);
        setTitle(name)
    }

    const tableHead = <thead>
    <tr>
        {
            tableMapper.map(el => {
                return <th key={el.key}>{el.name}</th>
            })
        }
    </tr>
    </thead>

    const tableBody = results && <tbody>{
        results.map((row, index) => {
            return <tr key={row.id} onClick={() => handleClick(row.surname + " " + row.name)}>
                <td>{index + 1}</td>
                {
                    tableMapper.map((e, index) => {
                        if (index > 0)
                            return <td key={e.key + `_${row.name}`}>{row[e.key]}</td>
                    })
                }
            </tr>
        })
    }
    </tbody>

    return (<div className={"TestResults"}>
        <table className={"table"}>
            {tableHead}
            {tableBody}
        </table>

        {
            isOpenModal && <Modal title={title} children={"123333"} onClose={() => setModal(false)}/>
        }
    </div>);
}

export default TestResults;