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

function SignUp({ openModal, setEmail }) {

    const [loading, setLoading] = React.useState()
    const ctx = useContext(Context);

    const handleOnSubmit = async ({ email, password }, actions) => {
        console.log(email, password)
        try {
            setLoading(true)
            await ctx.registration(email, password)
            actions.setSubmitting(false);
            actions.resetForm();
            setEmail(email)
            openModal(true, 'SignupInformation')
        } catch (error) {
            actions.setErrors({ incorrect: error })
            actions.setSubmitting(false);
        } finally {
            setLoading(false)
        }

    }

    return (
        <div className="sign">
            <div className="title">
                <span id="green">Sign Up, it's Free :)</span>
                <span>If you already have a Noise profile,
                    <span onClick={() => openModal(true, 'Log In')} id="title"> log in.</span>
                </span>
            </div>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={SignupSchema}
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
                            <button className="modal__btn-sign" type="submit" disabled={isSubmitting}>
                                {loading ?
                                    <span className="loading">
                                        Registration<span className="one">.</span><span className="two">.</span><span className="three">.</span>
                                    </span>
                                    : "Sign up, it's Free"}
                                {/* {loading ? "Registration..." : "Sign up, it's Free"} */}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
export default observer(SignUp);
