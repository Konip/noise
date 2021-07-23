import React, { Component } from 'react'
import {Context} from "../index";
import './NavBar.css'

export class NavBar extends Component {

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
    render() {
        let state = this.state
        return (
            <div className='nav'>
                {
                    console.log(state)
                }
                <div className="logo">
                    <p>Noise</p>
                </div>
                <div className="rightSection">
                    <input onChange={e => this.setEmail(e.target.value)} type="text" placeholder='text' value={this.state.email} />
                    <input onChange={e => this.setPassword(e.target.value)} type="password" placeholder='password' value={this.state.password} />
                    <button onClick={() => store.login(email, password)}>Логин</button>
                    <button onClick={() => store.login(email, password)}>Регистрация</button>
                    <div>
                        <a href="" className="login">Log In</a>
                    </div>
                    {/* <input id='input-rain' style={this.props.sound ?{ visibility: 'visible' } : { visibility: 'hidden' } } type="range" min='0' max='1' step='0.01' onChange={(e) => this.change(e)} ></input> */}
                    <div className="sound" onClick={this.changeSound}>
                        {/* <div className="sound" onClick={() => this.setState({ soundToggle: !this.state.soundToggle })}> */}
                        {this.state.soundToggle
                            ?
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                <g fill="none" fillRule="evenodd">
                                    <path fill="currentColor" fillRule="nonzero" d="M14.217 3.622a1 1 0 1 1 1.566-1.244C17.26 4.24 18 6.46 18 9c0 2.54-.74 4.76-2.217 6.622a1 1 0 1 1-1.566-1.244C15.407 12.878 16 11.098 16 9c0-2.099-.593-3.879-1.783-5.378z"></path>
                                    <path fill="currentColor" fillRule="nonzero" d="M12.168 6.555a1 1 0 1 1 1.664-1.11C14.603 6.602 15 7.792 15 9c0 1.208-.397 2.398-1.168 3.555a1 1 0 1 1-1.664-1.11C12.73 10.602 13 9.792 13 9c0-.792-.27-1.602-.832-2.445zM3.586 5l4-4A2 2 0 0 1 11 2.414v13.172A2 2 0 0 1 7.586 17l-4-4H2a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h1.586zm1.121 1.707A1 1 0 0 1 4 7H2v4h2a1 1 0 0 1 .707.293L9 15.586V2.414L4.707 6.707z"></path>
                                    <path d="M0 0h18v18H0z"></path>
                                </g>
                            </svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                <g fill="none" fillRule="evenodd">
                                    <path fill="#ffffff" fillRule="nonzero" d="M16.834 14.006l-1.502-1.502C15.778 11.45 16 10.284 16 9c0-2.099-.593-3.879-1.783-5.378a1 1 0 1 1 1.566-1.244C17.26 4.24 18 6.46 18 9c0 1.842-.389 3.516-1.166 5.006zm-2.439-2.439l-1.544-1.544c.1-.345.149-.686.149-1.023 0-.792-.27-1.602-.832-2.445a1 1 0 1 1 1.664-1.11C14.603 6.602 15 7.792 15 9c0 .867-.204 1.724-.605 2.567zM5.707 2.879L7.586 1A2 2 0 0 1 11 2.414v5.758l-2-2V2.414L7.121 4.293 5.707 2.879zM11 13.829v1.757A2 2 0 0 1 7.586 17l-4-4H2a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h.172l1.987 1.987A1 1 0 0 1 4 7H2v4h2a1 1 0 0 1 .707.293L9 15.586v-3.758l2 2zM.293 1.706A1 1 0 1 1 1.707.293l16 16a1 1 0 0 1-1.414 1.414l-16-16z"></path>
                                    <path d="M0 0h18v18H0z"></path>
                                </g>
                            </svg>
                        }
                    </div>
                    <a className="burger">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><g fill="none" fillRule="evenodd"><path fill="currentColor" fillRule="nonzero" d="M1 2a1 1 0 1 1 0-2h16a1 1 0 0 1 0 2H1zm0 5a1 1 0 1 1 0-2h13.09a1 1 0 0 1 0 2H1zm0 5a1 1 0 0 1 0-2h16a1 1 0 0 1 0 2H1zm0 5a1 1 0 0 1 0-2h8.182a1 1 0 0 1 0 2H1z"></path><path d="M0 0h18v18H0z"></path></g></svg>
                    </a>
                    <div className="office">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><g fill="none" fillRule="evenodd"><path fill="currentColor" fillRule="nonzero" d="M9 10A5 5 0 1 1 9 0a5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3.5 18C2.041 18 1 16.965 1 15.5 1 12.824 4.777 11 9 11c4.193 0 8 1.853 8 4.5 0 1.427-1.053 2.5-2.5 2.5h-11zm0-2h11c.334 0 .5-.17.5-.5 0-1.15-2.773-2.5-6-2.5-3.256 0-6 1.325-6 2.5 0 .358.143.5.5.5z"></path><path d="M0 0h18v18H0z"></path></g></svg>
                    </div>
                </div>
            </div>
        )
    }
}
