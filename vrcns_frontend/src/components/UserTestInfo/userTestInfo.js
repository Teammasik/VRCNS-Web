import React from "react";
import Modal from "../Modal/Modal";
import {useSelector} from "react-redux";
import Loader from "../UI/Loader/Loader";

const UserTestInfo = ({isModalOpen, closeModal}) => {

    const name = useSelector(state => state.userResults.data.userName);
    const surname = useSelector(state => state.userResults.data.userSurname);
    const group = useSelector(state => state.userResults.data.userGroup);

    const isLoading = useSelector(state => state.userResults.isLoading);

    return (
        <Modal isModalOpen={isModalOpen} closeModal={closeModal} title={surname + " " + name + " " + group}>
            {
                isLoading ? <Loader type={"window_loader"}/> : <div
                    style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>
                    <div>
                        Результаты тестирования студента
                    </div>
                </div>
            }

        </Modal>
    );
}

export default UserTestInfo;