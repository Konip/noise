import React, { Component } from 'react'
// import rain from '../../assets/rain.svg'
// import thunderstorm from '../../assets/thunderstorm.svg'
// import wind from '../../assets/wind.svg'
// import forest from '../../assets/forest.svg'
import rain from '../../assets/music/rain.mp3'
import thunderstorm from '../../assets/music/thunderstorm.mp3'
import wind from '../../assets/music/wind.mp3'
import './Body.css'

export class Body extends Component {
    constructor() {
        super()
        this.state = {
            rain: false,
            rainVolume: 1,
            thunderstorm: false,
            thunderstormVolume: 1,
            wind: false,
            windVolume: 1,
        }
        this.ref = React.createRef()
        this.change = this.change.bind(this)
    }
    change(e) {
        // console.log(e.target.value);
        let key = e.target.parentNode.dataset.key
        let audio = document.getElementById(`${key}`)
        audio.volume = e.target.value
        console.log(key,audio.volume );
        // this.setState()
        // let key = this.ref.current.parentNode.dataset.key
        // this.setState({[key]:e.target.value},()=>{

        // })
        // let audio = document.getElementById(`${e.target.parentNode.dataset.key}`)

        // audio.volume = e.target.value

        // console.log('this.ref.current.value ', this.ref);
        // let audio = document.getElementById(`${this.ref.current.parentNode.dataset.key}`)
        // // console.log(audio);
        // audio.volume = this.ref.current.value
        // console.log('audio.volume ', audio.volume);

    }
    onClick(e) {
        // console.log(e);

        let key = e.target.parentNode.dataset.key
        // console.log(e.target.localName);
        // console.log('key', key)

        let input = e.target.parentNode.lastElementChild.id
        // console.log(input);

        if (e.target.localName === 'svg') {

            this.setState({ [key]: !this.state[key] }, () => {
                // console.log(input);
                if (this.state[key] === true) {
                    console.log(document.getElementById(`${key}`));
                    document.getElementById(`${key}`).currentTime = 0
                    document.getElementById(`${key}`).play()
                    document.getElementById(`${input}`).style.visibility = 'visible';
                    // console.log(document.getElementById(`${input}`));
                    // alert('true')
                }
                else {
                    document.getElementById(`${key}`).pause()
                    document.getElementById(`${input}`).style.visibility = 'hidden';
                    // alert('false')
                }
            })
        }
    }
    render() {
        return (
            <div className='body'>
                {console.log('render')}
                <div className="container">
                    <div data-key="rain" className={this.state.rain ? "card rain active" : "card rain"} onClick={(e) => this.onClick(e)}>
                        {/* <div className="screen"></div> */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56">
                            <title>Rain</title>
                            <g fill="none" fillRule="evenodd">
                                <path fill="currentColor" fillRule="nonzero" d="M15.676 11.446l-.518.745-.9-.113A10.113 10.113 0 0 0 13 12C7.477 12 3 16.477 3 22s4.477 10 10 10a9.965 9.965 0 0 0 3.814-.753l.841-.347.697.586A14.931 14.931 0 0 0 28 35c3.581 0 6.964-1.257 9.648-3.514l.697-.586.841.347A9.965 9.965 0 0 0 43 32c5.523 0 10-4.477 10-10s-4.477-10-10-10c-.424 0-.843.026-1.258.078l-.9.113-.518-.745A14.979 14.979 0 0 0 28 5a14.979 14.979 0 0 0-12.324 6.446zM28 2c5.666 0 10.89 2.639 14.265 7.02.244-.013.49-.02.735-.02 7.18 0 13 5.82 13 13s-5.82 13-13 13c-1.414 0-2.8-.227-4.113-.664A17.926 17.926 0 0 1 28 38a17.926 17.926 0 0 1-10.887-3.664A12.988 12.988 0 0 1 13 35C5.82 35 0 29.18 0 22S5.82 9 13 9c.246 0 .491.007.735.02A17.972 17.972 0 0 1 28 2zM12.02 38.253a1.5 1.5 0 1 1 2.96.494l-1 6a1.5 1.5 0 1 1-2.96-.494l1-6zm13 9a1.5 1.5 0 1 1 2.96.494l-1 6a1.5 1.5 0 1 1-2.96-.494l1-6zm14-6a1.5 1.5 0 1 1 2.96.494l-1 6a1.5 1.5 0 1 1-2.96-.494l1-6z"></path>
                                <path d="M0 0h56v56H0z"></path>
                            </g>
                        </svg>
                        <audio id='rain' src={rain} loop ></audio>
                        <input id='input-rain' style={{ visibility: 'hidden' }} type="range" min='0' max='1' step='0.01'  onChange={(e)=>this.change(e)} ></input>
                        {/* <input id='input-rain' style={{ visibility: 'hidden' }} type="range" min='0' max='1' step='0.01' ref={this.ref} onChange={this.change} ></input> */}
                    </div>

                    <div data-key="thunderstorm" className={this.state.thunderstorm ? "card  thunderstorm active" : "card  thunderstorm"} onClick={(e) => this.onClick(e)}>
                        {/* <div id='div-rain' className="screen"></div> */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56">
                            <title>Thunderstorm</title>
                            <g fill="none" fillRule="evenodd">
                                <path fill="currentColor" fillRule="nonzero" d="M15.676 11.446l-.518.745-.9-.113A10.113 10.113 0 0 0 13 12C7.477 12 3 16.477 3 22s4.477 10 10 10a9.965 9.965 0 0 0 3.814-.753l.841-.347.697.586A14.931 14.931 0 0 0 28 35c3.581 0 6.964-1.257 9.648-3.514l.697-.586.841.347A9.965 9.965 0 0 0 43 32c5.523 0 10-4.477 10-10s-4.477-10-10-10c-.424 0-.843.026-1.258.078l-.9.113-.518-.745A14.979 14.979 0 0 0 28 5a14.979 14.979 0 0 0-12.324 6.446zM28 2c5.666 0 10.89 2.639 14.265 7.02.244-.013.49-.02.735-.02 7.18 0 13 5.82 13 13s-5.82 13-13 13c-1.414 0-2.8-.227-4.113-.664A17.926 17.926 0 0 1 28 38a17.926 17.926 0 0 1-10.887-3.664A12.988 12.988 0 0 1 13 35C5.82 35 0 29.18 0 22S5.82 9 13 9c.246 0 .491.007.735.02A17.972 17.972 0 0 1 28 2z"></path>
                                <path fill="currentColor" fillRule="nonzero" d="M24.6 42.7a1.5 1.5 0 0 1-.271-2.137l4-5a1.5 1.5 0 0 1 2.342 1.874l-3.033 3.792L30.4 43.3a1.5 1.5 0 0 1 .32 2.072l-5 7a1.5 1.5 0 1 1-2.44-1.744l4.148-5.807L24.6 42.7z"></path>
                                <path d="M0 0h56v56H0z"></path>
                            </g>
                        </svg>
                        <audio id='thunderstorm' src={thunderstorm} loop ></audio>
                        <input id='input-thunderstorm' style={{ visibility: 'hidden' }} type="range" min='0' max='1' step='0.01' onChange={(e) => this.change(e)} ></input>
                        {/* <input id='input-thunderstorm' style={{ visibility: 'hidden' }} type="range" min='0' max='1' step='0.01' ref={this.ref} onChange={this.change} ></input> */}
                    </div>

                    <div data-key="wind" className={this.state.wind ? "card  wind active" : "card  wind"} onClick={(e) => this.onClick(e)}>
                        {/* <div className="screen"></div> */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56">
                            <title>Wind</title>
                            <g fill="none" fillRule="evenodd">
                                <path fill="currentColor" fillRule="nonzero" d="M1.5 23a1.5 1.5 0 0 1 0-3H27a5 5 0 0 0 0-10c-2.903 0-5 1.874-5 4.5a1.5 1.5 0 0 1-3 0c0-4.363 3.51-7.5 8-7.5a8 8 0 1 1 0 16H1.5zM26 42.5a1.5 1.5 0 0 1 3 0c0 2.626 2.097 4.5 5 4.5a5 5 0 0 0 0-10H1.5a1.5 1.5 0 0 1 0-3H34a8 8 0 1 1 0 16c-4.49 0-8-3.137-8-7.5z"></path>
                                <path fill="currentColor" fillRule="nonzero" d="M1.5 30a1.5 1.5 0 0 1 0-3H48a5 5 0 0 0 0-10c-2.903 0-5 1.874-5 4.5a1.5 1.5 0 0 1-3 0c0-4.363 3.51-7.5 8-7.5a8 8 0 1 1 0 16H1.5z"></path>
                                <path d="M0 0h56v56H0z"></path>
                            </g>
                        </svg>
                        <audio id='wind' src={wind} loop></audio>
                        <input id='input-wind' style={{ visibility: 'hidden' }} type="range" min='0' max='1' step='0.01' onChange={(e) => this.change(e)} ></input>
                        {/* <input id='input-wind' style={{ visibility: 'hidden' }} type="range" min='0' max='1' step='0.01' ref={this.ref} onChange={this.change} ></input> */}
                    </div>
                </div>
            </div>
        )
    }
}
