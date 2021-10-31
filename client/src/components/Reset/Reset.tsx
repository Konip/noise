import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useContext } from 'react';
import * as Yup from 'yup';
import { Context } from "../../Context.js";
import './Reset.css';

interface ResetProps {
    openModal(activeModal: boolean, typeModal: string): void
    setEmail(email: string): void
}

const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Please insert a valid email')
});

const Reset: React.FC<ResetProps> = ({ openModal, setEmail }) => {

    const [loading, setLoading] = React.useState<boolean>()
    const ctx = useContext(Context)

    const handleOnSubmit = async ({ email }: { email: string }, actions: any) => {
        try {
            setLoading(true)
            await ctx.resetPassword(email)
            actions.setSubmitting(false);
            actions.resetForm();
            setEmail(email)
            openModal(true, 'ResetInformation')
        } catch (error) {
            console.error(error)
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
                        <div className="login-container">
                            <button className="reset__btn" type="submit" disabled={isSubmitting}>
                                {loading ? <span className="loading">
                                    Reset<span className="one">.</span><span className="two">.</span><span className="three">.</span>
                                </span>
                                    : "Reset Password"}
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
export default Reset