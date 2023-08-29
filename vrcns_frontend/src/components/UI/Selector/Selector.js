import React, {useState} from "react";
import "./Selector.scss"

const Selector = ({options = [], autoSelectedId = 0}) => {

    const [selectedValue, setSelectedValue] = useState(options[autoSelectedId].name || "");
    const [selectedId, setSelectedId] = useState(options[autoSelectedId].id || "")
    const [isOpenSelector, setSelector] = useState(false);

    const handleOptionClick = (el) => {
        setSelectedValue(el.name);
        setSelectedId(el.id);
        setSelector(false)
    };

    return <div className="Selector">
        <div className="Selector__header" onClick={() => setSelector(!isOpenSelector)}>{selectedValue}</div>
        {
            isOpenSelector && <div className="Selector__body">
                {
                    options.map(el => {
                        if (el.name !== selectedValue)
                            return <div onClick={() => handleOptionClick(el)} className={"Selector__option"}
                                        key={el.id + "_option"}>{el.name}</div>
                    })
                }
            </div>
        }
    </div>
}

export default Selector;