import { observer } from "mobx-react";
import React from 'react';
import { Context } from "../../Context";
import './Account.css';
import Delete from "./Delete";
import Password from "./Password";
import Profile from "./Profile";

function Account() {

    const [update, setUpdate] = React.useState(false)
    const ctx = React.useContext(Context)
    const { username, email, firstName, lastName, id } = ctx.user

    return (
        <div className="account">
            <div className="account__container">
                {console.log('account')}
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
                <Delete />
            </div>
        </div>
    )
}
export default observer(Account);