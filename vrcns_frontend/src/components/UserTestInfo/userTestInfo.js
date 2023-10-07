import React from "react";
import Modal from "../Modal/Modal";
import {useSelector} from "react-redux";
import Loader from "../UI/Loader/Loader";
import SimpleTable from "../Table/SimpleTable";
import {userMistakesMapper} from "../../constants";
import "./UserTestInfo.scss"

const UserTestInfo = ({isModalOpen, closeModal}) => {

    const name = useSelector(state => state.userResults.data.userName);
    const surname = useSelector(state => state.userResults.data.userSurname);
    const group = useSelector(state => state.userResults.data.userGroup);
    const mistakes = useSelector(state => state.userResults.data.mistakes);

    const isLoading = useSelector(state => state.userResults.isLoading);

    return (
        <Modal isModalOpen={isModalOpen} closeModal={closeModal} title={surname + " " + name + " " + group}>
            {
                isLoading ? <Loader type={"window_loader"}/> : <div className="UserTestInfo">
                    <div>
                        Совершённые ошибки
                        <SimpleTable data={mistakes} tableMapper={userMistakesMapper} handleClick={() => {
                        }}/>
                    </div>
                </div>
            }
        </Modal>
    );
}

export default UserTestInfo;