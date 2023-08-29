import React, {useState} from "react";
import "./Input.scss"

const Input = ({className, type}) => {

    switch (type){
        case "text":
            return(
                <input className={className}/>
            );
        default:
            return <div>error</div>
    }
}

export default Input;