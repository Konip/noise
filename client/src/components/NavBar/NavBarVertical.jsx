import { observer } from "mobx-react";
import React, { Component } from 'react';
import { Context } from "../../Context";
import Menu from "./Menu";
import './NavBarVertical.css';


export const NavBarVertical = observer(
    class NavBarVertical extends Component {

        static contextType = Context

        constructor() {
            super()
            this.state = {
                dropdown: false,
                playList: false
            }

            this.setEmail = this.setEmail.bind(this)
            this.setPassword = this.setPassword.bind(this)
            this.logout = this.logout.bind(this)
            this.setDropdown = this.setDropdown.bind(this)
            this.openPlayList = this.openPlayList.bind(this)
        }

        componentDidMount() {
            this.context.checkAuth()
        }

        setEmail(email) {
            this.setState({ email: email })
        }

        setPassword(password) {
            this.setState({ password: password })
        }

        logout() {
            const { email, password } = this.state;
            this.context.logout(email, password)
            this.props.setPage('body')
        }

        setDropdown(e) {
            this.setState({
                dropdown: e,
                playList: false
            })
        }

        openPlayList(e) {
            this.setState({
                dropdown: false,
                playList: e
            })
        }

        render() {
            const { dropdown, playList } = this.state;
            const store = this.context;

            return (
                <div className='nav-vertical' onClick={() => this.setDropdown(false)}>
                    {store.isAuth ?
                        <Menu setPage={this.props.setPage} logout={this.logout} setDropdown={this.setDropdown} dropdown={dropdown}
                            playList={playList} openPlayList={this.openPlayList}
                        />
                        :
                        <div className="buttons">
                            <button className="btn" onClick={() => this.props.openModal(true, "Sign up")} >
                                Sign up
                            </button>
                            <button className="btn" onClick={() => this.props.openModal(true, "Log In")}>
                                Log In
                            </button>
                        </div>
                    }
                </div>
            )
        }
    }
)