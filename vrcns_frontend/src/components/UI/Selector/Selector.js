import React, {useEffect, useState} from "react";
import "./Selector.scss"

const Selector = ({options = [], saveId, handleSelect, name}) => {

    const [selectedValue, setSelectedValue] = useState("");
    const [isOpenSelector, setSelector] = useState(false);

    useEffect(() => {
        setSelectedValue(options[0]?.[name]);
    }, [options[0]?.[name]]);

    const handleOptionClick = (e) => {
        handleSelect(e.id);
        setSelectedValue(e[name]);
        setSelector(false)
    };

    return <div className="Selector">
        <div className="Selector__header" onClick={() => setSelector(!isOpenSelector)}>{selectedValue}</div>
        {
            isOpenSelector && <div className="Selector__body">
                {
                    options.map(e => {
                        if (saveId !== e.id)
                            return <div onClick={() => handleOptionClick(e)} className={"Selector__option"}
                                        key={e.id + "_option"}>{e[name]}</div>
                    })
                }
            </div>
        }
    </div>
}

export default Selector;