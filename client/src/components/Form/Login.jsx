import { ErrorMessage, Field, Form, Formik } from 'formik';
import _ from 'lodash';
import { observer } from "mobx-react";
import React, { useContext } from 'react';
import * as Yup from 'yup';
import { Context } from "../../Context";
import '../Modal/Modal.css';

const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Please insert a valid email'),
    password: Yup.string()
        .min(4, 'Password is too short - should be 4 chars minimum.')
        .max(32, 'Password is too long - should be 32 chars maximum.')
});

function Login({ setActive, openModal }) {

    const ctx = useContext(Context)

    const handleOnSubmit = async ({ email, password, toggle }, actions) => {
        console.log(email, password, toggle)
        try {
            await ctx.login(email, password, toggle)
            actions.setSubmitting(false);
            actions.resetForm();
        } catch (error) {
            actions.setErrors({ incorrect: error })
            actions.setSubmitting(false);
            // actions.setFieldValue( 'password', '' )
        }
    }

    if (ctx.isAuth) {
        let premium = document.querySelector('.premium')
        premium.classList.remove('tooltip-active')
        setActive(false)
    }
    else if (!ctx.isAuth) {

    }
    return (
        <div className="log">
            <div className="title">
                <span id="green">Welcome back :)</span>
            </div>
            <Formik
                initialValues={{ email: '', password: '', toggle: true }}
                validationSchema={SignupSchema}
                onSubmit={handleOnSubmit}
            >
                {({ isSubmitting, errors, values }) => (
                    <Form>
                        <div className="input-wrapper">
                            <div className="input-container">
                                <Field className="modal__input" type="email" name="email" placeholder="Email" />
                                <div className={!_.isEmpty(errors) && errors.email ? "input-border-error" : "input-border"}></div>
                                <div className={!_.isEmpty(errors) && errors.incorrect ? "input-border-error" : "input-border"}></div>
                            </div>
                            <ErrorMessage className="inputError" name="email" component="div" />
                        </div>
                        <div className="input-wrapper">
                            <div className="input-container">
                                <Field className="modal__input" type="password" name="password" placeholder="Password" />
                                <div className={!_.isEmpty(errors) && errors.password ? "input-border-error" : "input-border"}></div>
                                <div className={!_.isEmpty(errors) && errors.incorrect ? "input-border-error" : "input-border"}></div>
                            </div>
                            <ErrorMessage className="inputError" name="password" component="div" />
                            {errors.incorrect && <div className="inputError">{errors.incorrect}</div>}
                        </div>
                        <div className="login-container">
                            <div className="checkbox">
                                <Field type="checkbox" name="toggle" id="logged_in" />
                                <label htmlFor="logged_in">
                                    <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </label>
                            </div>
                            <div className="stayLogged ">Stay logged in </div>
                            <button className="modal__btn-log" type="submit" disabled={isSubmitting}>
                                Log in
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
            <div className="createAc">
                <div onClick={() => openModal(true, 'Sign up')}>Create an account</div>
                <div id='dash'> - </div>
                <div onClick={() => openModal(true, 'Reset')}>Forgot password?</div>
            </div>
        </div>
    )
}

export default observer(Login);

