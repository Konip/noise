import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { Context } from "../../Context";
import './Account.css';

const SignupSchema = Yup.object().shape({
    currentPassword: Yup.string()
        .notOneOf([Yup.ref('newPassword'), null], "Passwords match, please enter a different password")
        .min(4, 'Password is too short - should be 4 chars minimum.'),

    newPassword: Yup.string()
        .notOneOf([Yup.ref('currentPassword'), null], "Passwords match, please enter a different password")
        .min(4, 'Password is too short - should be 4 chars minimum.'),
});

export default function Password() {

    const [update, setUpdate] = React.useState(false)
    const ctx = React.useContext(Context)
    const { username, email, firstName, lastName, id } = ctx.user

    const handleSubmit = async ({ currentPassword, newPassword }, actions) => {
        try {
            await ctx.changePassword(currentPassword, newPassword, id)
            actions.setSubmitting(false);
            setUpdate(true)
            setTimeout(() => {
                setUpdate(false)
            }, 2000)
        } catch (error) {
            actions.setErrors({ incorrect: error })
            actions.setSubmitting(false);
        }
    }

    return (
        <Formik
            initialValues={{ currentPassword: '', newPassword: '' }}
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting, errors }) => (
                <Form>
                    <div className="account__change">
                        <div className="basic__title">
                            change password
                        </div>
                        <div className="input-wrapp">
                            <div className="input-label__container">
                                <div className="input-label">Current Password</div>
                                <Field className="" type="text" name="currentPassword" placeholder="Current Password" />
                                <ErrorMessage className="inp-Error" name="currentPassword" component="div" />
                                {errors.incorrect && <div className="inp-Error-email">{errors.incorrect}</div>}
                            </div>
                            <div className="input-label__container">
                                <div className="input-label">New Password</div>
                                <Field className="" type="text" name="newPassword" placeholder="New Password" />
                                <ErrorMessage className="inp-Error" name="newPassword" component="div" />

                            </div>
                        </div>
                        <button className="account__btn" type="submit" disabled={isSubmitting}>{!update ? 'Update' : 'Updated! 🎉'}</button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}