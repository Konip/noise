import React from 'react'
import './Modal.css'
import { useState } from 'react';

export default function Modal({ active, setActive, type, registration, login }) {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    return (
        <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
            <div className="modal__content" onClick={e => e.stopPropagation()}>
                {type && type === "Sign up" ?
                    <div className="sign">
                        <span id="title">Sign Up, it's Free ;)</span>
                        <span>if you already have a Noise profile log in</span>
                        <form method="post">


                            <div className="input-wrapper">
                                <div className="input-container">
                                    <input className="modal__input" type="text" placeholder="Email address" onChange={e => setEmail(e.target.value)} />
                                    <div className="input-border"></div>
                                </div>
                            </div>

                            <div className="input-wrapper">
                                <div className="input-container">
                                    <input className="modal__input" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                                    <div className="input-border"></div>
                                </div>
                            </div>




                            {/* <button className="modal__btn" onClick={console.log(email, password)}>Sign Up, it's Free</button> */}
                            <button className="modal__btn" onClick={() => registration(email, password)}>Sign Up, it's Free</button>
                            <div>{email}</div>
                            <div>{password}</div>
                        </form>
                    </div>
                    :
                    <div className="log">Log In</div>
                }
            </div>
        </div>
    )
}
