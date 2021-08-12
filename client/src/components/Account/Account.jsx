import { ErrorMessage, Field, Form, Formik } from 'formik';
import { observer } from "mobx-react";
import React from 'react';
import * as Yup from 'yup';
import { Context } from "../../Context";
import './Account.css';

const SignupSchema = Yup.object().shape({
    username: Yup.string()
        .max(10, 'Username is too long - should be 10 chars maximum.')
        .min(4, 'Username is too short - should be 4 chars minimum.'),
    email: Yup.string().email('Please insert a valid email'),
    firstName: Yup.string().max(10, 'Username is too long - should be 10 chars maximum.'),
    lastName: Yup.string().max(10, 'Username is too long - should be 10 chars maximum.'),
    password: Yup.string().min(4, 'Password is too short - should be 4 chars minimum.'),
    password: Yup.string().
});

function Account() {

    const [update, setUpdate] = React.useState(false)
    const ctx = React.useContext(Context)
    const { username, email, firstName, lastName, id } = ctx.user

    const submitInformation = async ({ email, firstName, lastName, username }, actions) => {
        console.log(email, firstName, lastName, username)
        try {
            await ctx.changeData(email, firstName, lastName, username, id)
            actions.setSubmitting(false);
            setUpdate(true)
            setTimeout(() => {
                setUpdate(false)
            }, 2000)

        } catch (error) {
            actions.setErrors({ incorrect: error })
            actions.setSubmitting(false);
        }
    }

    const submitPassword = async ({ password }, actions) => {
        console.log(password)
        try {
            await ctx.changePassword(password)
            actions.setSubmitting(false);
            setUpdate(true)
            setTimeout(() => {
                setUpdate(false)
            }, 2000)

        } catch (error) {
            actions.setErrors({ incorrect: error })
            actions.setSubmitting(false);
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
                        onSubmit={submitInformation}
                    >
                        {({ isSubmitting, errors }) => (
                            <Form>
                                <div className="input-wrapp">
                                    <div className="input-label__container">
                                        {console.log(errors)}
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
                                        {errors.incorrect && <div className="inp-Error-email">{errors.incorrect}</div>}
                                    </div>

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
                                </div>
                                <button className="account__btn" type="submit" disabled={isSubmitting}>{!update ? 'Update' : 'Updated! 🎉'}</button>
                            </Form>
                        )}
                    </Formik>
                    <Formik
                        initialValues={{ password: '' }}
                        validationSchema={SignupSchema}
                        onSubmit={submitPassword}
                    >
                        {({ isSubmitting, errors }) => (
                            <Form>
                                <div className="account__change">
                                    <div className="basic__title">
                                        change password
                                    </div>
                                    <div className="input-wrapp">
                                        <div className="input-label__container">
                                            <div className="input-label">New Password</div>
                                            <Field className="" type="text" name="password" placeholder="New Password" />
                                            <ErrorMessage className="inp-Error" name="password" component="div" />
                                        </div>
                                        <div className="input-label__container">
                                            <div className="input-label">Confirm New Password</div>
                                            <Field className="" type="text" name="passwordConfirm" placeholder="Confirm New Password" />
                                            <ErrorMessage className="inp-Error" name="passwordConfirm" component="div" />
                                        </div>
                                    </div>
                                    <button className="account__btn" type="submit" disabled={isSubmitting}>{!update ? 'Update' : 'Updated! 🎉'}</button>
                                </div>
                            </Form>
                        )}
                    </Formik>
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