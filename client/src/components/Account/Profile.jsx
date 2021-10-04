import { ErrorMessage, Field, Form, Formik } from 'formik';
import { observer } from "mobx-react";
import React from 'react';
import * as Yup from 'yup';
import { Context } from "../../Context";
import './Account.css';

const SignupSchema = Yup.object().shape({
    username: Yup.string()
        .max(10, 'Username is too long - should be 10 chars maximum.')
        .min(4, 'Username is too short - should be 4 chars minimum.'),
    email: Yup.string().required('Email is required')
        .email('Please insert a valid email'),
    firstName: Yup.string().max(10, 'Username is too long - should be 10 chars maximum.'),
    lastName: Yup.string().max(10, 'Username is too long - should be 10 chars maximum.'),
});


function Profile() {

    const [update, setUpdate] = React.useState(false)
    const ctx = React.useContext(Context)
    const { username, email, firstName, lastName, id } = ctx.user

    console.log("Profile", username, email, firstName, lastName, id);
    const handleSubmit = async ({ email, firstName, lastName, username }, actions) => {
       
        try {
            await ctx.changeData(email, firstName, lastName, username, id)
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
            initialValues={{ username, email, firstName, lastName }}
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting, errors }) => (
                <Form>
                    <div className="input-wrapp">
                        <div className="input-label__container">
                            {console.log(errors)}
                            <div className="input-label">Username</div>
                            <Field className="" type="text" name="username" />
                            {/* <div className={!_.isEmpty(errors) && errors.email ? "input-border-error" : "input-border"}></div>
                        <div className={!_.isEmpty(errors) && errors.incorrect ? "input-border-error" : "input-border"}></div> */}
                            <ErrorMessage className="inp-Error" name="username" component="div" />
                        </div>
                        <div className="input-label__container">
                            <div className="input-label">Email</div>
                            <Field className="" type="email" name="email" />
                            {/* <div className={!_.isEmpty(errors) && errors.password ? "input-border-error" : "input-border"}></div>
                    <div className={!_.isEmpty(errors) && errors.incorrect ? "input-border-error" : "input-border"}></div> */}
                            <ErrorMessage className="inp-Error-email" name="email" component="div" />
                            {errors.incorrect && <div className="inp-Error-email">{errors.incorrect}</div>}
                        </div>

                    </div>

                    <div className="input-wrapp">
                        <div className="input-label__container">
                            <div className="input-label">First Name</div>
                            <Field className="" type="text" name="firstName" />
                            {/* <div className={!_.isEmpty(errors) && errors.email ? "input-border-error" : "input-border"}></div>
                        <div className={!_.isEmpty(errors) && errors.incorrect ? "input-border-error" : "input-border"}></div> */}
                            <ErrorMessage className="inp-Error" name="firstName" component="div" />
                        </div>
                        <div className="input-label__container">
                            <div className="input-label">Last Name</div>
                            <Field className="" type="text" name="lastName" />
                            {/* <div className={!_.isEmpty(errors) && errors.password ? "input-border-error" : "input-border"}></div>
                        <div className={!_.isEmpty(errors) && errors.incorrect ? "input-border-error" : "input-border"}></div> */}
                            <ErrorMessage className="inp-Error" name="lastName" component="div" />
                        </div>
                    </div>
                    <button className="account__btn" type="submit" disabled={isSubmitting}>{!update ? 'Update' : 'Updated! 🎉'}</button>
                </Form>
            )}
        </Formik>
    )
}
export default observer(Profile);