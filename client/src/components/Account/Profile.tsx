import { ErrorMessage, Field, Form, Formik } from 'formik';
import { observer } from "mobx-react";
import React from 'react';
import * as Yup from 'yup';
import { Context } from "../../Context.js";
import './Account.css';

interface IhandleOnSubmit {
    email: string,
    firstName: string
    lastName: string
    username: string
    id?: string
}

const SignupSchema = Yup.object().shape({
    username: Yup.string()
        .max(10, 'Username is too long - should be 10 chars maximum.')
        .min(4, 'Username is too short - should be 4 chars minimum.'),
    email: Yup.string().required('Email is required')
        .email('Please insert a valid email'),
    firstName: Yup.string().max(10, 'Username is too long - should be 10 chars maximum.'),
    lastName: Yup.string().max(10, 'Username is too long - should be 10 chars maximum.'),
});


const Profile: React.FC = () => {

    const [update, setUpdate] = React.useState(false)
    const ctx = React.useContext(Context)
    const { username, email, firstName, lastName, id }: IhandleOnSubmit = ctx.user

    const handleSubmit = async ({ email, firstName, lastName, username }: IhandleOnSubmit, actions: any) => {

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
            {({ isSubmitting, errors }: { isSubmitting: boolean, errors: any }) => (
                <Form>
                    <div className="data__change">
                        <div className="input-wrapp">
                            <div className="input-label__container">
                                {console.log(errors)}
                                <div className="input-label">Username</div>
                                <Field className="" type="text" name="username" />
                                <ErrorMessage className="inp-Error" name="username" component="div" />
                            </div>
                            <div className="input-label__container">
                                <div className="input-label">Email</div>
                                <Field className="" type="email" name="email" />
                                <ErrorMessage className="inp-Error-email" name="email" component="div" />
                                {errors.incorrect && <div className="inp-Error-email">{errors.incorrect}</div>}
                            </div>
                        </div>

                        <div className="input-wrapp">
                            <div className="input-label__container">
                                <div className="input-label">First Name</div>
                                <Field className="" type="text" name="firstName" />
                                <ErrorMessage className="inp-Error" name="firstName" component="div" />
                            </div>
                            <div className="input-label__container">
                                <div className="input-label">Last Name</div>
                                <Field className="" type="text" name="lastName" />
                                <ErrorMessage className="inp-Error" name="lastName" component="div" />
                            </div>
                        </div>
                        <div className="wrap-btn">
                            <button className="account__btn" type="submit" disabled={isSubmitting}>{!update ? 'Update' : 'Updated! 🎉'}</button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )
}
export default observer(Profile);