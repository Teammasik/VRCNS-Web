import React from "react";
import "./Modal.scss"

const Modal = ({title, children, onClose}) => {

    return (
        <div className="Modal">
            <div className="Modal__popup">
                <div className="Modal__popup__header">
                    {title}
                    <div style={{width:"20px", height:"20px", textAlign:"center"}} onClick={onClose}>-</div>
                </div>
                <div className="Modal__popup__body">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Modal;