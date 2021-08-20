import React from 'react';
import './SignupInformation.css';

export default function SignupInformation({ email, setActive }) {
    {console.log(email)}
    return (
        <div className='verification'>
            <div className="verification__logo">
                Almost there…
            </div>
            <div className="verification__caption">
                Please verify your email address.
            </div>
            <div className="verification__text">
                We've sent an email to <strong>{email}</strong> Please click on the confirmation link in the email in order to verify your account. We'll take it from there.
            </div>
            <button className="verification__btn" onClick={() => setActive(false)}>OK</button>
        </div>
    )
}
