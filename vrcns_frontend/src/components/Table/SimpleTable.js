import React from "react";
import "./Table.scss"

const SimpleTable = ({data, tableMapper, handleClick}) => {

    const tableHead = <thead>
    <tr>
        {
            tableMapper.map(el => {
                return <th key={el.key}>{el.name}</th>
            })
        }
    </tr>
    </thead>

    const tableBody = data && <tbody>{
        data.map((item) => {
            return <tr key={item.id} onClick={() => handleClick(item.id)}>
                {
                    tableMapper.map((e) => {
                            return <td key={e.key + `_${item.name}`}>{item[e.key]}</td>
                    })
                }
            </tr>
        })
    }
    </tbody>

    return(
        <>
            <table className={"table"}>
                {tableHead}
                {tableBody}
            </table>
        </>
    );
}

export default SimpleTable;