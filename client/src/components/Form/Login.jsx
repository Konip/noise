import { ErrorMessage, Field, Form, Formik } from 'formik';
import _ from 'lodash';
import { observer } from "mobx-react";
import React, { useContext, useRef } from 'react';
import * as Yup from 'yup';
import close from '../../assets/img/close.svg';
import { Context } from "../../Context";
import '../Modal/Modal.css';

const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Please insert a valid email'),
    password: Yup.string()
        .min(4, 'Password is too short - should be 4 chars minimum.')
    // .matches(/[a-zA-Z]/, 'Password can only contain Latin letters')
});

function Login({ setActive }) {

    const ctx = useContext(Context)
    const ref = useRef()
    console.log(ref)

    const onChangeCheckBox = (e) => {
        console.log(e)
    }

    const handleOnSubmit = async ({ email, password }, actions) => {
        console.log(email, password)
        try {
            await ctx.login(email, password)

            actions.setSubmitting(false);
            actions.resetForm();
        } catch (error) {
            actions.setErrors({ incorrect: "Oops, wrong email or password" })
            actions.setSubmitting(false);
            actions.setFieldValue()
            console.log('errrrrrrrrrrrrr')
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
            <img onClick={() => setActive(false)} className="close" src={close} alt="" />
            <div className="title">
                <span id="green">Welcome back :)</span>
            </div>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={SignupSchema}
                onSubmit={handleOnSubmit}

            >
                {({ isSubmitting, errors }) => (
                    <Form>
                        <div className="input-wrapper">
                            {console.log(errors)}
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
                            {/* <ErrorMessage className="inputError" name="incorrect" component="div" /> */}
                        </div>
                        <div className="login-container">
                            <div className="checkbox">
                                <input type="checkbox" name="logged_in" id="logged_in" ref={ref} onChange={onChangeCheckBox} />
                                <label htmlFor="logged_in">
                                    <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </label>
                            </div>
                            <div>stay logged in </div>
                            <button className="modal__btn" type="submit" disabled={isSubmitting}>
                                Log in
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
            <div className="createAc">
                <div> create an account</div>
                <div> - </div>
                <div> Forgot password?</div>
            </div>
        </div>
    )
}

export default observer(Login);

