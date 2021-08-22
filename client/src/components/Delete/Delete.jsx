import { ErrorMessage, Field, Form, Formik } from 'formik';
import _ from 'lodash';
import React, { useContext } from 'react';
import * as Yup from 'yup';
import { Context } from "../../Context";
import '../Modal/Modal.css';

const SignupSchema = Yup.object().shape({
    password: Yup.string()
        .min(4, 'Password is too short - should be 4 chars minimum.')
        .max(32, 'Password is too long - should be 32 chars maximum.')
});

export default function Delete({ openModal, setActive }) {

    const [loading, setLoading] = React.useState()
    const ctx = useContext(Context)
    const { id } = ctx.user

    const handleOnSubmit = async ({ password }, actions) => {

        try {
            setLoading(true)
            await ctx.delete(id, password)
            actions.setSubmitting(false);
            actions.resetForm();
            openModal(true, 'DeleteInformation')
            setLoading(false)
        } catch (error) {
            actions.setErrors({ incorrect: error })
            actions.setSubmitting(false);
            setLoading(false)
        }
    }

    return (
        <div className='reset'>
            <div className="reset__logo">
                Noise
            </div>
            <div className="reset__caption">
                We’re very sad to see you go!
            </div>
            <div className="reset__text">
                If you still want to delete your account, please enter the password.
            </div>
            <Formik
                initialValues={{ password: '' }}
                validationSchema={SignupSchema}
                onSubmit={handleOnSubmit}
            >
                {({ isSubmitting, errors }) => (
                    <Form>
                        <div className="input-wrapper">
                            {console.log(errors)}
                            <div className="input-container">
                                <Field className="modal__input" type="password" name="password" placeholder="Password" />
                                <div className={!_.isEmpty(errors) && errors.password ? "input-border-error" : "input-border"}></div>
                                <div className={!_.isEmpty(errors) && errors.incorrect ? "input-border-error" : "input-border"}></div>
                            </div>
                            <ErrorMessage className="inputError" name="password" component="div" />
                            {errors.incorrect && <div className="inputError">{errors.incorrect}</div>}
                        </div>
                        <div className="login-container">
                            <button className="reset__btn-del" type="submit" disabled={isSubmitting}>
                                {loading ? <span className="loading">
                                    Delete<span className="one">.</span><span className="two">.</span><span className="three">.</span>
                                </span>
                                    : "Delete"}
                            </button>
                            <button className="reset__btn" type="reset" onClick={() => setActive(false)}>
                                Never mind
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
