import { ErrorMessage, Field, Form, Formik } from 'formik';
import { observer } from "mobx-react";
import React from 'react';
import * as Yup from 'yup';
import { Context } from "../../Context";
import './Account.css';

const SignupSchema = Yup.object().shape({
    username: Yup.string().max(10, 'Username is too long - should be 10 chars maximum.'),
    email: Yup.string().email('Please insert a valid email'),
    password: Yup.string().min(4, 'Password is too short - should be 4 chars minimum.'),
    firstName: Yup.string().max(10, 'Username is too long - should be 10 chars maximum.'),
    lastName: Yup.string().max(10, 'Username is too long - should be 10 chars maximum.'),
});

function Account() {

    const [update, setUpdate] = React.useState(false)
    const ctx = React.useContext(Context)
    const { username, email, firstName, lastName } = ctx.user

    const handleOnSubmit = async ({ email, firstName, lastName, username }, actions) => {
        console.log(email,firstName,lastName,username)
        try {
            await ctx.changeData(email, firstName, lastName, username)
            actions.setSubmitting(false);
            setUpdate(true)
            // setTimeout(() => {
            //     setUpdate(false)
            // }, 2000)
            // actions.resetForm();
        } catch (error) {
            alert()
            actions.setErrors({ incorrect: error })
            actions.setSubmitting(false);
            // actions.setFieldValue( 'password', '' )
            console.log('errrrrrrrrrrrrr')
        }
    }

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
                    <Formik
                        initialValues={{ username, email, firstName, lastName }}
                        validationSchema={SignupSchema}
                        onSubmit={handleOnSubmit}
                    >
                        {({ isSubmitting, errors }) => (
                            <Form>
                                <div className="input-wrapp">
                                    <div className="input-label__container">
                                        <div className="input-label">Username</div>
                                        <Field className="" type="text" name="username" />
                                        {/* <div className={!_.isEmpty(errors) && errors.email ? "input-border-error" : "input-border"}></div>
                                        <div className={!_.isEmpty(errors) && errors.incorrect ? "input-border-error" : "input-border"}></div> */}
                                        <ErrorMessage className="inp-Error" name="username" component="div" />
                                    </div>
                                    <div className="input-label__container">
                                        <div className="input-label">Email</div>
                                        <Field className="" type="email" name="email" />
                                        {/* <div className={!_.isEmpty(errors) && errors.password ? "input-border-error" : "input-border"}></div>
                                    <div className={!_.isEmpty(errors) && errors.incorrect ? "input-border-error" : "input-border"}></div> */}
                                        <ErrorMessage className="inp-Error-email" name="email" component="div" />
                                    </div>
                                    {errors.incorrect && <div className="inp-Error">{errors.incorrect}</div>}
                                </div>

                                <div className="input-wrapp">
                                    <div className="input-label__container">
                                        <div className="input-label">First Name</div>
                                        <Field className="" type="text" name="firstName" />
                                        {/* <div className={!_.isEmpty(errors) && errors.email ? "input-border-error" : "input-border"}></div>
                                        <div className={!_.isEmpty(errors) && errors.incorrect ? "input-border-error" : "input-border"}></div> */}
                                        <ErrorMessage className="inp-Error" name="firstName" component="div" />
                                    </div>
                                    <div className="input-label__container">
                                        <div className="input-label">Last Name</div>
                                        <Field className="" type="text" name="lastName" />
                                        {/* <div className={!_.isEmpty(errors) && errors.password ? "input-border-error" : "input-border"}></div>
                                        <div className={!_.isEmpty(errors) && errors.incorrect ? "input-border-error" : "input-border"}></div> */}
                                        <ErrorMessage className="inp-Error" name="lastName" component="div" />
                                    </div>
                                    {errors.incorrect && <div className="inp-Error">{errors.incorrect}</div>}
                                </div>
                                {/* <button className="account__btn" type="submit" disabled={isSubmitting}>{!update ? 'Update' : 'Updated!'}</button> */}
                                <button className="account__btn" type="submit" disabled={isSubmitting}>Update</button>
                            </Form>
                        )}
                    </Formik>
                    {/* <form action="">
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
                        <button className="account__btn" onClick={() => ctx.change()} >Update</button>
                    </form> */}
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
                            <button className="delete__btn" onClick={() => ctx.delete()}>Delete</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default observer(Account);