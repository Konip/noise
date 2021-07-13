import React, { Component } from 'react'
import './Body.css'
import _ from 'lodash'

//  https://dl.dropbox.com/s/c1e90i1hyvryo68/rain.mp3?dl=1
// https://dl.dropbox.com/s/alyrhvc8ad5zm7w/wind.mp3?dl=1
// https://dl.dropbox.com/s/fryvk3d3h4ljfzk/summerNight.mp3?dl=1
// https://dl.dropbox.com/s/sfefdovo60ljf6w/water.mp3?dl=1
// https://dl.dropbox.com/s/rvlsihibie42kgk/bonfire.mp3?dl=1
// https://dl.dropbox.com/s/fw9ufylyu2dx75g/seaside.mp3?dl=1
// https://dl.dropbox.com/s/n6knpo892h2ilbc/forest.mp3?dl=1
// https://dl.dropbox.com/s/texuwihp2cgp9i6/thunderstorm_full.mp3?dl=1
// https://dl.dropbox.com/s/kvnb5feyfsdo8gw/leaves.mp3?dl=1
// https://dl.dropbox.com/s/qk7l4jiwuxxkffs/waterStream.mp3?dl=1
// https://dl.dropbox.com/s/omzyp0vg182k8uh/coffeeShop.mp3?dl=1
// https://dl.dropbox.com/s/iwlgf2kiqanouwg/train.mp3?dl=1
// https://dl.dropbox.com/s/li7mfenxq0oqcgn/fan.mp3?dl=1

const obj = {
    'rain': 'https://dl.dropbox.com/s/c1e90i1hyvryo68/rain.mp3?dl=1',
    'thunderstorm': 'https://dl.dropbox.com/s/texuwihp2cgp9i6/thunderstorm_full.mp3?dl=1',
    // 'wind': 'https://dl.dropbox.com/s/alyrhvc8ad5zm7w/wind.mp3?dl=1',
    // 'forest': 'https://dl.dropbox.com/s/n6knpo892h2ilbc/forest.mp3?dl=1',
    // 'leaves': 'https://dl.dropbox.com/s/kvnb5feyfsdo8gw/leaves.mp3?dl=1',
    // 'waterStream': 'https://dl.dropbox.com/s/qk7l4jiwuxxkffs/waterStream.mp3?dl=1',
    // 'seaside': 'https://dl.dropbox.com/s/fw9ufylyu2dx75g/seaside.mp3?dl=1',
    // 'water': 'https://dl.dropbox.com/s/sfefdovo60ljf6w/water.mp3?dl=1',
    // 'bonfire': 'https://dl.dropbox.com/s/rvlsihibie42kgk/bonfire.mp3?dl=1',
    // 'summerNight': 'https://dl.dropbox.com/s/fryvk3d3h4ljfzk/summerNight.mp3?dl=1',
    // 'coffeeShop': 'https://dl.dropbox.com/s/omzyp0vg182k8uh/coffeeShop.mp3?dl=1',
    // 'train': 'https://dl.dropbox.com/s/iwlgf2kiqanouwg/train.mp3?dl=1',
    // 'fan': ' https://dl.dropbox.com/s/li7mfenxq0oqcgn/fan.mp3?dl=1',
}

const aCtx = new AudioContext();

export class Body extends Component {
    constructor() {
        super()
        this.state = {
            // rain: false,
            // thunderstorm: false,
            // wind: false,
            // forest: false,
            // leaves: false,
            // waterStream: false,
            // seaside: false,
            // water: false,
            // bonfire: false,
            // summerNight: false,
            // coffeeShop: false,
            // train: false,
            // fan: false,
        }
        this.change = this.change.bind(this)
    }
    componentDidMount() {
        const data = {}
        for (let key in obj) {

            let buf;
            let gainNode = aCtx.createGain()
            let source = aCtx.createBufferSource();

            fetch(obj[key])
                .then(resp => resp.arrayBuffer())
                .then(buf => aCtx.decodeAudioData(buf))
                .then(decoded => {
                    console.log('fetch');
                    source.buffer = buf = decoded;
                    source.loop = true;
                    source.connect(gainNode);
                    gainNode.connect(aCtx.destination);
                    
                    source.start(0)
                    // source.start(0, source.buffer.duration - 5)
                    source.disconnect(gainNode);
                    return data[key] = {
                        active: false,
                        source: source,
                        gainNode: gainNode,
                    }
                });
        }
        this.setState({ data }, () => {
        })
    }

    change(e) {
        let key = e.target.parentNode.dataset.key
        let audio = document.getElementById(`${key}`)
        // audio.volume = e.target.value
        
        this.state.data[key].gainNode.gain.value = e.target.value
    }

    onClick(e) {

        let input
        let key

        if (e.target.localName === 'path') {
            input = e.target.parentNode.parentNode.parentNode.lastElementChild.id
            key = e.target.parentNode.parentNode.parentNode.dataset.key
        }
        else if (e.target.localName === 'svg') {
            input = e.target.parentNode.lastElementChild.id
            key = e.target.parentNode.dataset.key
        }
        else if (e.target.localName === 'input') {
            key = e.target.parentNode.dataset.key
            input = e.target.id
        }
        else {
            key = e.target.dataset.key
            input = e.target.lastElementChild.id
        }
        if (e.target.localName !== 'input') {
            console.log(key);

            this.setState(state => {
                state.data[key].active = !state.data[key].active
                const deep = _.cloneDeep(state)
                return deep

            }, () => {
                console.log(this.state.data[key].active);
                if (this.state.data[key].active === true) {
                    console.log(' start')
                    this.state.data[key].source.connect(this.state.data[key].gainNode);
                    console.log(document.getElementById(`${input}`));
                    document.getElementById(`${input}`).style.visibility = 'visible';
                    document.querySelector(`[data-key=${key}]`).classList.add('active')

                } else if (this.state.data[key].active === false) {
                    console.log(' stop')
                    this.state.data[key].source.disconnect(this.state.data[key].gainNode);
                    document.getElementById(`${input}`).style.visibility = 'hidden';
                    document.querySelector(`[data-key=${key}]`).classList.remove('active')
                }
            })
        }
    }

    render() {
        return (
            <div className='body'>
                {console.log(this.state)}
                <div className="container">
                    
                    <div data-key="rain" className={ "card rain"} onClick={(e) => this.onClick(e)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56">
                            <title>Rain</title>
                            <g fill="none" fillRule="evenodd">
                                <path fill="currentColor" fillRule="nonzero" d="M15.676 11.446l-.518.745-.9-.113A10.113 10.113 0 0 0 13 12C7.477 12 3 16.477 3 22s4.477 10 10 10a9.965 9.965 0 0 0 3.814-.753l.841-.347.697.586A14.931 14.931 0 0 0 28 35c3.581 0 6.964-1.257 9.648-3.514l.697-.586.841.347A9.965 9.965 0 0 0 43 32c5.523 0 10-4.477 10-10s-4.477-10-10-10c-.424 0-.843.026-1.258.078l-.9.113-.518-.745A14.979 14.979 0 0 0 28 5a14.979 14.979 0 0 0-12.324 6.446zM28 2c5.666 0 10.89 2.639 14.265 7.02.244-.013.49-.02.735-.02 7.18 0 13 5.82 13 13s-5.82 13-13 13c-1.414 0-2.8-.227-4.113-.664A17.926 17.926 0 0 1 28 38a17.926 17.926 0 0 1-10.887-3.664A12.988 12.988 0 0 1 13 35C5.82 35 0 29.18 0 22S5.82 9 13 9c.246 0 .491.007.735.02A17.972 17.972 0 0 1 28 2zM12.02 38.253a1.5 1.5 0 1 1 2.96.494l-1 6a1.5 1.5 0 1 1-2.96-.494l1-6zm13 9a1.5 1.5 0 1 1 2.96.494l-1 6a1.5 1.5 0 1 1-2.96-.494l1-6zm14-6a1.5 1.5 0 1 1 2.96.494l-1 6a1.5 1.5 0 1 1-2.96-.494l1-6z"></path>
                                <path d="M0 0h56v56H0z"></path>
                            </g>
                        </svg>
                        {/* <audio id='rain' src={rain} loop ></audio> */}
                        <input id='input-rain'  style={{ visibility: 'hidden' }} type="range" min='0' max='1' step='0.01' onChange={(e) => this.change(e)} ></input>
                    </div>

                    <div data-key="thunderstorm" className={ "card  thunderstorm"} onClick={(e) => this.onClick(e)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56">
                            <title>Thunderstorm</title>
                            <g fill="none" fillRule="evenodd">
                                <path fill="currentColor" fillRule="nonzero" d="M15.676 11.446l-.518.745-.9-.113A10.113 10.113 0 0 0 13 12C7.477 12 3 16.477 3 22s4.477 10 10 10a9.965 9.965 0 0 0 3.814-.753l.841-.347.697.586A14.931 14.931 0 0 0 28 35c3.581 0 6.964-1.257 9.648-3.514l.697-.586.841.347A9.965 9.965 0 0 0 43 32c5.523 0 10-4.477 10-10s-4.477-10-10-10c-.424 0-.843.026-1.258.078l-.9.113-.518-.745A14.979 14.979 0 0 0 28 5a14.979 14.979 0 0 0-12.324 6.446zM28 2c5.666 0 10.89 2.639 14.265 7.02.244-.013.49-.02.735-.02 7.18 0 13 5.82 13 13s-5.82 13-13 13c-1.414 0-2.8-.227-4.113-.664A17.926 17.926 0 0 1 28 38a17.926 17.926 0 0 1-10.887-3.664A12.988 12.988 0 0 1 13 35C5.82 35 0 29.18 0 22S5.82 9 13 9c.246 0 .491.007.735.02A17.972 17.972 0 0 1 28 2z"></path>
                                <path fill="currentColor" fillRule="nonzero" d="M24.6 42.7a1.5 1.5 0 0 1-.271-2.137l4-5a1.5 1.5 0 0 1 2.342 1.874l-3.033 3.792L30.4 43.3a1.5 1.5 0 0 1 .32 2.072l-5 7a1.5 1.5 0 1 1-2.44-1.744l4.148-5.807L24.6 42.7z"></path>
                                <path d="M0 0h56v56H0z"></path>
                            </g>
                        </svg>
                        {/* <audio id='thunderstorm' src={thunderstorm} loop ></audio> */}
                        <input id='input-thunderstorm' style={{ visibility: 'hidden' }} type="range" min='0' max='1' step='0.01' onChange={(e) => this.change(e)} ></input>
                    </div>

                    <div data-key="wind" className={ "card  wind"} onClick={(e) => this.onClick(e)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56">
                            <title>Wind</title>
                            <g fill="none" fillRule="evenodd">
                                <path fill="currentColor" fillRule="nonzero" d="M1.5 23a1.5 1.5 0 0 1 0-3H27a5 5 0 0 0 0-10c-2.903 0-5 1.874-5 4.5a1.5 1.5 0 0 1-3 0c0-4.363 3.51-7.5 8-7.5a8 8 0 1 1 0 16H1.5zM26 42.5a1.5 1.5 0 0 1 3 0c0 2.626 2.097 4.5 5 4.5a5 5 0 0 0 0-10H1.5a1.5 1.5 0 0 1 0-3H34a8 8 0 1 1 0 16c-4.49 0-8-3.137-8-7.5z"></path>
                                <path fill="currentColor" fillRule="nonzero" d="M1.5 30a1.5 1.5 0 0 1 0-3H48a5 5 0 0 0 0-10c-2.903 0-5 1.874-5 4.5a1.5 1.5 0 0 1-3 0c0-4.363 3.51-7.5 8-7.5a8 8 0 1 1 0 16H1.5z"></path>
                                <path d="M0 0h56v56H0z"></path>
                            </g>
                        </svg>
                        {/* <audio id='wind' src={wind} loop></audio> */}
                        <input id='input-wind' style={{ visibility: 'hidden' }} type="range" min='0' max='1' step='0.01' onChange={(e) => this.change(e)} ></input>
                    </div>

                    <div data-key="forest" className={ "card  forest"} onClick={(e) => this.onClick(e)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56">
                            <title>Forest</title>
                            <g fill="none" fillRule="evenodd">
                                <path fill="currentColor" fillRule="nonzero" d="M14 50h2v2a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-5H1a1 1 0 0 1-.868-1.496L3.277 40H2a1 1 0 0 1-.848-1.53L5.196 32H5a1 1 0 0 1-.868-1.496L7.277 25H7a1 1 0 0 1-.878-1.479l6-11a1 1 0 0 1 1.752-.007l3.895 7.011-1.188 1.98-3.573-6.431L8.685 23H9a1 1 0 0 1 .868 1.496L6.723 30H7a1 1 0 0 1 .848 1.53L3.804 38H5a1 1 0 0 1 .868 1.496L2.723 45H10c.294 0 .558.127.74.328l-.516 1.137A2.499 2.499 0 0 0 11 49.502V51h3v-1zm24.23-30.475l3.896-7.01a1 1 0 0 1 1.752.006l6 11A1 1 0 0 1 49 25h-.277l3.145 5.504A1 1 0 0 1 51 32h-.196l4.044 6.47A1 1 0 0 1 54 40h-1.277l3.145 5.504A1 1 0 0 1 55 47h-8v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-2h2v1h3v-1.498a2.499 2.499 0 0 0 .776-3.037l-.517-1.137A.997.997 0 0 1 46 45h7.277l-3.145-5.504A1 1 0 0 1 51 38h1.196l-4.044-6.47A1 1 0 0 1 49 30h.277l-3.145-5.504A1 1 0 0 1 47 23h.315l-4.323-7.926-3.573 6.431-1.188-1.98z"></path>
                                <path fill="currentColor" fillRule="nonzero" d="M33 49v5.5a1.5 1.5 0 0 1-1.5 1.5h-7a1.5 1.5 0 0 1-1.5-1.5V49H12.5a1.5 1.5 0 0 1-1.366-2.12L15.17 38H13.5a1.5 1.5 0 0 1-1.286-2.272L16.85 28H16.5a1.5 1.5 0 0 1-1.286-2.272L19.85 18H19.5a1.5 1.5 0 0 1-1.305-2.24l8.5-15a1.5 1.5 0 0 1 2.61 0l8.5 15A1.5 1.5 0 0 1 36.5 18h-.35l4.636 7.728A1.5 1.5 0 0 1 39.5 28h-.35l4.636 7.728A1.5 1.5 0 0 1 42.5 38h-1.67l4.036 8.88A1.5 1.5 0 0 1 43.5 49H33zm-2.56-2.56c.27-.272.646-.44 1.06-.44h9.67l-4.036-8.88A1.5 1.5 0 0 1 38.5 35h1.35l-4.636-7.728A1.5 1.5 0 0 1 36.5 25h.35l-4.636-7.728A1.5 1.5 0 0 1 33.5 15h.426L28 4.543 22.074 15h.426a1.5 1.5 0 0 1 1.286 2.272L19.15 25h.351a1.5 1.5 0 0 1 1.286 2.272L16.15 35H17.5a1.5 1.5 0 0 1 1.366 2.12L14.83 46h9.67a1.5 1.5 0 0 1 1.5 1.5V53h4v-5.5c0-.414.168-.79.44-1.06z"></path>
                                <path d="M0 0h56v56H0z"></path>
                            </g>
                        </svg>
                        {/* <audio id='forest' src={forest} loop></audio> */}
                        <input id='forest-wind' style={{ visibility: 'hidden' }} type="range" min='0' max='1' step='0.01' onChange={(e) => this.change(e)} ></input>
                    </div>

                    <div data-key="leaves" className={ "card  leaves"} onClick={(e) => this.onClick(e)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56">
                            <title>Leaves</title>
                            <g fill="none" fillRule="evenodd">
                                <path fill="currentColor" fillRule="nonzero" d="M8 16c1.547 0 2.802.197 4.402.621.35.093 1.575.437 1.56.433 2.39.66 4.216.946 7.038.946 4.134 0 7.14-1.718 9.204-5.256a1.5 1.5 0 1 1 2.592 1.511C30.193 18.717 26.199 21 21 21c-3.116 0-5.202-.328-7.836-1.054-.003-.001-1.206-.338-1.532-.425C10.264 19.158 9.256 19 8 19c-1.854 0-3.38.174-4.594.46a9.078 9.078 0 0 0-1.01.293c-.14.05-.214.083-.225.088A1.5 1.5 0 0 1 0 18.5C0 8.818 9.55 0 19.5 0c6.381 0 10.812 1.477 13.192 4.588a1.5 1.5 0 1 1-2.384 1.823C28.61 4.189 25.04 3 19.5 3 11.881 3 4.418 9.28 3.18 16.438 4.53 16.161 6.132 16 8 16z"></path>
                                <path fill="currentColor" fillRule="nonzero" d="M11.066 12.889a1.5 1.5 0 0 1-1.132-2.779c9.349-3.808 19.715-3.808 31.04-.033a1.5 1.5 0 1 1-.948 2.846c-10.675-3.559-20.309-3.559-28.96-.034zm32.36 6.29a58.812 58.812 0 0 1-4.87 3.457c-.616.392-1.209.756-1.97 1.212l-.895.535c-.346.206-.6.36-.845.509-.851.518-1.505.943-2.132 1.394-1.252.9-2.386 1.903-3.612 3.231-2.708 2.934-3.468 7.798-2.13 14.697a1.5 1.5 0 0 1-2.945.571c-1.502-7.745-.596-13.548 2.87-17.303 1.364-1.477 2.65-2.614 4.066-3.632.697-.501 1.41-.965 2.321-1.52.254-.155.516-.312.868-.523l.892-.532c.74-.444 1.312-.794 1.902-1.17a55.821 55.821 0 0 0 4.627-3.285c2.61-2.05 4.2-3.834 4.981-5.325.262-.5.408-.921.468-1.267.03-.178.032-.294.026-.355-.508-1.579 1.755-2.66 2.71-1.19 6.513 10.03 7.906 23.968.963 33.688-5.306 7.428-11.502 10.708-18.455 9.61a1.5 1.5 0 0 1 .468-2.963c5.714.902 10.85-1.817 15.545-8.39 5.47-7.657 5.052-18.547.705-27.262-1.018 1.705-2.805 3.651-5.557 5.813zm3.622-9.306a.285.285 0 0 0-.002-.01l.002.01z"></path>
                                <path fill="currentColor" fillRule="nonzero" d="M45.063 25.069a1.5 1.5 0 0 1 2.874.862C44.809 36.358 35.55 45.959 20.25 54.799A1.5 1.5 0 1 1 18.75 52.2c14.7-8.493 23.441-17.559 26.313-27.132z"></path>
                                <path d="M0 0h56v56H0z"></path>
                            </g>
                        </svg>
                        {/* <audio id='leaves' src={leaves} loop></audio> */}
                        <input id='input-leaves' style={{ visibility: 'hidden' }} type="range" min='0' max='1' step='0.01' onChange={(e) => this.change(e)} ></input>
                    </div>

                    <div data-key="waterStream" className={ "card  waterStream"} onClick={(e) => this.onClick(e)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56">
                            <title>Water stream</title>
                            <g fill="none" fillRule="evenodd">
                                <path fill="currentColor" fillRule="nonzero" d="M5.194 13.83a1.5 1.5 0 0 1-1.388-2.66c8.135-4.244 15.398-4.244 21.559.105 1.637 1.155 3.108 2.433 4.584 3.933 1.16 1.178 4.579 5.046 4.506 4.967C37.658 23.657 40.038 25 44 25c4.028 0 7.213-.91 9.6-2.7a1.5 1.5 0 1 1 1.8 2.4C52.453 26.91 48.638 28 44 28c-4.93 0-8.034-1.751-11.753-5.794.025.027-3.343-3.784-4.436-4.894-1.358-1.379-2.695-2.541-4.176-3.587-5.173-3.65-11.243-3.65-18.441.105z"></path>
                                <path fill="currentColor" fillRule="nonzero" d="M4.194 23.83a1.5 1.5 0 0 1-1.388-2.66c8.135-4.244 15.398-4.244 21.559.105 1.637 1.155 3.108 2.433 4.584 3.933 1.16 1.178 4.579 5.046 4.506 4.967C36.658 33.657 39.038 35 43 35c4.028 0 7.213-.91 9.6-2.7a1.5 1.5 0 1 1 1.8 2.4C51.453 36.91 47.638 38 43 38c-4.93 0-8.034-1.751-11.753-5.794.025.027-3.343-3.784-4.436-4.894-1.358-1.379-2.695-2.541-4.176-3.587-5.173-3.65-11.243-3.65-18.441.105z"></path>
                                <path fill="currentColor" fillRule="nonzero" d="M2.194 33.83a1.5 1.5 0 0 1-1.388-2.66c8.135-4.244 15.398-4.244 21.559.105 1.637 1.155 3.108 2.433 4.584 3.933 1.16 1.178 4.579 5.046 4.506 4.967C34.658 43.657 37.038 45 41 45c4.028 0 7.213-.91 9.6-2.7a1.5 1.5 0 1 1 1.8 2.4C49.453 46.91 45.638 48 41 48c-4.93 0-8.034-1.751-11.753-5.794.025.027-3.343-3.784-4.436-4.894-1.358-1.379-2.695-2.541-4.176-3.587-5.173-3.65-11.243-3.65-18.441.105z"></path>
                                <path d="M0 0h56v56H0z"></path>
                            </g>
                        </svg>
                        {/* <audio id='waterStream src={waterStream} loop></audio> */}
                        <input id='input-waterStream' style={{ visibility: 'hidden' }} type="range" min='0' max='1' step='0.01' onChange={(e) => this.change(e)} ></input>
                    </div>

                    <div data-key="seaside" className={ "card  seaside"} onClick={(e) => this.onClick(e)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56">
                            <title>Seaside</title>
                            <g fill="none" fillRule="evenodd">
                                <path fill="currentColor" fillRule="nonzero" d="M53.264 11.65a1.5 1.5 0 0 1 2.472 1.7C53.604 16.452 50.216 18 45.75 18c-4.467 0-7.854-1.548-9.986-4.65a1.5 1.5 0 0 1 2.472-1.7C39.77 13.882 42.216 15 45.75 15c3.533 0 5.98-1.118 7.514-3.35zm-35.5 0a1.5 1.5 0 0 1 2.472 1.7C18.104 16.452 14.716 18 10.25 18c-4.467 0-7.854-1.548-9.986-4.65a1.5 1.5 0 1 1 2.472-1.7C4.27 13.882 6.716 15 10.25 15c3.533 0 5.98-1.118 7.514-3.35zm.036 1.75a1.5 1.5 0 1 1 2.4-1.8c1.7 2.267 4.25 3.4 7.8 3.4s6.1-1.133 7.8-3.4a1.5 1.5 0 1 1 2.4 1.8C35.9 16.466 32.45 18 28 18c-4.45 0-7.9-1.534-10.2-4.6zm35.464 11.25a1.5 1.5 0 0 1 2.472 1.7C53.604 29.452 50.216 31 45.75 31c-4.467 0-7.854-1.548-9.986-4.65a1.5 1.5 0 0 1 2.472-1.7C39.77 26.882 42.216 28 45.75 28c3.533 0 5.98-1.118 7.514-3.35zm-35.5 0a1.5 1.5 0 0 1 2.472 1.7C18.104 29.452 14.716 31 10.25 31c-4.467 0-7.854-1.548-9.986-4.65a1.5 1.5 0 1 1 2.472-1.7C4.27 26.882 6.716 28 10.25 28c3.533 0 5.98-1.118 7.514-3.35zm.036 1.75a1.5 1.5 0 1 1 2.4-1.8c1.7 2.267 4.25 3.4 7.8 3.4s6.1-1.133 7.8-3.4a1.5 1.5 0 1 1 2.4 1.8C35.9 29.466 32.45 31 28 31c-4.45 0-7.9-1.534-10.2-4.6zm35.464 11.25a1.5 1.5 0 0 1 2.472 1.7C53.604 42.452 50.216 44 45.75 44c-4.467 0-7.854-1.548-9.986-4.65a1.5 1.5 0 0 1 2.472-1.7C39.77 39.882 42.216 41 45.75 41c3.533 0 5.98-1.118 7.514-3.35zm-35.5 0a1.5 1.5 0 0 1 2.472 1.7C18.104 42.452 14.716 44 10.25 44c-4.467 0-7.854-1.548-9.986-4.65a1.5 1.5 0 1 1 2.472-1.7C4.27 39.882 6.716 41 10.25 41c3.533 0 5.98-1.118 7.514-3.35zm.036 1.75a1.5 1.5 0 1 1 2.4-1.8c1.7 2.267 4.25 3.4 7.8 3.4s6.1-1.133 7.8-3.4a1.5 1.5 0 1 1 2.4 1.8C35.9 42.466 32.45 44 28 44c-4.45 0-7.9-1.534-10.2-4.6z"></path>
                                <path d="M0 0h56v56H0z"></path>
                            </g>
                        </svg>
                        {/* <audio id='seaside' src={seaside} loop></audio> */}
                        <input id='input-seaside' style={{ visibility: 'hidden' }} type="range" min='0' max='1' step='0.01' onChange={(e) => this.change(e)} ></input>
                    </div>

                    <div data-key="water" className={"card  water"} onClick={(e) => this.onClick(e)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56">
                            <title>Water</title>
                            <g fill="none" fillRule="evenodd">
                                <path fill="currentColor" fillRule="nonzero" d="M26.723.712a1.489 1.489 0 0 1 .65-.575 1.49 1.49 0 0 1 1.887.548 1.51 1.51 0 0 1 0 1.63c-.429.662-.849 1.316-1.26 1.964-.411-.648-.831-1.302-1.26-1.964A1.5 1.5 0 1 1 29.278.712C40.415 17.93 46 30.458 46 38.5 46 48.088 37.747 56 28 56s-18-7.912-18-17.5c0-8.042 5.585-20.57 16.723-37.788zM13 38.5C13 46.402 19.883 53 28 53s15-6.598 15-14.5c0-7-4.99-18.467-15-34.221C17.99 20.033 13 31.5 13 38.5z"></path>
                                <path fill="currentColor" fillRule="nonzero" d="M17 37.5a1.5 1.5 0 0 1 3 0c0 4.633 3.911 8.5 8.5 8.5a1.5 1.5 0 0 1 0 3C22.262 49 17 43.798 17 37.5z"></path>
                                <path d="M0 0h56v56H0z"></path>
                            </g>
                        </svg>
                        {/* <audio id='water' src={water} loop></audio> */}
                        <input id='input-water' style={{ visibility: 'hidden' }} type="range" min='0' max='1' step='0.01' onChange={(e) => this.change(e)} ></input>
                    </div>

                    <div data-key="bonfire" className={ "card  bonfire"} onClick={(e) => this.onClick(e)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56">
                            <title>Bonfire</title>
                            <g fill="none" fillRule="evenodd">
                                <path fill="currentColor" fillRule="nonzero" d="M13.69 28.026C12.564 30.599 12 33.585 12 37c0 8.837 7.163 16 16 16s16-7.163 16-16c0-2.65-1.061-5.295-4.043-7.863-1.558-1.343-2.56-2.577-3.161-3.903a7.859 7.859 0 0 1-.517-1.475c-.315 1.388-.422 3.265-.282 5.653.092 1.563-1.97 2.204-2.78.864-2.673-4.418-3.15-8.47-1.316-12.41 1.848-3.97 2.21-7.559 1.092-10.85-.717 3.747-2.933 7-6.606 9.694-4.621 3.388-7.076 8.299-7.389 14.861-.062 1.301-1.638 1.91-2.559.99-1.389-1.39-2.308-2.91-2.75-4.535zm2.85-.966c1.104-5.357 3.799-9.635 8.073-12.77 4.55-3.336 6.308-7.439 5.41-12.53C29.756.25 31.66-.64 32.648.536c4.538 5.398 5.19 11.69 1.972 18.598a8.712 8.712 0 0 0-.693 2.156c.651-1.528 1.634-2.59 2.982-3.168A1.5 1.5 0 0 1 39 19.5v.255c-.002 2.451.083 3.259.528 4.24.402.887 1.135 1.79 2.387 2.868C45.603 30.04 47 33.524 47 37c0 10.493-8.507 19-19 19S9 47.493 9 37c0-6.341 1.783-11.527 5.366-15.482a1.494 1.494 0 0 1 .778-.475 1.508 1.508 0 0 1 1.365.347 1.511 1.511 0 0 1 .448.754 1.491 1.491 0 0 1-.06.906c-.53 1.446-.651 2.771-.358 4.01z"></path>
                                <path d="M0 0h56v56H0z"></path>
                            </g>
                        </svg>
                        {/* <audio id='bonfire' src={bonfire} loop></audio> */}
                        <input id='input-bonfire' style={{ visibility: 'hidden' }} type="range" min='0' max='1' step='0.01' onChange={(e) => this.change(e)} ></input>
                    </div>

                    <div data-key="summerNight" className={ "card  summer-night"} onClick={(e) => this.onClick(e)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56">
                            <title>Summer night</title>
                            <g fill="none" fillRule="evenodd">
                                <path fill="currentColor" fillRule="nonzero" d="M5 28c0 13.807 11.193 25 25 25 5.831 0 11.434-2.192 15.91-5.972-.957.108-1.924.163-2.898.163C28.872 47.191 17.5 36.028 17.5 22a25.456 25.456 0 0 1 8.06-18.607C13.871 5.488 5 15.708 5 28zM31.288 2.785A22.482 22.482 0 0 0 20.5 22c0 12.359 10.017 22.191 22.512 22.191 2.414 0 4.775-.38 7.02-1.116 1.427-.468 2.58 1.217 1.627 2.377C46.275 52.007 38.37 56 30 56 14.536 56 2 43.464 2 28S14.536 0 30 0c.178 0 .356.002.534.005 1.5.028 2.034 1.998.754 2.78z"></path>
                                <path d="M0 0h56v56H0z"></path>
                            </g>
                        </svg>
                        {/* <audio id='summerNight' src={summerNight} loop></audio> */}
                        <input id='input-summerNight' style={{ visibility: 'hidden' }} type="range" min='0' max='1' step='0.01' onChange={(e) => this.change(e)} ></input>
                    </div>

                    <div data-key="coffeeShop" className={ "card  coffee-shop"} onClick={(e) => this.onClick(e)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56">
                            <title>Coffee shop</title>
                            <g fill="none" fillRule="evenodd">
                                <path fill="currentColor" fillRule="nonzero" d="M6 29.5A1.5 1.5 0 0 1 7.5 28H44a1.5 1.5 0 0 1 1.5 1.5c0 16.404-6.362 26.5-20 26.5C11.935 56 6 46.153 6 29.5zM9.017 31C9.34 45.255 14.38 53 25.5 53c11.221 0 16.627-7.975 16.981-22H9.017z"></path>
                                <path fill="currentColor" fillRule="nonzero" d="M41.008 45.202l1.498-2.6A3 3 0 1 0 44 37v-3a6 6 0 1 1-2.992 11.202zM35.748 22.668a1.5 1.5 0 1 1-2.496 1.664C32.428 23.096 32 21.812 32 20.5c0-.82.14-1.453.558-2.912.333-1.166.442-1.657.442-2.088 0-.688-.238-1.404-.748-2.168a1.5 1.5 0 1 1 2.496-1.664C35.572 12.904 36 14.188 36 15.5c0 .82-.14 1.453-.558 2.912C35.11 19.578 35 20.07 35 20.5c0 .688.238 1.404.748 2.168zM25.107 2.057A1.5 1.5 0 1 1 27.893.943C28.629 2.783 29 4.639 29 6.5c0 1.213-.253 2.5-1.04 5.844-.713 3.031-.96 4.286-.96 5.156 0 1.367.587 3.13 1.802 5.256a1.5 1.5 0 1 1-2.604 1.488C24.746 21.704 24 19.466 24 17.5c0-1.213.253-2.5 1.04-5.844.713-3.031.96-4.286.96-5.156 0-1.472-.296-2.95-.893-4.443zm-7.855 11.275a1.5 1.5 0 1 1 2.496-1.664C20.572 12.904 21 14.188 21 15.5c0 .82-.14 1.453-.558 2.912C20.11 19.578 20 20.07 20 20.5c0 .688.238 1.404.748 2.168a1.5 1.5 0 1 1-2.496 1.664C17.428 23.096 17 21.812 17 20.5c0-.82.14-1.453.558-2.912.333-1.166.442-1.657.442-2.088 0-.688-.238-1.404-.748-2.168z"></path>
                                <path d="M0 0h56v56H0z"></path>
                            </g>
                        </svg>
                        {/* <audio id='coffeeShop src={coffeeShop} loop></audio> */}
                        <input id='input-coffeeShop' style={{ visibility: 'hidden' }} type="range" min='0' max='1' step='0.01' onChange={(e) => this.change(e)} ></input>
                    </div>

                    <div data-key="train" className={"card  train"} onClick={(e) => this.onClick(e)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56">
                            <title>Train</title>
                            <g fill="none" fillRule="evenodd">
                                <path fill="currentColor" fillRule="nonzero" d="M15 1.5a1.5 1.5 0 0 1 3 0v53a1.5 1.5 0 0 1-3 0v-53zM37 47v3H19v-3h18zm5 0h2.5a1.5 1.5 0 0 1 0 3H42v-3zm-5-10v3H19v-3h18zm5 0h2.5a1.5 1.5 0 0 1 0 3H42v-3zm-5-10v3H19v-3h18zm5 0h2.5a1.5 1.5 0 0 1 0 3H42v-3zm-5-10v3H19v-3h18zm5 0h2.5a1.5 1.5 0 0 1 0 3H42v-3zM37 7v3H19V7h18zm5 0h2.5a1.5 1.5 0 0 1 0 3H42V7zM14 47v3h-2.5a1.5 1.5 0 0 1 0-3H14zm0-10v3h-2.5a1.5 1.5 0 0 1 0-3H14zm0-10v3h-2.5a1.5 1.5 0 0 1 0-3H14zm0-10v3h-2.5a1.5 1.5 0 0 1 0-3H14zm0-10v3h-2.5a1.5 1.5 0 0 1 0-3H14zm24-5.5a1.5 1.5 0 0 1 3 0v53a1.5 1.5 0 0 1-3 0v-53z"></path>
                                <path d="M0 0h56v56H0z"></path>
                            </g>
                        </svg>
                        {/* <audio id='train' src={train} loop></audio> */}
                        <input id='input-train' style={{ visibility: 'hidden' }} type="range" min='0' max='1' step='0.01' onChange={(e) => this.change(e)} ></input>
                    </div>

                    <div data-key="fan" className={ "card  fan"} onClick={(e) => this.onClick(e)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56">
                            <title>Fan</title>
                            <g fill="none" fillRule="evenodd">
                                <path fill="currentColor" fillRule="nonzero" d="M24.5 39a9.5 9.5 0 1 1 0-19 9.5 9.5 0 0 1 0 19zm0-3a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13z"></path>
                                <path fill="currentColor" fillRule="nonzero" d="M29.807 22.403a1.5 1.5 0 0 1-2.9-.768c.39-1.476.593-3.036.593-4.635 0-8.371-4.067-14-10.5-14-4.993 0-9 3.001-9 7 0 2.912.943 4.104 4.007 5.88l1.248.714c.516.299.934.549 1.34.808.465.296.895.59 1.305.898 2.359 1.77 3.702 3.627 4.094 5.594a1.5 1.5 0 1 1-2.943.586c-.232-1.165-1.14-2.421-2.951-3.78-.345-.259-.712-.51-1.116-.767a32.643 32.643 0 0 0-1.23-.74c-.184-.107-1.024-.586-1.25-.718C6.607 16.22 5 14.185 5 10 5 4.125 10.507 0 17 0c8.339 0 13.5 7.143 13.5 17 0 1.857-.236 3.676-.693 5.403zM16.79 30.972zm-.784.155c-.283.057-.517.106-.737.155-1.076.24-1.884.502-2.711.905C7.2 34.8 3.928 39.581 3.999 44.48c.027 1.844.256 3.15.848 4.364 1.44 2.952 3.745 4.25 7.01 4.158a6.824 6.824 0 0 0 2.738-.668c2.68-1.307 3.384-2.615 3.7-5.872.024-.254.144-1.643.186-2.063a24.73 24.73 0 0 1 .317-2.272l.013-.083c.598-3.111 1.268-4.586 2.78-5.736a1.5 1.5 0 1 1 1.817 2.387c-.787.599-1.18 1.462-1.637 3.833l-.014.082a23.004 23.004 0 0 0-.291 2.088c-.04.393-.159 1.777-.185 2.054-.408 4.2-1.616 6.447-5.37 8.278a9.82 9.82 0 0 1-3.969.97c-4.407.125-7.818-1.795-9.791-5.841-.818-1.677-1.12-3.39-1.152-5.636C.911 38.4 4.89 32.59 11.243 29.491c1.062-.518 2.085-.85 3.373-1.137.244-.055.497-.108.8-.168.186-.038.989-.196.793-.157a1.5 1.5 0 0 1 .592 2.94l-.795.158zM27.39 37.507a1.5 1.5 0 1 1 2.223-2.014c.981 1.084 1.83 1.791 3.229 2.7 7.02 4.56 13.956 4.214 17.46-1.181 1.13-1.74 1.724-3.68 1.7-5.491-.032-2.29-1.033-4.211-2.941-5.45-2.502-1.625-3.984-1.554-6.939-.147-.23.11-1.483.723-1.864.903-.794.375-1.48.67-2.199.933-2.7.99-3.815 1.24-5.558 1.24a1.5 1.5 0 0 1 0-3c1.335 0 2.128-.178 4.546-1.064a22.986 22.986 0 0 0 1.93-.822c.357-.169 1.604-.779 1.856-.899 3.809-1.813 6.358-1.936 9.861.34 2.772 1.8 4.262 4.66 4.307 7.925.033 2.423-.739 4.941-2.183 7.166-4.542 6.993-13.343 7.431-21.61 2.063-1.61-1.045-2.656-1.918-3.819-3.202z"></path>
                                <path d="M0 0h56v56H0z"></path>
                            </g>
                        </svg>
                        {/* <audio id='fan' loop></audio> */}
                        <input id='input-fan' style={{ visibility: 'hidden' }} type="range" min='0' max='1' step='0.1' onChange={(e) => this.change(e)} ></input>
                    </div>

                    {/* <div data-key="wind" className={ "card  wind"} onClick={(e) => this.onClick(e)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56">
                            <title>Forest</title>
                            <g fill="none" fillRule="evenodd">
                                <path fill="currentColor" fillRule="nonzero" d="M14 50h2v2a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-5H1a1 1 0 0 1-.868-1.496L3.277 40H2a1 1 0 0 1-.848-1.53L5.196 32H5a1 1 0 0 1-.868-1.496L7.277 25H7a1 1 0 0 1-.878-1.479l6-11a1 1 0 0 1 1.752-.007l3.895 7.011-1.188 1.98-3.573-6.431L8.685 23H9a1 1 0 0 1 .868 1.496L6.723 30H7a1 1 0 0 1 .848 1.53L3.804 38H5a1 1 0 0 1 .868 1.496L2.723 45H10c.294 0 .558.127.74.328l-.516 1.137A2.499 2.499 0 0 0 11 49.502V51h3v-1zm24.23-30.475l3.896-7.01a1 1 0 0 1 1.752.006l6 11A1 1 0 0 1 49 25h-.277l3.145 5.504A1 1 0 0 1 51 32h-.196l4.044 6.47A1 1 0 0 1 54 40h-1.277l3.145 5.504A1 1 0 0 1 55 47h-8v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-2h2v1h3v-1.498a2.499 2.499 0 0 0 .776-3.037l-.517-1.137A.997.997 0 0 1 46 45h7.277l-3.145-5.504A1 1 0 0 1 51 38h1.196l-4.044-6.47A1 1 0 0 1 49 30h.277l-3.145-5.504A1 1 0 0 1 47 23h.315l-4.323-7.926-3.573 6.431-1.188-1.98z"></path>
                                <path fill="currentColor" fillRule="nonzero" d="M33 49v5.5a1.5 1.5 0 0 1-1.5 1.5h-7a1.5 1.5 0 0 1-1.5-1.5V49H12.5a1.5 1.5 0 0 1-1.366-2.12L15.17 38H13.5a1.5 1.5 0 0 1-1.286-2.272L16.85 28H16.5a1.5 1.5 0 0 1-1.286-2.272L19.85 18H19.5a1.5 1.5 0 0 1-1.305-2.24l8.5-15a1.5 1.5 0 0 1 2.61 0l8.5 15A1.5 1.5 0 0 1 36.5 18h-.35l4.636 7.728A1.5 1.5 0 0 1 39.5 28h-.35l4.636 7.728A1.5 1.5 0 0 1 42.5 38h-1.67l4.036 8.88A1.5 1.5 0 0 1 43.5 49H33zm-2.56-2.56c.27-.272.646-.44 1.06-.44h9.67l-4.036-8.88A1.5 1.5 0 0 1 38.5 35h1.35l-4.636-7.728A1.5 1.5 0 0 1 36.5 25h.35l-4.636-7.728A1.5 1.5 0 0 1 33.5 15h.426L28 4.543 22.074 15h.426a1.5 1.5 0 0 1 1.286 2.272L19.15 25h.351a1.5 1.5 0 0 1 1.286 2.272L16.15 35H17.5a1.5 1.5 0 0 1 1.366 2.12L14.83 46h9.67a1.5 1.5 0 0 1 1.5 1.5V53h4v-5.5c0-.414.168-.79.44-1.06z"></path>
                                <path d="M0 0h56v56H0z"></path>
                            </g>
                        </svg>
                        <audio id='wind' src={wind} loop></audio>
                        <input id='input-wind' style={{ visibility: 'hidden' }} type="range" min='0' max='1' step='0.01' onChange={(e) => this.change(e)} ></input>
                    </div> */}

                </div>
            </div>
        )
    }
}
