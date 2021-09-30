import _ from 'lodash';
import React, { Component } from 'react';
import bonfire from '../../assets/music/bonfire_128.txt';
import coffeeShop from '../../assets/music/coffeeShop_128.txt';
import fan from '../../assets/music/fan_128.txt';
import forest from '../../assets/music/forest_128.txt';
import leaves from '../../assets/music/leaves_128.txt';
import rain from '../../assets/music/rain_128.txt';
import seaside from '../../assets/music/seaside_128.txt';
import summerNight from '../../assets/music/summerNight_128.txt';
import thunderstorm from '../../assets/music/thunderstorm_128.txt';
import train from '../../assets/music/train_128.txt';
import waterStream from '../../assets/music/waterStream_128.txt';
import water from '../../assets/music/water_128.txt';
import wind from '../../assets/music/wind_128.txt';
import { Context } from "../../Context";
import { randomNumber } from '../../utils/randomNumber.js';
import { randomPlalist } from '../../utils/randomPlaylist';
import PlayList from '../PlayList/PlayList';
import './Body.css';

const obj = {
    'rain': rain,
    'thunderstorm': thunderstorm,
    'wind': wind,
    'forest': forest,
    'leaves': leaves,
    'waterStream': waterStream,
    'seaside': seaside,
    'water': water,
    'bonfire': bonfire,
    'summerNight': summerNight,
    'coffeeShop': coffeeShop,
    'train': train,
    'fan': fan,

    // 'rain': 'https://dl.dropbox.com/s/qkd6429kifawls9/rain_128.mp3?dl=1',
    // 'thunderstorm': 'https://dl.dropbox.com/s/0teabn2n9wz8kf1/thunderstorm_128.mp3?dl=1',
    // 'wind': 'https://dl.dropbox.com/s/mcimqq0wjrr6k6l/wind_128.mp3?dl=1',
    // 'forest': 'https://dl.dropbox.com/s/ys9x65uqyztu8tp/forest_128.mp3?dl=1',
    // 'leaves': 'https://dl.dropbox.com/s/w9j7bbvofc2lpjk/leaves_128.mp3?dl=1',
    // 'waterStream': 'https://dl.dropbox.com/s/kp0gx0fju792d5a/waterStream_128.mp3?dl=1',
    // 'seaside': 'https://dl.dropbox.com/s/2n2vjgyzcpbwp5v/seaside_128.mp3?dl=1',
    // 'water': 'https://dl.dropbox.com/s/z896skrs5j0njq2/water_128.mp3?dl=1',
    // 'bonfire': 'https://dl.dropbox.com/s/h9vf3ugy8r6mx2o/bonfire_128.mp3?dl=1',
    // 'summerNight': 'https://dl.dropbox.com/s/751vndcd009bung/summerNigh_128t.mp3?dl=1',
    // 'coffeeShop': 'https://dl.dropbox.com/s/uh7h19gk1b3yfuy/coffeeShop_128.mp3?dl=1',
    // 'train': 'https://dl.dropbox.com/s/j5jsu7e42vmljns/train_128.mp3?dl=1',
    // 'fan': 'https://dl.dropbox.com/s/z3zb04gd0x6lwem/fan_128.mp3?dl=1'
}

const playList = {
    "Productivity": {
        1: {
            "forest": 0.6,
            "leaves": 0.75,
            "waterStream": 0.7
        },
        2: {
            "summerNight": 0.18,
            "coffeeShop": 0.36,
            "train": 0.75
        },
        3: {
            "rain": 1,
            "waterStream": 0.45,
            // "brownNoise": 1
        },
        4: {
            "seaside": 0.12,
            "bonfire": 0.82,
            "summerNight": 0.14,
            "fan": 0.53
        },
        5: {
            "rain": 0.87,
            "thunderstorm": 0.25,
            "wind": 0.5,
            "coffeeShop": 1
        }

    },
    // "Random":{},
    "Relax": {
        1: {
            "forest": 0.5,
            "leaves": 0.5,
            "water": 0.18,
        },
        2: {
            "forest": 0.26,
            "leaves": 0.72,
            "seaside": 0.08,
        },
        3: {
            "rain": 0.5,
            "thunderstorm": 0.21,
            "bonfire": 1
        },
        4: {
            "bonfire": 1,
            "summerNight": 0.13,
            "fan": 0.2,
        },
        5: {
            "thunderstorm": 0.15,
            "seaside": 0.15,
            "summerNight": 0.1,
        },

    }
}

const aCtx = new AudioContext();
let constantNode = aCtx.createGain()
let volume1 = 1
let toggle = false
let playListActive = {}
let playlistNumber

var bufferToBase64 = function (buffer) {
    var bytes = new Uint8Array(buffer);
    var len = buffer.byteLength;
    var binary = "";
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
};

var base64ToBuffer = function (buffer) {
    var binary = window.atob(buffer);
    var buffer = new ArrayBuffer(binary.length);
    var bytes = new Uint8Array(buffer);
    for (var i = 0; i < buffer.byteLength; i++) {
        bytes[i] = binary.charCodeAt(i) & 0xFF;
    }
    return buffer;
};

// function randomNumber(obj) {
//     let keys = Object.keys(obj);
//     // return obj[keys[keys.length * Math.random() << 0]];
//     return keys[keys.length * Math.random() << 0]
// };

document.addEventListener("DOMContentLoaded", () => {
    let PlayMasterVolumeController = document.querySelector('.PlayMasterVolumeController')
    var clientRect = PlayMasterVolumeController.getBoundingClientRect();

    let volumeController = document.querySelector('.volumeController')
    let mouseover = document.querySelector('.mouseover')

    PlayMasterVolumeController.addEventListener("mouseover", () => {
        volumeController.className = "volumeController-active"
    })

    mouseover.addEventListener("mouseover", () => {
        volumeController.className = "volumeController"
    })
})

export class Body extends Component {

    static contextType = Context

    constructor() {

        super()
        this.state = {
            tooltip: false,
            muted: false,
            volume: 1,
            playList: false,
            soundLoaded: false,
        }

        this.change = this.change.bind(this)
        this.onClick = this.onClick.bind(this)
        this.openRegistrationTool = this.openRegistrationTool.bind(this)
        this.changeVolume = this.changeVolume.bind(this)
        this.muted = this.muted.bind(this)
        this.startPlaylist = this.startPlaylist.bind(this)
        this.resetSounds = this.resetSounds.bind(this)
    }

    componentDidMount() {

        let data = {}
        console.log('body')
        let count = 0
        for (let key in obj) {

            let buf;
            let gainNode = aCtx.createGain()
            gainNode.gain.value = 0.75
            let source = aCtx.createBufferSource();

            fetch(obj[key])
                .then(response => response.text())
                .then(text => {
                    var audioFromString = base64ToBuffer(text);
                    aCtx.decodeAudioData(audioFromString, function (buffer) {
                        console.log(buffer);
                        source.buffer = buffer
                        source.loop = true;

                        source.connect(gainNode);
                        gainNode.connect(constantNode)
                        constantNode.connect(aCtx.destination);

                        // source.start(0)
                        // source.start(0, source.buffer.duration - 5)
                        // source.disconnect(gainNode);
                        count++
                        document.querySelector(`[data-key=${key}]`).style.pointerEvents = 'auto';

                        return data[key] = {
                            active: false,
                            source: source,
                            gainNode: gainNode,
                            firstStart: true
                        }
                    })
                })
            console.log(count)

            // if (count == 13) {
            //     alert()
            //     this.setState(state => { state.soundLoaded = true })
            // }
        }
        this.setState({ data }, () => { })


        // const data = {}
        // console.log('body')

        // for (let key in obj) {

        //     let buf;
        //     let gainNode = aCtx.createGain()
        //     let source = aCtx.createBufferSource();

        //     fetch(obj[key])
        //         .then(resp => resp.arrayBuffer())
        //         .then(buf => aCtx.decodeAudioData(buf))
        //         .then(decoded => {
        //             console.log('fetch');
        //             source.buffer = buf = decoded;
        //             source.loop = true;

        //             source.connect(gainNode);
        //             gainNode.connect(constantNode)
        //             constantNode.connect(aCtx.destination);

        //             // source.start(0)
        //             // source.start(0, source.buffer.duration - 5)
        //             // source.disconnect(gainNode);
        // document.querySelector(`[data-key=${key}]`).style.pointerEvents = 'auto';
        //             return data[key] = {
        //                 active: false,
        //                 source: source,
        //                 gainNode: gainNode,
        //                 firstStart: true
        //             }
        //         });
        // }
        // this.setState({ data }, () => { })
    }

    componentDidUpdate() {

    }

    change(e) {
        let key = e.target.parentNode.dataset.key
        this.state.data[key].gainNode.gain.value = e.target.value
    }

    onClick(e) {
        const target = e.target.localName

        console.log(this.state)

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
        console.log(input)

        if (e.target.localName !== 'input') {
            console.log(key);

            this.setState(state => {
                state.data[key].active = !state.data[key].active
                const deep = _.cloneDeep(state)
                return deep
            }, () => {
                console.log(this.state);

                if (this.state.data[key].active === true) {
                    console.log(' start')

                    if (this.state.data[key].firstStart === true) {
                        this.state.data[key].source.start(0)
                        this.setState(state => {
                            state.data[key].firstStart = false
                        })

                    } else {
                        this.state.data[key].source.connect(this.state.data[key].gainNode);
                    }
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

    openRegistrationTool() {

        this.props.openModal(true, "Sign up")
        let tool = document.querySelector('.tool')
        tool.style.opacity = 0

        console.log(tool)
        setTimeout(() => {
            tool.style.opacity = 1
        }, 500)
    }

    changeVolume(e) {
        let muted = this.state.muted
        let volume = Number(e.target.value)
        volume1 = volume
        if (volume == 0) {
            this.setState({ muted: true })
        }
        if (volume > 0 && muted) {
            this.setState({ muted: false })
        }
        constantNode.gain.value = volume
    }

    muted() {
        let muted = this.state.muted
        let volumeController = document.querySelector('.volumeController-active')

        if (muted) {
            constantNode.gain.value = volume1
            volumeController.value = volume1
            this.setState({ muted: false })
        }
        if (!muted) {
            constantNode.gain.value = 0
            volumeController.value = 0
            this.setState({ muted: true })
        }
    }

    resetSounds() {

        if (toggle) {

            this.setState(state => {

                for (let key in this.state.data) {
                    let input = `input-${key}`

                    if (this.state.data[key].active) {
                        state.data[key].active = false
                        this.state.data[key].source.disconnect(this.state.data[key].gainNode);
                        document.getElementById(`${input}`).style.visibility = 'hidden';
                        document.querySelector(`[data-key=${key}]`).classList.remove('active')
                    }
                }

                const deep = _.cloneDeep(state)
                return deep
            })
        }
    }

    startPlaylist(name) {

        if (name != 'Random') {
            let number = randomNumber(playList[name]);
            if (number == playlistNumber) {
                number == 1 ? number++ : number--
            }
            if (!toggle) {
                playlistNumber = number
            }

            playlistNumber = number
            playListActive = playList[name][playlistNumber]
        } else {
          
            playListActive = randomPlalist(obj)
        }

        this.resetSounds()

        for (let key in playListActive) {

            let input = `input-${key}`
            let value = playListActive[key]
            toggle = true

            this.setState(state => {

                state.data[key].active = true
                state.data[key].gainNode.gain.value = value
                state.playList = !state.playList
                console.log(input)

                document.querySelector(`#${input}`).value = value
                const deep = _.cloneDeep(state)
                return deep
            }, () => {
                console.log(this.state);

                console.log(' start')

                if (this.state.data[key].firstStart === true) {
                    this.state.data[key].source.start(0)
                    this.setState(state => {
                        state.data[key].firstStart = false
                    })

                } else {
                    this.state.data[key].source.connect(this.state.data[key].gainNode);
                }
                document.getElementById(`${input}`).style.visibility = 'visible';
                document.querySelector(`[data-key=${key}]`).classList.add('active')
            })
        }
    }

    render() {
        const { isAuth, sounds } = this.props

        return (
            <div className='body' onClick={() => this.props.setPage('body')}>
                {console.log('Body')}

                <div className="sound" >
                    <input className="volumeController" type="range" min='0' max='1' step='0.01' onChange={(e) => this.changeVolume(e)} ></input>
                    <div className="PlayMasterVolumeController" onClick={this.muted}>
                        {this.state.muted
                            ?
                            <svg className="volumeContrl" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                <g fill="none" fillRule="evenodd">
                                    <path fill="#ffffff" fillRule="nonzero" d="M16.834 14.006l-1.502-1.502C15.778 11.45 16 10.284 16 9c0-2.099-.593-3.879-1.783-5.378a1 1 0 1 1 1.566-1.244C17.26 4.24 18 6.46 18 9c0 1.842-.389 3.516-1.166 5.006zm-2.439-2.439l-1.544-1.544c.1-.345.149-.686.149-1.023 0-.792-.27-1.602-.832-2.445a1 1 0 1 1 1.664-1.11C14.603 6.602 15 7.792 15 9c0 .867-.204 1.724-.605 2.567zM5.707 2.879L7.586 1A2 2 0 0 1 11 2.414v5.758l-2-2V2.414L7.121 4.293 5.707 2.879zM11 13.829v1.757A2 2 0 0 1 7.586 17l-4-4H2a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h.172l1.987 1.987A1 1 0 0 1 4 7H2v4h2a1 1 0 0 1 .707.293L9 15.586v-3.758l2 2zM.293 1.706A1 1 0 1 1 1.707.293l16 16a1 1 0 0 1-1.414 1.414l-16-16z"></path>
                                    <path d="M0 0h18v18H0z"></path>
                                </g>
                            </svg>
                            :
                            <svg className="volumeContrl" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                <g fill="none" fillRule="evenodd">
                                    <path fill="#ffffff" fillRule="nonzero" d="M14.217 3.622a1 1 0 1 1 1.566-1.244C17.26 4.24 18 6.46 18 9c0 2.54-.74 4.76-2.217 6.622a1 1 0 1 1-1.566-1.244C15.407 12.878 16 11.098 16 9c0-2.099-.593-3.879-1.783-5.378z"></path>
                                    <path fill="#ffffff" fillRule="nonzero" d="M12.168 6.555a1 1 0 1 1 1.664-1.11C14.603 6.602 15 7.792 15 9c0 1.208-.397 2.398-1.168 3.555a1 1 0 1 1-1.664-1.11C12.73 10.602 13 9.792 13 9c0-.792-.27-1.602-.832-2.445zM3.586 5l4-4A2 2 0 0 1 11 2.414v13.172A2 2 0 0 1 7.586 17l-4-4H2a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h1.586zm1.121 1.707A1 1 0 0 1 4 7H2v4h2a1 1 0 0 1 .707.293L9 15.586V2.414L4.707 6.707z"></path>
                                    <path d="M0 0h18v18H0z"></path>
                                </g>
                            </svg>
                        }
                    </div>
                </div>
                <div className="mouseover"></div>
                <PlayList startPlaylist={this.startPlaylist} resetSounds={this.resetSounds} />
                <div className="container">
                    <div className="standart">
                        <div style={{ pointerEvents: 'none' }} data-key="rain" className={"card rain"} onClick={(e) => this.onClick(e)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56">
                                <title>Rain</title>
                                <g fill="none" fillRule="evenodd">
                                    <path fill="currentColor" fillRule="nonzero" d="M15.676 11.446l-.518.745-.9-.113A10.113 10.113 0 0 0 13 12C7.477 12 3 16.477 3 22s4.477 10 10 10a9.965 9.965 0 0 0 3.814-.753l.841-.347.697.586A14.931 14.931 0 0 0 28 35c3.581 0 6.964-1.257 9.648-3.514l.697-.586.841.347A9.965 9.965 0 0 0 43 32c5.523 0 10-4.477 10-10s-4.477-10-10-10c-.424 0-.843.026-1.258.078l-.9.113-.518-.745A14.979 14.979 0 0 0 28 5a14.979 14.979 0 0 0-12.324 6.446zM28 2c5.666 0 10.89 2.639 14.265 7.02.244-.013.49-.02.735-.02 7.18 0 13 5.82 13 13s-5.82 13-13 13c-1.414 0-2.8-.227-4.113-.664A17.926 17.926 0 0 1 28 38a17.926 17.926 0 0 1-10.887-3.664A12.988 12.988 0 0 1 13 35C5.82 35 0 29.18 0 22S5.82 9 13 9c.246 0 .491.007.735.02A17.972 17.972 0 0 1 28 2zM12.02 38.253a1.5 1.5 0 1 1 2.96.494l-1 6a1.5 1.5 0 1 1-2.96-.494l1-6zm13 9a1.5 1.5 0 1 1 2.96.494l-1 6a1.5 1.5 0 1 1-2.96-.494l1-6zm14-6a1.5 1.5 0 1 1 2.96.494l-1 6a1.5 1.5 0 1 1-2.96-.494l1-6z"></path>
                                    <path d="M0 0h56v56H0z"></path>
                                </g>
                            </svg>
                            <input id='input-rain' style={{ visibility: 'hidden' }} type="range" min='0' max='1' step='0.01' defaultValue='0.75' onChange={(e) => this.change(e)} ></input>
                        </div>

                        <div style={{ pointerEvents: 'none' }} data-key="thunderstorm" className={"card  thunderstorm"} onClick={(e) => this.onClick(e)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56">
                                <title>Thunderstorm</title>
                                <g fill="none" fillRule="evenodd">
                                    <path fill="currentColor" fillRule="nonzero" d="M15.676 11.446l-.518.745-.9-.113A10.113 10.113 0 0 0 13 12C7.477 12 3 16.477 3 22s4.477 10 10 10a9.965 9.965 0 0 0 3.814-.753l.841-.347.697.586A14.931 14.931 0 0 0 28 35c3.581 0 6.964-1.257 9.648-3.514l.697-.586.841.347A9.965 9.965 0 0 0 43 32c5.523 0 10-4.477 10-10s-4.477-10-10-10c-.424 0-.843.026-1.258.078l-.9.113-.518-.745A14.979 14.979 0 0 0 28 5a14.979 14.979 0 0 0-12.324 6.446zM28 2c5.666 0 10.89 2.639 14.265 7.02.244-.013.49-.02.735-.02 7.18 0 13 5.82 13 13s-5.82 13-13 13c-1.414 0-2.8-.227-4.113-.664A17.926 17.926 0 0 1 28 38a17.926 17.926 0 0 1-10.887-3.664A12.988 12.988 0 0 1 13 35C5.82 35 0 29.18 0 22S5.82 9 13 9c.246 0 .491.007.735.02A17.972 17.972 0 0 1 28 2z"></path>
                                    <path fill="currentColor" fillRule="nonzero" d="M24.6 42.7a1.5 1.5 0 0 1-.271-2.137l4-5a1.5 1.5 0 0 1 2.342 1.874l-3.033 3.792L30.4 43.3a1.5 1.5 0 0 1 .32 2.072l-5 7a1.5 1.5 0 1 1-2.44-1.744l4.148-5.807L24.6 42.7z"></path>
                                    <path d="M0 0h56v56H0z"></path>
                                </g>
                            </svg>
                            <input id='input-thunderstorm' style={{ visibility: 'hidden' }} type="range" min='0' max='1' step='0.01' defaultValue='0.75' onChange={(e) => this.change(e)} ></input>
                        </div>

                        <div style={{ pointerEvents: 'none' }} data-key="wind" className={"card  wind"} onClick={(e) => this.onClick(e)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56">
                                <title>Wind</title>
                                <g fill="none" fillRule="evenodd">
                                    <path fill="currentColor" fillRule="nonzero" d="M1.5 23a1.5 1.5 0 0 1 0-3H27a5 5 0 0 0 0-10c-2.903 0-5 1.874-5 4.5a1.5 1.5 0 0 1-3 0c0-4.363 3.51-7.5 8-7.5a8 8 0 1 1 0 16H1.5zM26 42.5a1.5 1.5 0 0 1 3 0c0 2.626 2.097 4.5 5 4.5a5 5 0 0 0 0-10H1.5a1.5 1.5 0 0 1 0-3H34a8 8 0 1 1 0 16c-4.49 0-8-3.137-8-7.5z"></path>
                                    <path fill="currentColor" fillRule="nonzero" d="M1.5 30a1.5 1.5 0 0 1 0-3H48a5 5 0 0 0 0-10c-2.903 0-5 1.874-5 4.5a1.5 1.5 0 0 1-3 0c0-4.363 3.51-7.5 8-7.5a8 8 0 1 1 0 16H1.5z"></path>
                                    <path d="M0 0h56v56H0z"></path>
                                </g>
                            </svg>
                            <input id='input-wind' style={{ visibility: 'hidden' }} type="range" min='0' max='1' step='0.01' defaultValue='0.75' onChange={(e) => this.change(e)} ></input>
                        </div>

                        <div style={{ pointerEvents: 'none' }} data-key="forest" className={"card  forest"} onClick={(e) => this.onClick(e)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56">
                                <title>Forest</title>
                                <g fill="none" fillRule="evenodd">
                                    <path fill="currentColor" fillRule="nonzero" d="M14 50h2v2a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-5H1a1 1 0 0 1-.868-1.496L3.277 40H2a1 1 0 0 1-.848-1.53L5.196 32H5a1 1 0 0 1-.868-1.496L7.277 25H7a1 1 0 0 1-.878-1.479l6-11a1 1 0 0 1 1.752-.007l3.895 7.011-1.188 1.98-3.573-6.431L8.685 23H9a1 1 0 0 1 .868 1.496L6.723 30H7a1 1 0 0 1 .848 1.53L3.804 38H5a1 1 0 0 1 .868 1.496L2.723 45H10c.294 0 .558.127.74.328l-.516 1.137A2.499 2.499 0 0 0 11 49.502V51h3v-1zm24.23-30.475l3.896-7.01a1 1 0 0 1 1.752.006l6 11A1 1 0 0 1 49 25h-.277l3.145 5.504A1 1 0 0 1 51 32h-.196l4.044 6.47A1 1 0 0 1 54 40h-1.277l3.145 5.504A1 1 0 0 1 55 47h-8v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-2h2v1h3v-1.498a2.499 2.499 0 0 0 .776-3.037l-.517-1.137A.997.997 0 0 1 46 45h7.277l-3.145-5.504A1 1 0 0 1 51 38h1.196l-4.044-6.47A1 1 0 0 1 49 30h.277l-3.145-5.504A1 1 0 0 1 47 23h.315l-4.323-7.926-3.573 6.431-1.188-1.98z"></path>
                                    <path fill="currentColor" fillRule="nonzero" d="M33 49v5.5a1.5 1.5 0 0 1-1.5 1.5h-7a1.5 1.5 0 0 1-1.5-1.5V49H12.5a1.5 1.5 0 0 1-1.366-2.12L15.17 38H13.5a1.5 1.5 0 0 1-1.286-2.272L16.85 28H16.5a1.5 1.5 0 0 1-1.286-2.272L19.85 18H19.5a1.5 1.5 0 0 1-1.305-2.24l8.5-15a1.5 1.5 0 0 1 2.61 0l8.5 15A1.5 1.5 0 0 1 36.5 18h-.35l4.636 7.728A1.5 1.5 0 0 1 39.5 28h-.35l4.636 7.728A1.5 1.5 0 0 1 42.5 38h-1.67l4.036 8.88A1.5 1.5 0 0 1 43.5 49H33zm-2.56-2.56c.27-.272.646-.44 1.06-.44h9.67l-4.036-8.88A1.5 1.5 0 0 1 38.5 35h1.35l-4.636-7.728A1.5 1.5 0 0 1 36.5 25h.35l-4.636-7.728A1.5 1.5 0 0 1 33.5 15h.426L28 4.543 22.074 15h.426a1.5 1.5 0 0 1 1.286 2.272L19.15 25h.351a1.5 1.5 0 0 1 1.286 2.272L16.15 35H17.5a1.5 1.5 0 0 1 1.366 2.12L14.83 46h9.67a1.5 1.5 0 0 1 1.5 1.5V53h4v-5.5c0-.414.168-.79.44-1.06z"></path>
                                    <path d="M0 0h56v56H0z"></path>
                                </g>
                            </svg>
                            <input id='input-forest' style={{ visibility: 'hidden' }} type="range" min='0' max='1' step='0.01' defaultValue='0.75' onChange={(e) => this.change(e)} ></input>
                        </div>

                        <div style={{ pointerEvents: 'none' }} data-key="leaves" className={"card  leaves"} onClick={(e) => this.onClick(e)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56">
                                <title>Leaves</title>
                                <g fill="none" fillRule="evenodd">
                                    <path fill="currentColor" fillRule="nonzero" d="M8 16c1.547 0 2.802.197 4.402.621.35.093 1.575.437 1.56.433 2.39.66 4.216.946 7.038.946 4.134 0 7.14-1.718 9.204-5.256a1.5 1.5 0 1 1 2.592 1.511C30.193 18.717 26.199 21 21 21c-3.116 0-5.202-.328-7.836-1.054-.003-.001-1.206-.338-1.532-.425C10.264 19.158 9.256 19 8 19c-1.854 0-3.38.174-4.594.46a9.078 9.078 0 0 0-1.01.293c-.14.05-.214.083-.225.088A1.5 1.5 0 0 1 0 18.5C0 8.818 9.55 0 19.5 0c6.381 0 10.812 1.477 13.192 4.588a1.5 1.5 0 1 1-2.384 1.823C28.61 4.189 25.04 3 19.5 3 11.881 3 4.418 9.28 3.18 16.438 4.53 16.161 6.132 16 8 16z"></path>
                                    <path fill="currentColor" fillRule="nonzero" d="M11.066 12.889a1.5 1.5 0 0 1-1.132-2.779c9.349-3.808 19.715-3.808 31.04-.033a1.5 1.5 0 1 1-.948 2.846c-10.675-3.559-20.309-3.559-28.96-.034zm32.36 6.29a58.812 58.812 0 0 1-4.87 3.457c-.616.392-1.209.756-1.97 1.212l-.895.535c-.346.206-.6.36-.845.509-.851.518-1.505.943-2.132 1.394-1.252.9-2.386 1.903-3.612 3.231-2.708 2.934-3.468 7.798-2.13 14.697a1.5 1.5 0 0 1-2.945.571c-1.502-7.745-.596-13.548 2.87-17.303 1.364-1.477 2.65-2.614 4.066-3.632.697-.501 1.41-.965 2.321-1.52.254-.155.516-.312.868-.523l.892-.532c.74-.444 1.312-.794 1.902-1.17a55.821 55.821 0 0 0 4.627-3.285c2.61-2.05 4.2-3.834 4.981-5.325.262-.5.408-.921.468-1.267.03-.178.032-.294.026-.355-.508-1.579 1.755-2.66 2.71-1.19 6.513 10.03 7.906 23.968.963 33.688-5.306 7.428-11.502 10.708-18.455 9.61a1.5 1.5 0 0 1 .468-2.963c5.714.902 10.85-1.817 15.545-8.39 5.47-7.657 5.052-18.547.705-27.262-1.018 1.705-2.805 3.651-5.557 5.813zm3.622-9.306a.285.285 0 0 0-.002-.01l.002.01z"></path>
                                    <path fill="currentColor" fillRule="nonzero" d="M45.063 25.069a1.5 1.5 0 0 1 2.874.862C44.809 36.358 35.55 45.959 20.25 54.799A1.5 1.5 0 1 1 18.75 52.2c14.7-8.493 23.441-17.559 26.313-27.132z"></path>
                                    <path d="M0 0h56v56H0z"></path>
                                </g>
                            </svg>
                            <input id='input-leaves' style={{ visibility: 'hidden' }} type="range" min='0' max='1' step='0.01' defaultValue='0.75' onChange={(e) => this.change(e)} ></input>
                        </div>

                        <div style={{ pointerEvents: 'none' }} data-key="waterStream" className={"card  waterStream"} onClick={(e) => this.onClick(e)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56">
                                <title>Water stream</title>
                                <g fill="none" fillRule="evenodd">
                                    <path fill="currentColor" fillRule="nonzero" d="M5.194 13.83a1.5 1.5 0 0 1-1.388-2.66c8.135-4.244 15.398-4.244 21.559.105 1.637 1.155 3.108 2.433 4.584 3.933 1.16 1.178 4.579 5.046 4.506 4.967C37.658 23.657 40.038 25 44 25c4.028 0 7.213-.91 9.6-2.7a1.5 1.5 0 1 1 1.8 2.4C52.453 26.91 48.638 28 44 28c-4.93 0-8.034-1.751-11.753-5.794.025.027-3.343-3.784-4.436-4.894-1.358-1.379-2.695-2.541-4.176-3.587-5.173-3.65-11.243-3.65-18.441.105z"></path>
                                    <path fill="currentColor" fillRule="nonzero" d="M4.194 23.83a1.5 1.5 0 0 1-1.388-2.66c8.135-4.244 15.398-4.244 21.559.105 1.637 1.155 3.108 2.433 4.584 3.933 1.16 1.178 4.579 5.046 4.506 4.967C36.658 33.657 39.038 35 43 35c4.028 0 7.213-.91 9.6-2.7a1.5 1.5 0 1 1 1.8 2.4C51.453 36.91 47.638 38 43 38c-4.93 0-8.034-1.751-11.753-5.794.025.027-3.343-3.784-4.436-4.894-1.358-1.379-2.695-2.541-4.176-3.587-5.173-3.65-11.243-3.65-18.441.105z"></path>
                                    <path fill="currentColor" fillRule="nonzero" d="M2.194 33.83a1.5 1.5 0 0 1-1.388-2.66c8.135-4.244 15.398-4.244 21.559.105 1.637 1.155 3.108 2.433 4.584 3.933 1.16 1.178 4.579 5.046 4.506 4.967C34.658 43.657 37.038 45 41 45c4.028 0 7.213-.91 9.6-2.7a1.5 1.5 0 1 1 1.8 2.4C49.453 46.91 45.638 48 41 48c-4.93 0-8.034-1.751-11.753-5.794.025.027-3.343-3.784-4.436-4.894-1.358-1.379-2.695-2.541-4.176-3.587-5.173-3.65-11.243-3.65-18.441.105z"></path>
                                    <path d="M0 0h56v56H0z"></path>
                                </g>
                            </svg>
                            <input id='input-waterStream' style={{ visibility: 'hidden' }} type="range" min='0' max='1' step='0.01' defaultValue='0.75' onChange={(e) => this.change(e)} ></input>
                        </div>

                        <div style={{ pointerEvents: 'none' }} data-key="seaside" className={"card  seaside"} onClick={(e) => this.onClick(e)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56">
                                <title>Seaside</title>
                                <g fill="none" fillRule="evenodd">
                                    <path fill="currentColor" fillRule="nonzero" d="M53.264 11.65a1.5 1.5 0 0 1 2.472 1.7C53.604 16.452 50.216 18 45.75 18c-4.467 0-7.854-1.548-9.986-4.65a1.5 1.5 0 0 1 2.472-1.7C39.77 13.882 42.216 15 45.75 15c3.533 0 5.98-1.118 7.514-3.35zm-35.5 0a1.5 1.5 0 0 1 2.472 1.7C18.104 16.452 14.716 18 10.25 18c-4.467 0-7.854-1.548-9.986-4.65a1.5 1.5 0 1 1 2.472-1.7C4.27 13.882 6.716 15 10.25 15c3.533 0 5.98-1.118 7.514-3.35zm.036 1.75a1.5 1.5 0 1 1 2.4-1.8c1.7 2.267 4.25 3.4 7.8 3.4s6.1-1.133 7.8-3.4a1.5 1.5 0 1 1 2.4 1.8C35.9 16.466 32.45 18 28 18c-4.45 0-7.9-1.534-10.2-4.6zm35.464 11.25a1.5 1.5 0 0 1 2.472 1.7C53.604 29.452 50.216 31 45.75 31c-4.467 0-7.854-1.548-9.986-4.65a1.5 1.5 0 0 1 2.472-1.7C39.77 26.882 42.216 28 45.75 28c3.533 0 5.98-1.118 7.514-3.35zm-35.5 0a1.5 1.5 0 0 1 2.472 1.7C18.104 29.452 14.716 31 10.25 31c-4.467 0-7.854-1.548-9.986-4.65a1.5 1.5 0 1 1 2.472-1.7C4.27 26.882 6.716 28 10.25 28c3.533 0 5.98-1.118 7.514-3.35zm.036 1.75a1.5 1.5 0 1 1 2.4-1.8c1.7 2.267 4.25 3.4 7.8 3.4s6.1-1.133 7.8-3.4a1.5 1.5 0 1 1 2.4 1.8C35.9 29.466 32.45 31 28 31c-4.45 0-7.9-1.534-10.2-4.6zm35.464 11.25a1.5 1.5 0 0 1 2.472 1.7C53.604 42.452 50.216 44 45.75 44c-4.467 0-7.854-1.548-9.986-4.65a1.5 1.5 0 0 1 2.472-1.7C39.77 39.882 42.216 41 45.75 41c3.533 0 5.98-1.118 7.514-3.35zm-35.5 0a1.5 1.5 0 0 1 2.472 1.7C18.104 42.452 14.716 44 10.25 44c-4.467 0-7.854-1.548-9.986-4.65a1.5 1.5 0 1 1 2.472-1.7C4.27 39.882 6.716 41 10.25 41c3.533 0 5.98-1.118 7.514-3.35zm.036 1.75a1.5 1.5 0 1 1 2.4-1.8c1.7 2.267 4.25 3.4 7.8 3.4s6.1-1.133 7.8-3.4a1.5 1.5 0 1 1 2.4 1.8C35.9 42.466 32.45 44 28 44c-4.45 0-7.9-1.534-10.2-4.6z"></path>
                                    <path d="M0 0h56v56H0z"></path>
                                </g>
                            </svg>
                            <input id='input-seaside' style={{ visibility: 'hidden' }} type="range" min='0' max='1' step='0.01' defaultValue='0.75' onChange={(e) => this.change(e)} ></input>
                        </div>

                        <div style={{ pointerEvents: 'none' }} data-key="water" className={"card  water"} onClick={(e) => this.onClick(e)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56">
                                <title>Water</title>
                                <g fill="none" fillRule="evenodd">
                                    <path fill="currentColor" fillRule="nonzero" d="M26.723.712a1.489 1.489 0 0 1 .65-.575 1.49 1.49 0 0 1 1.887.548 1.51 1.51 0 0 1 0 1.63c-.429.662-.849 1.316-1.26 1.964-.411-.648-.831-1.302-1.26-1.964A1.5 1.5 0 1 1 29.278.712C40.415 17.93 46 30.458 46 38.5 46 48.088 37.747 56 28 56s-18-7.912-18-17.5c0-8.042 5.585-20.57 16.723-37.788zM13 38.5C13 46.402 19.883 53 28 53s15-6.598 15-14.5c0-7-4.99-18.467-15-34.221C17.99 20.033 13 31.5 13 38.5z"></path>
                                    <path fill="currentColor" fillRule="nonzero" d="M17 37.5a1.5 1.5 0 0 1 3 0c0 4.633 3.911 8.5 8.5 8.5a1.5 1.5 0 0 1 0 3C22.262 49 17 43.798 17 37.5z"></path>
                                    <path d="M0 0h56v56H0z"></path>
                                </g>
                            </svg>
                            <input id='input-water' style={{ visibility: 'hidden' }} type="range" min='0' max='1' step='0.01' defaultValue='0.75' onChange={(e) => this.change(e)} ></input>
                        </div>

                        <div style={{ pointerEvents: 'none' }} data-key="bonfire" className={"card  bonfire"} onClick={(e) => this.onClick(e)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56">
                                <title>Bonfire</title>
                                <g fill="none" fillRule="evenodd">
                                    <path fill="currentColor" fillRule="nonzero" d="M13.69 28.026C12.564 30.599 12 33.585 12 37c0 8.837 7.163 16 16 16s16-7.163 16-16c0-2.65-1.061-5.295-4.043-7.863-1.558-1.343-2.56-2.577-3.161-3.903a7.859 7.859 0 0 1-.517-1.475c-.315 1.388-.422 3.265-.282 5.653.092 1.563-1.97 2.204-2.78.864-2.673-4.418-3.15-8.47-1.316-12.41 1.848-3.97 2.21-7.559 1.092-10.85-.717 3.747-2.933 7-6.606 9.694-4.621 3.388-7.076 8.299-7.389 14.861-.062 1.301-1.638 1.91-2.559.99-1.389-1.39-2.308-2.91-2.75-4.535zm2.85-.966c1.104-5.357 3.799-9.635 8.073-12.77 4.55-3.336 6.308-7.439 5.41-12.53C29.756.25 31.66-.64 32.648.536c4.538 5.398 5.19 11.69 1.972 18.598a8.712 8.712 0 0 0-.693 2.156c.651-1.528 1.634-2.59 2.982-3.168A1.5 1.5 0 0 1 39 19.5v.255c-.002 2.451.083 3.259.528 4.24.402.887 1.135 1.79 2.387 2.868C45.603 30.04 47 33.524 47 37c0 10.493-8.507 19-19 19S9 47.493 9 37c0-6.341 1.783-11.527 5.366-15.482a1.494 1.494 0 0 1 .778-.475 1.508 1.508 0 0 1 1.365.347 1.511 1.511 0 0 1 .448.754 1.491 1.491 0 0 1-.06.906c-.53 1.446-.651 2.771-.358 4.01z"></path>
                                    <path d="M0 0h56v56H0z"></path>
                                </g>
                            </svg>
                            <input id='input-bonfire' style={{ visibility: 'hidden' }} type="range" min='0' max='1' step='0.01' defaultValue='0.75' onChange={(e) => this.change(e)} ></input>
                        </div>

                        <div style={{ pointerEvents: 'none' }} data-key="summerNight" className={"card  summer-night"} onClick={(e) => this.onClick(e)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56">
                                <title>Summer night</title>
                                <g fill="none" fillRule="evenodd">
                                    <path fill="currentColor" fillRule="nonzero" d="M5 28c0 13.807 11.193 25 25 25 5.831 0 11.434-2.192 15.91-5.972-.957.108-1.924.163-2.898.163C28.872 47.191 17.5 36.028 17.5 22a25.456 25.456 0 0 1 8.06-18.607C13.871 5.488 5 15.708 5 28zM31.288 2.785A22.482 22.482 0 0 0 20.5 22c0 12.359 10.017 22.191 22.512 22.191 2.414 0 4.775-.38 7.02-1.116 1.427-.468 2.58 1.217 1.627 2.377C46.275 52.007 38.37 56 30 56 14.536 56 2 43.464 2 28S14.536 0 30 0c.178 0 .356.002.534.005 1.5.028 2.034 1.998.754 2.78z"></path>
                                    <path d="M0 0h56v56H0z"></path>
                                </g>
                            </svg>
                            <input id='input-summerNight' style={{ visibility: 'hidden' }} type="range" min='0' max='1' step='0.01' defaultValue='0.75' onChange={(e) => this.change(e)} ></input>
                        </div>

                        <div style={{ pointerEvents: 'none' }} data-key="coffeeShop" className={"card  coffee-shop"} onClick={(e) => this.onClick(e)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56">
                                <title>Coffee shop</title>
                                <g fill="none" fillRule="evenodd">
                                    <path fill="currentColor" fillRule="nonzero" d="M6 29.5A1.5 1.5 0 0 1 7.5 28H44a1.5 1.5 0 0 1 1.5 1.5c0 16.404-6.362 26.5-20 26.5C11.935 56 6 46.153 6 29.5zM9.017 31C9.34 45.255 14.38 53 25.5 53c11.221 0 16.627-7.975 16.981-22H9.017z"></path>
                                    <path fill="currentColor" fillRule="nonzero" d="M41.008 45.202l1.498-2.6A3 3 0 1 0 44 37v-3a6 6 0 1 1-2.992 11.202zM35.748 22.668a1.5 1.5 0 1 1-2.496 1.664C32.428 23.096 32 21.812 32 20.5c0-.82.14-1.453.558-2.912.333-1.166.442-1.657.442-2.088 0-.688-.238-1.404-.748-2.168a1.5 1.5 0 1 1 2.496-1.664C35.572 12.904 36 14.188 36 15.5c0 .82-.14 1.453-.558 2.912C35.11 19.578 35 20.07 35 20.5c0 .688.238 1.404.748 2.168zM25.107 2.057A1.5 1.5 0 1 1 27.893.943C28.629 2.783 29 4.639 29 6.5c0 1.213-.253 2.5-1.04 5.844-.713 3.031-.96 4.286-.96 5.156 0 1.367.587 3.13 1.802 5.256a1.5 1.5 0 1 1-2.604 1.488C24.746 21.704 24 19.466 24 17.5c0-1.213.253-2.5 1.04-5.844.713-3.031.96-4.286.96-5.156 0-1.472-.296-2.95-.893-4.443zm-7.855 11.275a1.5 1.5 0 1 1 2.496-1.664C20.572 12.904 21 14.188 21 15.5c0 .82-.14 1.453-.558 2.912C20.11 19.578 20 20.07 20 20.5c0 .688.238 1.404.748 2.168a1.5 1.5 0 1 1-2.496 1.664C17.428 23.096 17 21.812 17 20.5c0-.82.14-1.453.558-2.912.333-1.166.442-1.657.442-2.088 0-.688-.238-1.404-.748-2.168z"></path>
                                    <path d="M0 0h56v56H0z"></path>
                                </g>
                            </svg>
                            <input id='input-coffeeShop' style={{ visibility: 'hidden' }} type="range" min='0' max='1' step='0.01' defaultValue='0.75' onChange={(e) => this.change(e)} ></input>
                        </div>

                        <div style={{ pointerEvents: 'none' }} data-key="train" className={"card  train"} onClick={(e) => this.onClick(e)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56">
                                <title>Train</title>
                                <g fill="none" fillRule="evenodd">
                                    <path fill="currentColor" fillRule="nonzero" d="M15 1.5a1.5 1.5 0 0 1 3 0v53a1.5 1.5 0 0 1-3 0v-53zM37 47v3H19v-3h18zm5 0h2.5a1.5 1.5 0 0 1 0 3H42v-3zm-5-10v3H19v-3h18zm5 0h2.5a1.5 1.5 0 0 1 0 3H42v-3zm-5-10v3H19v-3h18zm5 0h2.5a1.5 1.5 0 0 1 0 3H42v-3zm-5-10v3H19v-3h18zm5 0h2.5a1.5 1.5 0 0 1 0 3H42v-3zM37 7v3H19V7h18zm5 0h2.5a1.5 1.5 0 0 1 0 3H42V7zM14 47v3h-2.5a1.5 1.5 0 0 1 0-3H14zm0-10v3h-2.5a1.5 1.5 0 0 1 0-3H14zm0-10v3h-2.5a1.5 1.5 0 0 1 0-3H14zm0-10v3h-2.5a1.5 1.5 0 0 1 0-3H14zm0-10v3h-2.5a1.5 1.5 0 0 1 0-3H14zm24-5.5a1.5 1.5 0 0 1 3 0v53a1.5 1.5 0 0 1-3 0v-53z"></path>
                                    <path d="M0 0h56v56H0z"></path>
                                </g>
                            </svg>
                            <input id='input-train' style={{ visibility: 'hidden' }} type="range" min='0' max='1' step='0.01' defaultValue='0.75' onChange={(e) => this.change(e)} ></input>
                        </div>
                    </div>
                    <div className={isAuth ? "premium" : "premium tooltip-active"} >
                        <div className="tool" >
                            <span id='text'>These Sounds<br />
                                are a <strong id='pro' onClick={this.openRegistrationTool}>Sign up</strong> feature.<br />
                                Upgrade to enjoy them.</span>
                        </div>
                        <div style={{ pointerEvents: 'none' }} data-key="fan" className={"card  fan prem"} onClick={(e) => this.onClick(e)}>
                            <div className="mask" id='mask'></div>
                            <div className="wrap">
                                <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56">
                                    <title>Fan</title>
                                    <g fill="none" fillRule="evenodd">
                                        <path fill="currentColor" fillRule="nonzero" d="M24.5 39a9.5 9.5 0 1 1 0-19 9.5 9.5 0 0 1 0 19zm0-3a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13z"></path>
                                        <path fill="currentColor" fillRule="nonzero" d="M29.807 22.403a1.5 1.5 0 0 1-2.9-.768c.39-1.476.593-3.036.593-4.635 0-8.371-4.067-14-10.5-14-4.993 0-9 3.001-9 7 0 2.912.943 4.104 4.007 5.88l1.248.714c.516.299.934.549 1.34.808.465.296.895.59 1.305.898 2.359 1.77 3.702 3.627 4.094 5.594a1.5 1.5 0 1 1-2.943.586c-.232-1.165-1.14-2.421-2.951-3.78-.345-.259-.712-.51-1.116-.767a32.643 32.643 0 0 0-1.23-.74c-.184-.107-1.024-.586-1.25-.718C6.607 16.22 5 14.185 5 10 5 4.125 10.507 0 17 0c8.339 0 13.5 7.143 13.5 17 0 1.857-.236 3.676-.693 5.403zM16.79 30.972zm-.784.155c-.283.057-.517.106-.737.155-1.076.24-1.884.502-2.711.905C7.2 34.8 3.928 39.581 3.999 44.48c.027 1.844.256 3.15.848 4.364 1.44 2.952 3.745 4.25 7.01 4.158a6.824 6.824 0 0 0 2.738-.668c2.68-1.307 3.384-2.615 3.7-5.872.024-.254.144-1.643.186-2.063a24.73 24.73 0 0 1 .317-2.272l.013-.083c.598-3.111 1.268-4.586 2.78-5.736a1.5 1.5 0 1 1 1.817 2.387c-.787.599-1.18 1.462-1.637 3.833l-.014.082a23.004 23.004 0 0 0-.291 2.088c-.04.393-.159 1.777-.185 2.054-.408 4.2-1.616 6.447-5.37 8.278a9.82 9.82 0 0 1-3.969.97c-4.407.125-7.818-1.795-9.791-5.841-.818-1.677-1.12-3.39-1.152-5.636C.911 38.4 4.89 32.59 11.243 29.491c1.062-.518 2.085-.85 3.373-1.137.244-.055.497-.108.8-.168.186-.038.989-.196.793-.157a1.5 1.5 0 0 1 .592 2.94l-.795.158zM27.39 37.507a1.5 1.5 0 1 1 2.223-2.014c.981 1.084 1.83 1.791 3.229 2.7 7.02 4.56 13.956 4.214 17.46-1.181 1.13-1.74 1.724-3.68 1.7-5.491-.032-2.29-1.033-4.211-2.941-5.45-2.502-1.625-3.984-1.554-6.939-.147-.23.11-1.483.723-1.864.903-.794.375-1.48.67-2.199.933-2.7.99-3.815 1.24-5.558 1.24a1.5 1.5 0 0 1 0-3c1.335 0 2.128-.178 4.546-1.064a22.986 22.986 0 0 0 1.93-.822c.357-.169 1.604-.779 1.856-.899 3.809-1.813 6.358-1.936 9.861.34 2.772 1.8 4.262 4.66 4.307 7.925.033 2.423-.739 4.941-2.183 7.166-4.542 6.993-13.343 7.431-21.61 2.063-1.61-1.045-2.656-1.918-3.819-3.202z"></path>
                                        <path d="M0 0h56v56H0z"></path>
                                    </g>
                                </svg>
                                <input id='input-fan' style={{ visibility: 'hidden' }} type="range" min='0' max='1' step='0.01' defaultValue='0.75' onChange={(e) => this.change(e)} ></input>
                            </div>
                        </div>

                        <div style={{ pointerEvents: 'none' }} data-key="tropical" className={"card  tropical"} onClick={(e) => this.onClick(e)}>
                            <div className="mask" ></div>
                            <div className="wrap">
                                <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56">
                                    <title>Tropical forest</title>
                                    <g fill="none" fillRule="evenodd">
                                        <path fill="currentColor" fillRule="nonzero" d="M16.247 29.681c2.174.923 3.317 2.832 2.481 4.7-.757 1.695-2.882 2.617-5.724 2.617H12.301c-6.09-.006-8.31.446-8.474 1.68-.179 1.345-.19 2.389-.099 4.191a432.9 432.9 0 0 0 .056 1.103c.135 2.939-.033 5.165-.823 8.383a1.5 1.5 0 0 1-2.914-.714c.716-2.916.863-4.86.74-7.531a95.926 95.926 0 0 0-.055-1.09c-.1-1.969-.087-3.175.122-4.739.286-2.152 1.941-3.349 4.524-3.875 1.681-.343 3.31-.412 6.926-.408h.7c1.786 0 2.808-.443 2.986-.841.044-.099-.124-.378-.915-.714-2.625-1.114-6.568-.65-11.81 1.534a1.5 1.5 0 0 1-2.076-1.385c0-1.522.004-1.937.03-2.517l.021-.37c.038-.604.084-1.07.273-2.864.228-2.171 1.967-3.39 4.667-3.925 1.877-.373 4.216-.439 7.328-.3.37.017 6.384.4 7.472.382 1.076-.017 1.138.032 1-.359-.32-.45-1.32-.895-3.078-1.157-1.353-.202-4.336-.153-8.08.082a156.37 156.37 0 0 0-4.015.304 67.589 67.589 0 0 0-1.434.144c-.228.054-.47.055-.71-.005-.121-.031-.121-.031-.352-.137-.35-.193-.35-.193-.749-.989.04-.798.049-.967.232-1.197l.1-.18a40.058 40.058 0 0 1 2.225-3.496c1.886-2.639 3.649-4.382 5.446-4.859 1.573-.416 3.66.101 9.378 1.914l.565.18c3.051.967 4.444 1.377 5.696 1.638.265.055.501.097.706.126-.271-1.079-1.268-1.787-4.646-3.704-.666-.378-1.483-.683-2.445-.921-1.094-.272-2.3-.445-3.819-.579-.507-.044-2.157-.168-2.104-.163-.793-.063-1.303-.12-1.736-.205-.839-.163-1.39-.4-1.77-1.058-.566-.983-.159-1.82.626-2.507C15.31 2.982 31.617-1.372 35.676.656c5.891 2.946 9.967 10.576 6.021 15.751a1.5 1.5 0 0 1-2.386-1.818c2.521-3.307-.534-9.028-4.978-11.25-2.274-1.137-12.639 1.303-17.777 3.418l.707.058c1.66.146 3.006.34 4.278.655 1.21.3 2.278.698 3.204 1.224 5.147 2.92 6.26 4.125 6.26 7.304 0 1.25-.917 1.927-2.065 2.041-.622.062-1.382-.02-2.347-.221-1.393-.29-2.831-.713-5.992-1.716l-.564-.179c-4.692-1.488-7-2.06-7.703-1.874-.882.234-2.289 1.625-3.773 3.703-.238.332-.47.673-.698 1.016.887-.07 1.834-.139 2.771-.198 3.97-.25 7.07-.3 8.71-.055 2.692.4 4.492 1.252 5.315 2.76a1.5 1.5 0 0 1 .1.225c.945 2.714-.673 4.448-3.73 4.498-1.229.02-7.402-.373-7.655-.384-5.698-.256-8.753.35-8.878 1.541-.183 1.744-.227 2.195-.262 2.74a18.631 18.631 0 0 0-.025.501c4.94-1.756 8.949-2.026 12.038-.715zm-10.92-7.663l.03-.006c.053-.008.053-.008.329-.115.133-.066.133-.066.382-.269.061-.065.112-.12.155-.17a1.5 1.5 0 0 1-.85.554 3.611 3.611 0 0 0-.047.006zm46.46-.142c-4.535-6.288-6.51-7.364-10.542-5.074a1.5 1.5 0 1 1-1.482-2.608c5.775-3.28 9.136-1.45 14.458 5.927 3.34 4.63 2.121 11.703-3.463 20.2-.71 1.082-2.365.817-2.702-.432-1.456-5.403-2.723-8.679-3.852-10.643a9.452 9.452 0 0 0-1.567-2.017c.073.728.427 2.074 1.297 4.815 2.45 7.721 2.81 10.416.803 13.31-1.914 2.757-10.117 7.058-16.266 9.07-1.928.63-3.31-.432-3.682-2.36-.218-1.127-.169-2.574.08-4.852.075-.7.378-3.192.405-3.42.528-4.55.413-7.077-.32-7.839-.042.114-.09.258-.138.432-.28 1.024-.341 1.543-.724 5.605a93.96 93.96 0 0 1-.2 1.943c-.667 5.809-1.89 8.92-5.104 9.538l-.617.12a34.803 34.803 0 0 1-3.139.463c-2.13.218-4.501.276-7.199.128a67.208 67.208 0 0 1-6.557-.701 1.5 1.5 0 0 1 .457-2.965c2.234.344 4.318.563 6.265.67 2.54.14 4.754.085 6.73-.116a31.812 31.812 0 0 0 2.88-.426l.613-.119c1.303-.25 2.179-2.478 2.691-6.935a91.18 91.18 0 0 0 .193-1.882c.41-4.357.467-4.836.818-6.117.65-2.37 2.203-3.605 4.324-2.396 2.537 1.445 2.755 4.506 2.007 10.944-.029.244-.33 2.72-.404 3.398-.215 1.98-.257 3.224-.116 3.957 5.533-1.833 13.14-5.835 14.538-7.85 1.228-1.771.934-3.978-1.197-10.692-1.448-4.56-1.704-5.964-1.243-7.326.065-.19.116-.314.246-.61.862-1.986 2.584-1.646 4.1-.424.944.76 1.933 1.952 2.627 3.159 1 1.741 2.055 4.286 3.198 8.038 3.43-6.175 3.91-10.967 1.785-13.913zm-26.7 13.773a.426.426 0 0 0 .006-.004l-.006.004z"></path>
                                        <path fill="currentColor" fillRule="nonzero" d="M33.183 11.368c-1.263-1.402-1.862-3.032-.855-3.939 1.007-.907 2.565-.14 3.828 1.263s1.863 3.032.856 3.94c-1.007.906-2.566.139-3.829-1.264zm.654-2.74a.235.235 0 0 0 .002-.016l-.002.016zm2.14 2.374a.176.176 0 0 0 .018.003l-.017-.003zM32.181 32.058c-.192-2.198.247-4.037 1.644-4.16 1.397-.121 2.149 1.613 2.341 3.811.192 2.198-.247 4.037-1.644 4.16-1.397.122-2.148-1.613-2.34-3.811zm2.182-2.322a.227.227 0 0 0 .012-.015l-.012.015zm.37 4.223a.331.331 0 0 0 .015.02l-.015-.02z"></path>
                                        <path d="M0 0h56v56H0z"></path>
                                    </g>
                                </svg>
                                <input id='input-tropical' style={{ visibility: 'hidden' }} type="range" min='0' max='1' step='0.01' defaultValue='0.75' onChange={(e) => this.change(e)} ></input>
                            </div>
                        </div>

                        <div style={{ pointerEvents: 'none' }} data-key="typewriter" className={"card  typewriter"} onClick={(e) => this.onClick(e)}>
                            <div className="mask" ></div>
                            <div className="wrap">
                                <svg xmlns="http://www.w3.org/2000/svg" width="50%" height="50%" viewBox="0 0 40 40">
                                    <g fill="none" fillRule="evenodd">
                                        <path fill="currentColor" fillRule="nonzero" d="M4,17 C4,15.8954305 4.8954305,15 6,15 L9.76923077,15 C10.8738003,15 11.7692308,15.8954305 11.7692308,17 L11.7692308,18.8888889 C11.7692308,19.4411736 12.216946,19.8888889 12.7692308,19.8888889 L27.2307692,19.8888889 C27.783054,19.8888889 28.2307692,19.4411736 28.2307692,18.8888889 L28.2307692,17 C28.2307692,15.8954305 29.1261997,15 30.2307692,15 L34,15 C35.1045695,15 36,15.8954305 36,17 L36,35 C36,37.209139 34.209139,39 32,39 L8,39 C5.790861,39 4,37.209139 4,35 L4,17 Z M6,17 L6,35 C6,36.1045695 6.8954305,37 8,37 L32,37 C33.1045695,37 34,36.1045695 34,35 L34,17 L30.2307692,17 L30.2307692,18.8888889 C30.2307692,20.5457431 28.8876235,21.8888889 27.2307692,21.8888889 L12.7692308,21.8888889 C11.1123765,21.8888889 9.76923077,20.5457431 9.76923077,18.8888889 L9.76923077,17 L6,17 Z"></path>
                                        <rect width="22" height="2" x="9" y="33" fill="#FFF" rx="1"></rect>
                                        <rect width="4" height="2" x="9" y="24" fill="#FFF" rx="1"></rect>
                                        <rect width="4" height="2" x="15" y="24" fill="#FFF" rx="1"></rect>
                                        <rect width="4" height="2" x="12" y="28" fill="#FFF" rx="1"></rect>
                                        <rect width="4" height="2" x="21" y="24" fill="#FFF" rx="1"></rect>
                                        <rect width="4" height="2" x="18" y="28" fill="#FFF" rx="1"></rect>
                                        <rect width="4" height="2" x="27" y="24" fill="#FFF" rx="1"></rect>
                                        <rect width="4" height="2" x="24" y="28" fill="#FFF" rx="1"></rect>
                                        <path fill="currentColor" fillRule="nonzero" d="M2 19L5 19C5.55228475 19 6 19.4477153 6 20L6 24C6 24.5522847 5.55228475 25 5 25L2 25C1.44771525 25 1 24.5522847 1 24L1 20C1 19.4477153 1.44771525 19 2 19zM35 19L38 19C38.5522847 19 39 19.4477153 39 20L39 24C39 24.5522847 38.5522847 25 38 25L35 25C34.4477153 25 34 24.5522847 34 24L34 20C34 19.4477153 34.4477153 19 35 19zM9 17C7.8954305 17 7 16.1045695 7 15L7 3C7 1.8954305 7.8954305 1 9 1L31 1C32.1045695 1 33 1.8954305 33 3L33 15C33 16.1045695 32.1045695 17 31 17L31 3 9 3 9 17z"></path>
                                        <path d="M0 0H40V40H0z"></path>
                                    </g>
                                </svg>
                                <input id='input-typewriter' style={{ visibility: 'hidden' }} type="range" min='0' max='1' step='0.01' defaultValue='0.75' onChange={(e) => this.change(e)} ></input>
                            </div>
                        </div>

                        <div style={{ pointerEvents: 'none' }} data-key="fan" className={"card  fan"} onClick={(e) => this.onClick(e)}>
                            <div className="mask" ></div>
                            <div className="wrap">
                                <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56">
                                    <title>Tropical forest</title>
                                    <g fill="none" fillRule="evenodd">
                                        <path fill="currentColor" fillRule="nonzero" d="M16.247 29.681c2.174.923 3.317 2.832 2.481 4.7-.757 1.695-2.882 2.617-5.724 2.617H12.301c-6.09-.006-8.31.446-8.474 1.68-.179 1.345-.19 2.389-.099 4.191a432.9 432.9 0 0 0 .056 1.103c.135 2.939-.033 5.165-.823 8.383a1.5 1.5 0 0 1-2.914-.714c.716-2.916.863-4.86.74-7.531a95.926 95.926 0 0 0-.055-1.09c-.1-1.969-.087-3.175.122-4.739.286-2.152 1.941-3.349 4.524-3.875 1.681-.343 3.31-.412 6.926-.408h.7c1.786 0 2.808-.443 2.986-.841.044-.099-.124-.378-.915-.714-2.625-1.114-6.568-.65-11.81 1.534a1.5 1.5 0 0 1-2.076-1.385c0-1.522.004-1.937.03-2.517l.021-.37c.038-.604.084-1.07.273-2.864.228-2.171 1.967-3.39 4.667-3.925 1.877-.373 4.216-.439 7.328-.3.37.017 6.384.4 7.472.382 1.076-.017 1.138.032 1-.359-.32-.45-1.32-.895-3.078-1.157-1.353-.202-4.336-.153-8.08.082a156.37 156.37 0 0 0-4.015.304 67.589 67.589 0 0 0-1.434.144c-.228.054-.47.055-.71-.005-.121-.031-.121-.031-.352-.137-.35-.193-.35-.193-.749-.989.04-.798.049-.967.232-1.197l.1-.18a40.058 40.058 0 0 1 2.225-3.496c1.886-2.639 3.649-4.382 5.446-4.859 1.573-.416 3.66.101 9.378 1.914l.565.18c3.051.967 4.444 1.377 5.696 1.638.265.055.501.097.706.126-.271-1.079-1.268-1.787-4.646-3.704-.666-.378-1.483-.683-2.445-.921-1.094-.272-2.3-.445-3.819-.579-.507-.044-2.157-.168-2.104-.163-.793-.063-1.303-.12-1.736-.205-.839-.163-1.39-.4-1.77-1.058-.566-.983-.159-1.82.626-2.507C15.31 2.982 31.617-1.372 35.676.656c5.891 2.946 9.967 10.576 6.021 15.751a1.5 1.5 0 0 1-2.386-1.818c2.521-3.307-.534-9.028-4.978-11.25-2.274-1.137-12.639 1.303-17.777 3.418l.707.058c1.66.146 3.006.34 4.278.655 1.21.3 2.278.698 3.204 1.224 5.147 2.92 6.26 4.125 6.26 7.304 0 1.25-.917 1.927-2.065 2.041-.622.062-1.382-.02-2.347-.221-1.393-.29-2.831-.713-5.992-1.716l-.564-.179c-4.692-1.488-7-2.06-7.703-1.874-.882.234-2.289 1.625-3.773 3.703-.238.332-.47.673-.698 1.016.887-.07 1.834-.139 2.771-.198 3.97-.25 7.07-.3 8.71-.055 2.692.4 4.492 1.252 5.315 2.76a1.5 1.5 0 0 1 .1.225c.945 2.714-.673 4.448-3.73 4.498-1.229.02-7.402-.373-7.655-.384-5.698-.256-8.753.35-8.878 1.541-.183 1.744-.227 2.195-.262 2.74a18.631 18.631 0 0 0-.025.501c4.94-1.756 8.949-2.026 12.038-.715zm-10.92-7.663l.03-.006c.053-.008.053-.008.329-.115.133-.066.133-.066.382-.269.061-.065.112-.12.155-.17a1.5 1.5 0 0 1-.85.554 3.611 3.611 0 0 0-.047.006zm46.46-.142c-4.535-6.288-6.51-7.364-10.542-5.074a1.5 1.5 0 1 1-1.482-2.608c5.775-3.28 9.136-1.45 14.458 5.927 3.34 4.63 2.121 11.703-3.463 20.2-.71 1.082-2.365.817-2.702-.432-1.456-5.403-2.723-8.679-3.852-10.643a9.452 9.452 0 0 0-1.567-2.017c.073.728.427 2.074 1.297 4.815 2.45 7.721 2.81 10.416.803 13.31-1.914 2.757-10.117 7.058-16.266 9.07-1.928.63-3.31-.432-3.682-2.36-.218-1.127-.169-2.574.08-4.852.075-.7.378-3.192.405-3.42.528-4.55.413-7.077-.32-7.839-.042.114-.09.258-.138.432-.28 1.024-.341 1.543-.724 5.605a93.96 93.96 0 0 1-.2 1.943c-.667 5.809-1.89 8.92-5.104 9.538l-.617.12a34.803 34.803 0 0 1-3.139.463c-2.13.218-4.501.276-7.199.128a67.208 67.208 0 0 1-6.557-.701 1.5 1.5 0 0 1 .457-2.965c2.234.344 4.318.563 6.265.67 2.54.14 4.754.085 6.73-.116a31.812 31.812 0 0 0 2.88-.426l.613-.119c1.303-.25 2.179-2.478 2.691-6.935a91.18 91.18 0 0 0 .193-1.882c.41-4.357.467-4.836.818-6.117.65-2.37 2.203-3.605 4.324-2.396 2.537 1.445 2.755 4.506 2.007 10.944-.029.244-.33 2.72-.404 3.398-.215 1.98-.257 3.224-.116 3.957 5.533-1.833 13.14-5.835 14.538-7.85 1.228-1.771.934-3.978-1.197-10.692-1.448-4.56-1.704-5.964-1.243-7.326.065-.19.116-.314.246-.61.862-1.986 2.584-1.646 4.1-.424.944.76 1.933 1.952 2.627 3.159 1 1.741 2.055 4.286 3.198 8.038 3.43-6.175 3.91-10.967 1.785-13.913zm-26.7 13.773a.426.426 0 0 0 .006-.004l-.006.004z"></path>
                                        <path fill="currentColor" fillRule="nonzero" d="M33.183 11.368c-1.263-1.402-1.862-3.032-.855-3.939 1.007-.907 2.565-.14 3.828 1.263s1.863 3.032.856 3.94c-1.007.906-2.566.139-3.829-1.264zm.654-2.74a.235.235 0 0 0 .002-.016l-.002.016zm2.14 2.374a.176.176 0 0 0 .018.003l-.017-.003zM32.181 32.058c-.192-2.198.247-4.037 1.644-4.16 1.397-.121 2.149 1.613 2.341 3.811.192 2.198-.247 4.037-1.644 4.16-1.397.122-2.148-1.613-2.34-3.811zm2.182-2.322a.227.227 0 0 0 .012-.015l-.012.015zm.37 4.223a.331.331 0 0 0 .015.02l-.015-.02z"></path>
                                        <path d="M0 0h56v56H0z"></path>
                                    </g>
                                </svg>
                                <input id='input-fan' style={{ visibility: 'hidden' }} type="range" min='0' max='1' step='0.01' defaultValue='0.75' onChange={(e) => this.change(e)} ></input>
                            </div>
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
                        <input id='input-wind' style={{ visibility: 'hidden' }} type="range" min='0' max='1' step='0.01' defaultValue='0.75' onChange={(e) => this.change(e)} ></input>
                    </div> */}
                    </div>
                </div>
            </div>
        )
    }
}
