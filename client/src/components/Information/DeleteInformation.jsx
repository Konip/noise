import React from 'react';
import './SignupInformation.css';

export default function DeleteInformation({ setActive, openModal }) {
    return (
        <div className='verification'>
            <div className="verification__logo">
                It’s so silent here...
            </div>
            <div className="verification__caption">
                You’ve deleted your Noisli account.
                We hope you enjoyed the time with us.
                We certainly did!
            </div>
            <div className="verification__text">
                If you want to listen again to some lovely Noisli sounds,
                just <a id='signUp' onClick={() => openModal(true, 'Sign up')}>Sign Up</a> again.

            </div>
            <button className="verification__btn"onClick={() => setActive(false)} >OK</button>
            <div className="verification__text-bottom">
                We hope to see you again soon!
            </div>
        </div>
    )
}