import React from 'react';
import './Account.css';
import Del from "./Del";
import Password from "./Password";
import Profile from "./Profile";

export interface AccountProps {
    openModal(activeModal: boolean, typeModal: string): void
    setPage(page: string): void
}

const Account:React.FC<AccountProps> = ({ openModal, setPage }) => {

    return (
        <div className="account">
            <div className="account__container">
                <div className="account__title">
                    Account
                </div>
                <div className="account__basic">
                    <div className="basic__title">
                        basic information
                    </div>
                    <Profile />
                    <Password />
                </div>
                <Del openModal={openModal} setPage={setPage} />
            </div>
        </div>
    )
}

export default Account