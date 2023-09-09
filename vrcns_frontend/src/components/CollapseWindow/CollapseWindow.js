import React, {useState} from "react";
import "./CollapseWindow.scss"

const CollapseWindow = ({title, children, id}) => {

    const [toggle, setToggle] = useState(false);

    return <div className="CollapseWindow" key={id + "_CollapseWindow"}>
        <div className={toggle ? "CollapseWindow__header-opened" : "CollapseWindow__header-closed"}>
            {title}
            <div onClick={() => setToggle(!toggle)} style={{padding: "5px"}}>
                {toggle ? "-" : "+"}
            </div>
        </div>
        <div className={toggle ? "CollapseWindow__body-opened" : "CollapseWindow__body-closed"}>
            {children}
        </div>
    </div>
}

export default CollapseWindow;