import React, {useState} from "react";
import "./Input.scss"
import Modal from "../../Modal/Modal";

const Input = ({className, type}) => {

    const [isModalOpen, setModal] = useState(false);
    const content = {

    };


    switch (type){
        case "text":
            return(
                <input className={className}/>
            );
        case "finder":
            return(
                <div>
                    <input className="finder"/>
                    <Modal type="popup" isModalOpen = {isModalOpen} content={content}/>
                </div>
            );
        default:
            return <div>error</div>
    }
}

export default Input;