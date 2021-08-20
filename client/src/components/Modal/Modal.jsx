import { observer } from "mobx-react";
import React from 'react';
import close from '../../assets/img/close.svg';
import Login from '../Form/Login';
import SignUp from '../Form/SignUp';
import DeleteInformation from "../Information/DeleteInformation";
import ResetInformation from "../Information/ResetInformation";
import SignupInformation from '../Information/SignupInformation';
import Reset from "../Reset/Reset";
import Delete from './../Delete/Delete';
import './Modal.css';



function Modal({ active, setActive, type, registration, login, openModal, isAuth }) {
    const [email, setEmail] = React.useState()
    console.log('type----', type);
    return (
        <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
            {console.log(type)}
            <div className="modal__content" >
                {/* <div className="modal__content" onClick={e => e.stopPropagation()}> */}
                <img onClick={() => setActive(false)} className="close" src={close} alt="" />
                {type && type === "Sign up" ?
                    <SignUp openModal={openModal} setEmail={setEmail} />
                    : type === "Log In" ?
                        <Login setActive={setActive} openModal={openModal} login={login} isAuth={isAuth} />
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