import React from "react";
import Modal from "../Modal/Modal";

const UserTestInfo = ({}) => {

    return (
        <Modal>
            <div
                style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>
                <div>
                    Результаты тестирования студента
                </div>
            </div>
        </Modal>
    );
}

export default UserTestInfo;