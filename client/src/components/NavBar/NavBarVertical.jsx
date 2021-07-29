import { observer } from "mobx-react";
import React, { Component } from 'react';
import { Context } from "../../Context";
import './NavBarVertical.css';

export const NavBarVertical = observer(
    class NavBarVertical extends Component {

        static contextType = Context

        constructor() {
            super()
            this.state = {
                soundToggle: true,
                email: '',
                password: ''
            }

            this.changeSound = this.changeSound.bind(this)
            this.setEmail = this.setEmail.bind(this)
            this.setPassword = this.setPassword.bind(this)
            this.login = this.login.bind(this)
            this.logout = this.logout.bind(this)
        }

        componentDidMount() {
            console.log('componentDidMount');
            this.context.checkAuth()
        }

        setEmail(email) {
            this.setState({ email: email })
        }

        setPassword(password) {
            this.setState({ password: password })
        }

        changeSound() {
            this.props.changeToggle()
        }

        login(email, password) {
            let premium = document.querySelector('.premium')
            this.context.login(email, password)
            premium.classList.remove('tooltip-active')
            this.props.setIsAuth(true)
        }

        logout(email, password) {
            let premium = document.querySelector('.premium')
            this.context.logout(email, password)
            premium.classList.add('tooltip-active')
            this.props.setIsAuth(false)
        }

        set() {

        }

        render() {
            const { email, password } = this.state;
            const store = this.context;
            // const { setActive } = this.props
            // console.log(this.props.setActive)
            return (
                <div id="header" className='nav-vertical'>
                    <div className="leftSection">
                        <button className="btn" onClick={() => this.props.openModal('Sign up')} >
                            {/* <button className="login" onClick={() => store.registration(email, password)}> */}
                            Sign up
                        </button>
                        <button className="btn" onClick={() => this.props.openModal("Log In")}>
                            {/* <button className="login" onClick={() => this.login(email, password)}> */}
                            Log In
                        </button>
                    </div>
                </div>
            )
        }
    }
)