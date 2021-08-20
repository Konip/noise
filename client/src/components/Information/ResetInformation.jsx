import React from 'react';
import './SignupInformation.css';

export default function ResetInformation({ email, setActive }) {
    { console.log(email) }
    return (
        <div className='verification'>
            <div className="verification__logo">
                Email sent
            </div>
            <div className="verification__caption">
                Please check your email.
            </div>
            <div className="verification__text">
                We've sent an email to <strong>{email}</strong> In order to reset your password, please follow
                the instructions in the email.
            </div>
            <button className="verification__btn" onClick={() => setActive(false)}>OK</button>
        </div>
    )
}
