import React from 'react';
import { AccountProps } from './Account';
import './Account.css';

const Del:React.FC<AccountProps> = ({ openModal, setPage }) => {

    const del = () => {
        setPage('body')
        openModal(true, 'Delete')
    }

    return (
        <div className="account__change">
            <div className="delete-wrapp">
                <div className="input-label">Want to delete your lovely Noise account?</div>
                <button className="account__btn" onClick={del}>Delete</button>
            </div>
        </div>
    )
}
export default Del