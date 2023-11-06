import React, {useEffect, useState} from "react";
import "./Table.scss"

const TestTable = ({data, tableMapper, handleClick}) => {

    const [prepareData, setData] = useState([]);
    const [sortedItem, setSortedItem] = useState("number");
    const [isClicked, setClick] = useState(false);

    const extData = data.map((el, index) => {
        const temp = {};

        for (const param in el) {
            temp[param] = el[param]
        }

        temp.mark = el.mark === 1 ? "Зачёт" : "Незачёт";

        temp.number = index + 1;

        return temp;
    })

    useEffect(() => {
        setData(extData);
    }, [data]);

    const handleSort = (name) => {

        if (sortedItem !== name || isClicked) {
            switch (name) {
                case "points":
                    extData.sort((a, b) => a[name] - b[name]);
                    break;
                default:
                    extData.sort((a, b) => {
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
            setClick(false);
        } else if (sortedItem === name) {
            switch (name) {
                case "points":
                    extData.sort((a, b) => b[name] - a[name]);
                    break;
                default:
                    extData.sort((a, b) => {
                        const nameA = a[name];
                        const nameB = b[name];
                        if (nameA < nameB) {
                            return 1;
                        }
                        if (nameA > nameB) {
                            return -1;
                        }

                        return 0;
                    })
            }
            setClick(true);
        }

        setSortedItem(name);
        setData(extData);
    }

    const tableHead = <thead>
    <tr>
        {
            tableMapper.map(el => {
                return <th onClick={() => {
                    handleSort(el.key)
                }}
                           key={`${el.key} + _test-table-header`}>{el.name}{el.key === sortedItem ? isClicked ? "↑" : "↓" : ""}</th>
            })
        }
    </tr>
    </thead>

    const tableBody = data && <tbody>{
        prepareData.map((item) => {
            return <tr key={item.id} onClick={() => handleClick(item.id)}>
                {
                    tableMapper.map((e) => {
                        if (e.key === "uDate") {
                            return <td key={e.key + `_${item.id}`}>
                                {new Date(item[e.key]).getDate() + "." + (new Date(item[e.key]).getMonth() + 1) + "." + new Date(item[e.key]).getFullYear()}
                            </td>
                        } else {
                            return <td key={e.key + `_${item.id}` + "_test-table-body"}>{item[e.key]}</td>
                        }
                    })
                }
            </tr>
        })
    }
    </tbody>

    return (
        <table className={"table"}>
            {tableHead}
            {tableBody}
        </table>
    );
}

export default TestTable;