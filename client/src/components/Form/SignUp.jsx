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

function SignUp({ setActive, openModal }) {
    const ctx = useContext(Context)
    const ref = useRef()
    console.log(ref)

    const handleOnSubmit = async ({ email, password }, actions) => {
        console.log(email, password)
        try {
            await ctx.registration(email, password)
            actions.setSubmitting(false);
            actions.resetForm();
        } catch (error) {
            actions.setErrors({ incorrect: error })
            actions.setSubmitting(false);
        }
    }

    const onChangeCheckBox = (e) => {
        console.log(e)
        console.log(ref)

    }
    return (
        <div className="sign">
            <img onClick={() => setActive(false)} className="close" src={close} alt="" />
            <div className="title">
                <span id="green">Sign Up, it's Free :)</span>
                <span>If you already have a Noise profile,
                    <span onClick={() => openModal(true, 'Log In')} id="title"> log in.</span>
                </span>
            </div>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={SignupSchema}
                // validate={validate}
                onSubmit={handleOnSubmit}
            >
                {({ isSubmitting, errors }) => (
                    <Form>
                        <div className="input-wrapper">
                            <div className="input-container">
                                <Field className="modal__input" type="email" name="email" placeholder="Email" />
                                <div className={!_.isEmpty(errors) && errors.email ? "input-border-error" : "input-border"}></div>
                                <div className={!_.isEmpty(errors) && errors.incorrect ? "input-border-error" : "input-border"}></div>
                            </div>
                            <ErrorMessage className="inputError" name="email" component="div" />
                            {errors.incorrect && <div className="inputError">{errors.incorrect}</div>}
                        </div>

                        <div className="input-wrapper">
                            <div className="input-container">
                                <Field className="modal__input" type="password" name="password" placeholder="Password" />
                                <div className={!_.isEmpty(errors) && errors.password ? "input-border-error" : "input-border"}></div>
                                <div className={!_.isEmpty(errors) && errors.incorrect ? "input-border-error" : "input-border"}></div>
                            </div>
                            <ErrorMessage className="inputError" name="password" component="div" />
                        </div>
                        <div className="login-container">
                            <button className="modal__btn" type="submit" disabled={isSubmitting}>
                                Sign up, it's Free
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
            {/* <div className="createAc">
                <div> create an account</div>
                <div> - </div>
                <div> Forgot password?</div>
            </div> */}
        </div>
    )
}
export default observer(SignUp);
