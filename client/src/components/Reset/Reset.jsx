import { ErrorMessage, Field, Form, Formik } from 'formik';
import _ from 'lodash';
import React, { useContext } from 'react';
import * as Yup from 'yup';
import { Context } from "../../Context";
import './Reset.css';

const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Please insert a valid email')
});

export default function Reset({openModal}) {

    const ctx = useContext(Context)

    const handleOnSubmit = async ({ email }, actions) => {
        console.log(email)
        try {
            await ctx.resetPassword(email)
            console.log(email);
            // actions.setSubmitting(false);
            // actions.resetForm();
        } catch (error) {
            // actions.setErrors({ incorrect: error })
            // actions.setSubmitting(false);

            // actions.setFieldValue( 'password', '' )
        }
    }
    return (
        <div className='reset'>
            <div className="reset__logo">
                Noise
            </div>
            <div className="reset__caption">
                Forgot your password?
            </div>
            <div className="reset__text">
                Don’t worry! Please enter your email address with which you signed up and we will email you the instructions on how to reset your password.
            </div>
            <Formik
                initialValues={{ email: '' }}
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
                        <div className="login-container">
                            <button className="reset__btn" type="submit" disabled={isSubmitting}>
                                Reset Password
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
            <div className="reset__back" onClick={() => openModal(true, 'Log In')}>
            Back to Log In
            </div>
        </div>
    )
}
