import { ErrorMessage, Field, Form, Formik } from 'formik';
import _ from 'lodash';
import React, { useRef, useState } from 'react';
import * as Yup from 'yup';
import close from '../../assets/img/close.svg';
import '../Modal/Modal.css';

const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Please insert a valid email'),
    password: Yup.string()
        .min(4, 'Password is too short - should be 4 chars minimum.')
        // .matches(/[a-zA-Z]/, 'Password can only contain Latin letters')
});

export default function Login({ setActive }) {
    const [email, setEmail] = useState('gunpowderbit@gmail.com')
    const [password, setPassword] = useState('12345')

    const ref = useRef()
    console.log(ref)

    const onChangeCheckBox = (e) => {
        console.log(e)
        console.log(  ref)
  
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
                // validate={validate}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                }}
            >
                {({ isSubmitting, errors }) => (
                    <Form>
                        <div className="input-wrapper">
                            <div className="input-container">
                                <Field className="modal__input" type="email" name="email" placeholder="Email" />
                                <div className={!_.isEmpty(errors) && errors.email ? "input-border-error" : "input-border"}></div>
                            </div>
                            <ErrorMessage className="inputError" name="email" component="div" />
                            {/* <div className="inputError">Please insert a valid email</div> */}
                        </div>

                        <div className="input-wrapper">
                            <div className="input-container">
                                <Field className="modal__input" type="password" name="password" placeholder="Password" />
                                <div className={!_.isEmpty(errors) && errors.password ? "input-border-error" : "input-border"}></div>
                            </div>
                            <ErrorMessage className="inputError" name="password" component="div" />
                        </div>
                        <div className="login-container">
                            <div className="checkbox">
                                <input type="checkbox" name="logged_in" id="logged_in" ref={ref} onChange={onChangeCheckBox} />
                                <label htmlFor="logged_in">
                                    <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    {/* stay logged in */}
                                </label>
                            </div>
                            <div>stay logged in </div>
                            {/* <input readOnly value="stay logged in " /> */}
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

