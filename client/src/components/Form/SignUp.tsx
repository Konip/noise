import { ErrorMessage, Field, Form, Formik } from 'formik';
import { observer } from "mobx-react";
import React, { useContext } from 'react';
import * as Yup from 'yup';
import { Context } from "../../Context.js";
import '../Modal/Modal.css';

interface ISignUp {
    openModal(activeModal: boolean, typeModal: string): void
    setEmail(email: string): void
}

const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Please insert a valid email'),
    password: Yup.string()
        .min(4, 'Password is too short - should be 4 chars minimum.')
        .max(32, 'Password is too long - should be 32 chars maximum.')
});

const SignUp: React.FC<ISignUp> = ({ openModal, setEmail }) => {

    const [loading, setLoading] = React.useState<boolean>()
    const ctx = useContext(Context);

    const handleOnSubmit = async ({ email, password }: { email: string, password: string }, actions: any) => {
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
                {({ isSubmitting, errors }: { isSubmitting: boolean, errors: any }) => (
                    <Form>
                        <div className="input-wrapper">
                            <div className="input-container">
                                <Field className="modal__input" type="email" name="email" placeholder="Email" />
                                <div className={errors?.email ? "input-border-error" : "input-border"}></div>
                                <div className={errors?.incorrect ? "input-border-error" : "input-border"}></div>
                            </div>
                            <ErrorMessage className="inputError" name="email" component="div" />
                            {errors.incorrect && <div className="inputError">{errors.incorrect}</div>}
                        </div>

                        <div className="input-wrapper">
                            <div className="input-container">
                                <Field className="modal__input" type="password" name="password" placeholder="Password" />
                                <div className={errors?.password ? "input-border-error" : "input-border"}></div>
                                <div className={errors?.incorrect ? "input-border-error" : "input-border"}></div>
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
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
export default observer(SignUp);
