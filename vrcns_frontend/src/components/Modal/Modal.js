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
                        <div style={{width: "20px", height: "20px", textAlign: "center"}} onClick={() => {
                            closeModal()
                        }}>-
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