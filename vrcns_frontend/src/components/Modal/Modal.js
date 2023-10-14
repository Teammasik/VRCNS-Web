import React, {useState} from "react";
import "./Modal.scss"
import {useSelector} from "react-redux";

const Modal = ({title, children, isModalOpen, closeModal}) => {

    return (
        <div>
            {isModalOpen && <div className="Modal">
                <div className="Modal__popup">
                    <div className="Modal__popup__header">
                        {title}
                        <div style={{justifyContent:"center", display:"flex", alignItems:"center", cursor:"pointer", padding:"3px"}} onClick={() => {closeModal()}}>
                            <div className="Modal__close"/>
                        </div>

                    </div>
                    <div className="Modal__popup__body">
                        {children}
                    </div>
                </div>
            </div>
            }
        </div>
    );
}

export default Modal;