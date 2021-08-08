import React from 'react';
import { Context } from "../../Context";
import './Account.css';

export default function Account() {
    const { username, email, firstName, lastName } = React.useContext(Context).user
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
                    <form action="">
                        <div className="input-wrapp">
                            <div className="input-label__container">
                                <div className="input-label">Username</div>
                                <input type="text" value={username} />
                            </div>
                            <div className="input-label__container">
                                <div className="input-label">Email</div>
                                <input type="text" value={email} />
                            </div>
                        </div>
                        <div className="input-wrapp">
                            <div className="input-label__container">
                                <div className="input-label">First Name</div>
                                <input type="text" value={firstName} />
                            </div>
                            <div className="input-label__container">
                                <div className="input-label">Last Name</div>
                                <input type="text" value={lastName} />
                            </div>
                        </div>
                        <button className="account__btn">Update</button>
                    </form>
                </div>
                <div className="account__change">
                    <div className="basic__title">
                        change password
                    </div>
                    <form action="">
                        <div className="input-wrapp">
                            <div className="input-label__container">
                                <div className="input-label">New Password</div>
                                <input type="text" className="username" placeholder="New Password" />
                            </div>
                            <div className="input-label__container">
                                <div className="input-label">Confirm New Password</div>
                                <input type="text" className="email" placeholder="Confirm New Password" />
                            </div>
                        </div>
                        <button className="account__btn">Update</button>
                    </form>
                </div>
                <div className="account__change">
                    <form action="">
                        <div className="delete-wrapp">
                            <div className="input-label">Want to delete your lovely Noise account?</div>
                            <button className="delete__btn">Delete</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
