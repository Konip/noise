import React from 'react';
import './SignupInformation.css';

interface ResetInformationProps {
    email: string,
    setActive(activeModal: boolean): void
}

const ResetInformation: React.FC<ResetInformationProps> = ({ email, setActive }) => {
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
export default ResetInformation
