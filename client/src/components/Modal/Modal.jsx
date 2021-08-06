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
    // return (
    //     <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
    //         <div className="modal__content" onClick={e => e.stopPropagation()}>
    //             {type && type === "Sign up" ?
    //                 <div className="sign">
    //                     <div className="title">
    //                         <span id="title">Sign Up, it's Free :)</span>
    //                         <span>If you already have a Noise profile,
    //                             <span onClick={() => openModal(true, 'Log In')} id="title"> log in.</span>
    //                         </span>
    //                     </div>
    //                     <form onSubmit={test} >
    //                         <div className="input-wrapper">
    //                             <div className="input-container">
    //                                 <input className="modal__input" type="text" placeholder="Email address" onChange={e => setEmail(e.target.value)} />
    //                                 <div className="input-border"></div>
    //                             </div>
    //                         </div>

    //                         <div className="input-wrapper">
    //                             <div className="input-container">
    //                                 <input className="modal__input" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
    //                                 <div className="input-border"></div>
    //                             </div>
    //                         </div>
    //                         <button className="modal__btn" >Sign up, it's Free</button>
    //                         {/* <button className="modal__btn" onClick={() => registration(email, password)}>Sign up, it's Free</button> */}
    //                         <div>{email}</div>
    //                         <div>{password}</div>
    //                     </form >
    //                     <img onClick={() => setActive(false)} className="close" src={close} alt="" />
    //                 </div>
    //                 :
    //                 <div className="log">
    //                     <div className="title">
    //                         <span id="title">Welcome back :)</span>
    //                     </div>
    //                     <form onSubmit={test}>
    //                         <div className="input-wrapper">
    //                             <div className="input-container">
    //                                 <input className="modal__input" type="text" placeholder="Email" onChange={e => setEmail(e.target.value)} />
    //                                 <div className="input-border"></div>
    //                             </div>
    //                         </div>

    //                         <div className="input-wrapper">
    //                             <div className="input-container">
    //                                 <input className="modal__input" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
    //                                 <div className="input-border"></div>
    //                             </div>
    //                         </div>
    //                         <button className="modal__btn" >Log in</button>
    //                         {/* <button className="modal__btn" onClick={() => login(email, password)}>Log in</button> */}
    //                         <div>{email}</div>
    //                         <div>{password}</div>
    //                     </form>
    //                     <img onClick={() => setActive(false)} className="close" src={close} alt="" />
    //                 </div>
    //             }
    //         </div>
    //     </div>
    // )
}
