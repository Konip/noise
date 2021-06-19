import React, { Component } from 'react'
import './NavBar.css'
import sound from '../../assets/sound.svg'
import sound1 from '../../assets/sound1.svg'

export class NavBar extends Component {
    render() {
        return (
            <div className='nav'>
                <div className="logo">
                    <p>Noise</p>
                </div>
                <div className="rightSection">
                    <div className="sound">
                        <img src={sound} alt="" />
                    </div>
                    <div className="sound1">
                        <img src={sound1} alt="" />
                    </div>
                    <a className="burger">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><g fill="none" fill-rule="evenodd"><path fill="currentColor" fill-rule="nonzero" d="M1 2a1 1 0 1 1 0-2h16a1 1 0 0 1 0 2H1zm0 5a1 1 0 1 1 0-2h13.09a1 1 0 0 1 0 2H1zm0 5a1 1 0 0 1 0-2h16a1 1 0 0 1 0 2H1zm0 5a1 1 0 0 1 0-2h8.182a1 1 0 0 1 0 2H1z"></path><path d="M0 0h18v18H0z"></path></g></svg>
                    </a>
                    <div className="office">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><g fill="none" fill-rule="evenodd"><path fill="currentColor" fill-rule="nonzero" d="M9 10A5 5 0 1 1 9 0a5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3.5 18C2.041 18 1 16.965 1 15.5 1 12.824 4.777 11 9 11c4.193 0 8 1.853 8 4.5 0 1.427-1.053 2.5-2.5 2.5h-11zm0-2h11c.334 0 .5-.17.5-.5 0-1.15-2.773-2.5-6-2.5-3.256 0-6 1.325-6 2.5 0 .358.143.5.5.5z"></path><path d="M0 0h18v18H0z"></path></g></svg>
                    </div>
                </div>
            </div>
        )
    }
}
