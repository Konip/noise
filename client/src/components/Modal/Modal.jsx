import React, { useState } from 'react';
import Login from '../Form/Login';
import SignUp from '../Form/SignUp';
import './Modal.css';

export default function Modal({ active, setActive, type, registration, login, openModal }) {

    const [email, setEmail] = useState('gunpowderbit@gmail.com')
    const [password, setPassword] = useState('12345')

    function test(e) {
        e.preventDefault()
        login(email, password)
    }

    return (
        <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
            <div className="modal__content" onClick={e => e.stopPropagation()}>
                {type && type === "Sign up" ?
                    <SignUp setActive={setActive} openModal={openModal} />
                    :
                    <Login setActive={setActive} />
                }
            </div>
        </div>
    )
}
