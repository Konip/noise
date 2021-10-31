import { observer } from "mobx-react";
import React from 'react';
import close from '../../assets/img/close.svg';
import Delete from '../Delete/Delete';
import Login from '../Form/Login';
import SignUp from '../Form/SignUp';
import DeleteInformation from "../Information/DeleteInformation";
import ResetInformation from "../Information/ResetInformation";
import SignupInformation from '../Information/SignupInformation';
import Reset from "../Reset/Reset";
import './Modal.css';
    
interface ModalLogProps {
    openModal(activeModal: boolean, typeModal: string): void
    active: boolean
    setActive(activeModal: boolean): void
    type: string
    email: string
}

const Modal: React.FC<ModalLogProps> = ({ active, setActive, type, openModal }) => {

    const [email, setEmail] = React.useState('');

    return (
        <div className={active ? "modal active" : "modal"} >
            <div className="modal-close" onClick={() => setActive(false)}></div>
            <div className="modal__content" >
                <img onClick={() => setActive(false)} className="close" src={close} alt="" />
                {type && type === "Sign up" ?
                    <SignUp openModal={openModal} setEmail={setEmail} />
                    : type === "Log In" ?
                        <Login setActive={setActive} openModal={openModal} />
                        : type === "SignupInformation" ?
                            <SignupInformation setActive={setActive} email={email} />
                            : type === "Reset" ?
                                <Reset openModal={openModal} setEmail={setEmail} />
                                : type === "ResetInformation" ?
                                    <ResetInformation setActive={setActive} email={email} />
                                    : type === "Delete" ?
                                        <Delete setActive={setActive} openModal={openModal} />
                                        : type === "DeleteInformation" ?
                                            <DeleteInformation setActive={setActive} openModal={openModal} />
                                            : <div></div>
                }
            </div>
        </div>
    )
}

export default observer(Modal)