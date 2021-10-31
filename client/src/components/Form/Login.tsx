import { ErrorMessage, Field, Form, Formik } from 'formik';
import { observer } from "mobx-react";
import React, { useContext } from 'react';
import * as Yup from 'yup';
import { Context } from "../../Context.js";
import '../Modal/Modal.css';

interface LoginProps {
    openModal(activeModal: boolean, typeModal: string): void
    setActive(email: boolean): void
}

interface IhandleOnSubmit {
    email: string,
    password: string
    toggle: boolean
}

const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Please insert a valid email'),
    password: Yup.string()
        .min(4, 'Password is too short - should be 4 chars minimum.')
        .max(32, 'Password is too long - should be 32 chars maximum.')
});

const Login: React.FC<LoginProps> = ({ setActive, openModal }) => {

    const ctx = useContext(Context)

    const handleOnSubmit = async ({ email, password, toggle }: IhandleOnSubmit, actions: any) => {
        try {
            await ctx.login(email, password, toggle)
            actions.setSubmitting(false);
            actions.resetForm();
            setActive(false)
        } catch (error) {
            actions.setErrors({ incorrect: error })
            actions.setSubmitting(false);
        }
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
                {({ isSubmitting, errors }: { isSubmitting: boolean, errors: any }) => (
                    <Form>
                        <div className="input-wrapper">
                            <div className="input-container">
                                <Field className="modal__input" type="email" name="email" placeholder="Email" />
                                <div className={errors?.email ? "input-border-error" : "input-border"}></div>
                                <div className={errors?.incorrect ? "input-border-error" : "input-border"}></div>
                            </div>
                            <ErrorMessage className="inputError" name="email" component="div" />
                        </div>
                        <div className="input-wrapper">
                            <div className="input-container">
                                <Field className="modal__input" type="password" name="password" placeholder="Password" />
                                <div className={errors?.password ? "input-border-error" : "input-border"}></div>
                                <div className={errors?.incorrect ? "input-border-error" : "input-border"}></div>
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