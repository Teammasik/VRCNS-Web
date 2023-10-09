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

    const prepareData = mistakes && mistakes.map((el, index) => {
        const temp = {};

        for (const param in el) {
            temp[param] = el[param]
        }

        temp.number = index + 1;

        return temp;
    })

    return (
        <Modal isModalOpen={isModalOpen} closeModal={closeModal} title={surname + " " + name + " " + group}>
            {
                isLoading ? <Loader type={"window_loader"}/> : <div className="UserTestInfo">
                    <div>
                        {
                            prepareData && prepareData.length > 0 ? <> Совершённые ошибки
                                <SimpleTable data={prepareData} tableMapper={userMistakesMapper} handleClick={() => {
                                }}/>
                            </> : <>Ошибок нет</>
                        }
                    </div>
                </div>
            }
        </Modal>
    );
}

export default UserTestInfo;