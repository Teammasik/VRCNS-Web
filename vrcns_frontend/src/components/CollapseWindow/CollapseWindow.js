import React, {useState} from "react";
import "./CollapseWindow.scss"

const CollapseWindow = ({title, children, id}) => {

    const [toggle, setToggle] = useState(true);

    return <div className="CollapseWindow" key={id + "_CollapseWindow"}>
        {
            toggle ? <>
                <div className="CollapseWindow__header-opened">
                    {title}
                    <div onClick={() => setToggle(false)}>Скрыть</div>
                </div>
                <div className="CollapseWindow__body-opened">
                    {children}
                </div>
            </> : <div className="CollapseWindow__header-closed" onClick={() => setToggle(true)}>
                {title}
            </div>
        }
    </div>
}

export default CollapseWindow;