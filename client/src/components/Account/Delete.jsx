import { observer } from "mobx-react";
import React from 'react';
import { Context } from "../../Context";
import './Account.css';

 function Delete() {

    const [update, setUpdate] = React.useState(false)
    const ctx = React.useContext(Context)
    const { email } = ctx.user

    const handleSubmit = async (email) => {
        console.log(email)
        try {
            await ctx.delete(email)
            setUpdate(true)
            setTimeout(() => {
                setUpdate(false)
            }, 2000)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="account__change">
            <div className="delete-wrapp">
                <div className="input-label">Want to delete your lovely Noise account?</div>
                <button className="account__btn" onClick={() => handleSubmit(email)}>{!update ? 'Update' : 'Updated! 🎉'}</button>
            </div>
        </div>
    )
}
export default observer(Delete)