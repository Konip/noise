import _ from 'lodash';
import React from 'react';
import bonfire from '../../assets/music/bonfire_128.txt';
import coffeeShop from '../../assets/music/coffeeShop_128.txt';
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
import { base64ToBuffer } from '../../utils/base64ToBuffer';
import { randomNumber } from '../../utils/randomNumber';
import { randomPlalist } from '../../utils/randomPlaylist';
import PlayListContainer from '../PlayList/PlayListContainer';
import TooltipUpgrade from '../Tooltip/TooltipUpgrade';
import './Body.css';

interface BodyFormProps {
    openModal(activeModal: boolean, typeModal: string): void
    setPage(page: string): void
    isAuth: boolean
    type: string
}

interface Iobj {
    [key: string]: any
}
interface premium {
    [key: string]: string
}

interface BodyFormState {
    muted: boolean
    playList: string
    playListActive: Iobj
    standardSoundsLoaded: boolean
    premiumSoundsLoaded: boolean
    data: Iobj
}

interface IplayListStandard {
    [key: string]: {
        [key: string]: {
            [key: string]: number
        }
    }
}


const objStandard: Iobj = {
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
}
const objPremium: Iobj = {
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
    'fan': 'fan',
    'typewriter': 'typewriter',
    'bazar': 'bazar',
    'tropical': 'tropical',
}

const premium: premium = {
    'fan': 'https://dl.dropbox.com/s/z3zb04gd0x6lwem/fan_128.mp3?dl=1',
    'typewriter': 'https://dl.dropbox.com/s/2h1epz1moabr74v/typewriter.mp3?dl=1',
    'bazar': 'https://dl.dropbox.com/s/b1273snrdkxgw2x/bazar.mp3?dl=0',
    'tropical': 'https://dl.dropbox.com/s/m9awmsk5h42byuv/tropicalForest.mp3?dl=0'
}

const playListStandard: Readonly<IplayListStandard> = {
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
            // "fan": 0.53
        },
        5: {
            "rain": 0.87,
            "thunderstorm": 0.25,
            "wind": 0.5,
            "coffeeShop": 1
        }

    },
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
            // "fan": 0.2,
        },
        5: {
            "thunderstorm": 0.15,
            "seaside": 0.15,
            "summerNight": 0.1,
        },

    }
}
const playListPremium: Readonly<IplayListStandard> = {
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
let constantNode = aCtx.createGain(),
    volume1: number = 1,
    playlistNumber: number

document.addEventListener("DOMContentLoaded", () => {
    let PlayMasterVolumeController = document.querySelector('.PlayMasterVolumeController')

    let volumeController = document.querySelector('.volumeController')
    let mouseover = document.querySelector('.mouseover')

    PlayMasterVolumeController?.addEventListener("mouseover", () => {
        volumeController!.className = "volumeController-active"
    })

    mouseover?.addEventListener("mouseover", () => {
        volumeController!.className = "volumeController"
    })
})

export class Body extends React.Component<BodyFormProps, BodyFormState>   {

    constructor(props: BodyFormProps) {

        super(props)

        this.state = {
            muted: false,
            playList: '',
            playListActive: {},
            standardSoundsLoaded: false,
            premiumSoundsLoaded: false,
            data: {}
        }

        this.changeSoundVolume = this.changeSoundVolume.bind(this)
        this.onClick = this.onClick.bind(this)
        this.openRegistrationTool = this.openRegistrationTool.bind(this)
        this.changeGeneralSound = this.changeGeneralSound.bind(this)
        this.muteTheSound = this.muteTheSound.bind(this)
        this.startPlaylist = this.startPlaylist.bind(this)
        this.resetSounds = this.resetSounds.bind(this)
        this.savePlaylist = this.savePlaylist.bind(this)
        this.resetPlaylist = this.resetPlaylist.bind(this)
    }

    componentDidMount() {

        for (let key in objStandard) {

            let gainNode = aCtx.createGain()
            gainNode.gain.value = 0.75
            let source = aCtx.createBufferSource();

            fetch(objStandard[key])
                .then(response => response.text())
                .then(text => {
                    var audioFromString = base64ToBuffer(text);

                    aCtx.decodeAudioData(audioFromString, (buffer) => {
                        source.buffer = buffer
                        source.loop = true;

                        source.connect(gainNode);
                        gainNode.connect(constantNode)
                        constantNode.connect(aCtx.destination);

                        (document.querySelector(`[data-key=${key}]`) as HTMLElement).style.pointerEvents = 'auto';

                        this.setState(state => {
                            state.data[key] = {
                                active: false,
                                source: source,
                                gainNode: gainNode,
                                firstStart: true
                            }
                        })
                    })
                })
        }
    }

    componentDidUpdate(prevProps: Readonly<BodyFormProps>, prevState: Readonly<BodyFormState>) {
    
        if (this.props.isAuth !== prevProps.isAuth) {

            let count: number = Object.keys(premium).length

            if (!this.state.premiumSoundsLoaded) {

                for (let key in premium) {

                    let buf;
                    let gainNode = aCtx.createGain()
                    gainNode.gain.value = 0.5
                    let source = aCtx.createBufferSource();

                    fetch(premium[key])
                        .then(resp => resp.arrayBuffer())
                        .then(buf => aCtx.decodeAudioData(buf))
                        .then(decoded => {
                            source.buffer = buf = decoded;
                            source.loop = true;

                            source.connect(gainNode);
                            gainNode.connect(constantNode)
                            constantNode.connect(aCtx.destination);

                            (document.querySelector(`[data-key=${key}]`) as HTMLElement).style.pointerEvents = 'auto';
                            count--

                            this.setState(state => {
                                state.data[key] = {
                                    active: false,
                                    source: source,
                                    gainNode: gainNode,
                                    firstStart: true
                                }
                            })

                            if (count === 0) {
                                this.setState({ premiumSoundsLoaded: true })
                            }
                        });
                }
            } else if (this.state.premiumSoundsLoaded && !this.props.isAuth) {
                if (this.state.playListActive !== prevState.playListActive) {
                    this.resetSounds()
                }
            }
        }
    }

    changeSoundVolume(e: React.ChangeEvent<HTMLInputElement>) {
        const value: number = Number(e.target.value)
        let key = e.target.id.replace('input-', '');
        this.setState(state => {
            state.data[key].gainNode.gain.value = value
            state.playListActive[key] = value
        })
    }

    onClick(e: React.MouseEvent) {

        const element = e.target as Element
        let target: string = element.localName
        let input: string
        let key: string

        if (this.state.playList) {
            this.setState({ playList: '' })
        }

        switch (target) {
            case 'path':
                input = element!.parentNode!.parentNode!.parentNode!.lastElementChild!.id
                key = input.replace('input-', '');
                break;
            case 'svg':
                input = element!.parentNode!.lastElementChild!.id
                key = input.replace('input-', '');
                break;
            case 'input':
                input = element.id
                key = input.replace('input-', '');
                break;
            default:
                input = element!.lastElementChild!.id
                key = input.replace('input-', '');
                break;
        }

        if (target !== 'input') {
            const data = _.cloneDeep(this.state.data)
            const playListActive = _.cloneDeep(this.state.playListActive)
            let value = data[key].gainNode.gain.value
            data[key].active = !data[key].active

            if (data[key].active === true) {
                playListActive[key] = value
            } else {
                delete playListActive[key]
            }

            if (data[key].active === true) {

                if (data[key].firstStart === true) {

                    data[key].source.start(0)
                    data[key].firstStart = false

                } else {
                    data[key].source.connect(data[key].gainNode);
                }
                (document.getElementById(`${input}`) as HTMLElement).style.visibility = 'visible';
                (document.querySelector(`[data-key=${key}]`) as HTMLElement).classList.add('active')

            } else if (data[key].active === false) {
                data[key].source.disconnect(data[key].gainNode);
                (document.getElementById(`${input}`) as HTMLElement).style.visibility = 'hidden';
                (document.querySelector(`[data-key=${key}]`) as HTMLElement).classList.remove('active')
            }
            this.setState({
                data,
                playListActive
            })
        }
    }

    openRegistrationTool() {

        this.props.openModal(true, "Sign up")
        let tool = (document.querySelector('.tool') as HTMLElement)
        tool.style.opacity = '0'

        setTimeout(() => {
            tool.style.opacity = '1'
        }, 500)
    }

    changeGeneralSound(e: React.ChangeEvent<HTMLInputElement>) {
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

    muteTheSound() {
        let muted = this.state.muted,
            volumeController = (document.querySelector('.volumeController-active') as HTMLInputElement)

        if (muted) {
            constantNode.gain.value = volume1
            volumeController!.value = (volume1.toLocaleString())
            this.setState({ muted: false })
        } else if (!muted) {
            constantNode.gain.value = 0
            volumeController.value = (volume1.toLocaleString())
            this.setState({ muted: true })
        }
    }

    resetSounds() {
        
        const data = _.cloneDeep(this.state.data)
        const playListActive = _.cloneDeep(this.state.playListActive)

        for (let key in playListActive) {
            let input = `input-${key}`
            data[key].active = false
           
            data[key].source.disconnect(data[key].gainNode);
            (document.getElementById(`${input}`) as HTMLElement).style.visibility = 'hidden';
            (document.querySelector(`[data-key=${key}]`) as HTMLElement).classList.remove('active')
        }

        this.setState({
            data,
            playList: '',
            playListActive: {}
        })

        return data
    }

    startPlaylist(name: string, object: object) {

        let play: any = {}
        let res = this.resetSounds()

        if (name !== 'Favorites' && !object) {
            if (name !== 'Random') {

                let playlist = this.props.isAuth ? _.cloneDeep(playListPremium) : _.cloneDeep(playListStandard)
                let number: number = randomNumber(playlist[name]);

                if (number == playlistNumber) {
                    number == 1 ? number++ : number--
                }
                if (!Object.keys(this.state.playListActive).length) {
                    playlistNumber = number
                }

                playlistNumber = number
                play = playlist[name][playlistNumber.toLocaleString()]
            } else {
                let obj = this.props.isAuth ? objPremium : objStandard
                play = randomPlalist(obj)
            }
        }

        if (object) {
            play = object
        }

        const data = res

        for (let key in play) {

            let input: string = `input-${key}`
            let value: number = play[key]

            data[key].active = true
            data[key].gainNode.gain.value = value;

            (document.querySelector(`#${input}`) as HTMLInputElement).value = (value.toLocaleString());

            if (data[key].firstStart === true) {
                data[key].source.start(0)
                data[key].firstStart = false
            } else {
                data[key].source.connect(data[key].gainNode);
            }
            (document.getElementById(`${input}`) as HTMLElement).style.visibility = 'visible';
            (document.querySelector(`[data-key=${key}]`) as HTMLElement).classList.add('active')

        }
        this.setState({
            data,
            playList: name,
            playListActive: play
        })
    }

    savePlaylist() {
        this.setState({ playList: 'Favorites' })
    }

    resetPlaylist() {
        this.setState({ playList: '' })
    }

    render() {
        const { isAuth } = this.props

        return (
            <div className='body'>

                <div className="sound" >
                    <input className="volumeController" type="range" min='0' max='1' step='0.01' onChange={(e) => this.changeGeneralSound(e)} ></input>
                    <div className="PlayMasterVolumeController" onClick={this.muteTheSound}>
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

                <PlayListContainer startPlaylist={this.startPlaylist} resetSounds={this.resetSounds} playlist={this.state.playList}
                    playListActive={this.state.playListActive} savePlaylist={this.savePlaylist}
                    resetPlaylist={this.resetPlaylist}
                />

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
                            <input id='input-rain' style={{ visibility: 'hidden' }} type="range" min='0' max='1' step='0.01'
                                defaultValue='0.75' onChange={(e) => this.changeSoundVolume(e)} ></input>
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
                            <input id='input-thunderstorm' style={{ visibility: 'hidden' }} type="range" min='0' max='1' step='0.01'
                                defaultValue='0.75' onChange={(e) => this.changeSoundVolume(e)} ></input>
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
                            <input id='input-wind' style={{ visibility: 'hidden' }} type="range" min='0' max='1' step='0.01'
                                defaultValue='0.75' onChange={(e) => this.changeSoundVolume(e)} ></input>
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
                            <input id='input-forest' style={{ visibility: 'hidden' }} type="range" min='0' max='1' step='0.01'
                                defaultValue='0.75' onChange={(e) => this.changeSoundVolume(e)} ></input>
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
                            <input id='input-leaves' style={{ visibility: 'hidden' }} type="range" min='0' max='1' step='0.01'
                                defaultValue='0.75' onChange={(e) => this.changeSoundVolume(e)} ></input>
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
                            <input id='input-waterStream' style={{ visibility: 'hidden' }} type="range" min='0' max='1' step='0.01'
                                defaultValue='0.75' onChange={(e) => this.changeSoundVolume(e)} ></input>
                        </div>

                        <div style={{ pointerEvents: 'none' }} data-key="seaside" className={"card  seaside"} onClick={(e) => this.onClick(e)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56">
                                <title>Seaside</title>
                                <g fill="none" fillRule="evenodd">
                                    <path fill="currentColor" fillRule="nonzero" d="M53.264 11.65a1.5 1.5 0 0 1 2.472 1.7C53.604 16.452 50.216 18 45.75 18c-4.467 0-7.854-1.548-9.986-4.65a1.5 1.5 0 0 1 2.472-1.7C39.77 13.882 42.216 15 45.75 15c3.533 0 5.98-1.118 7.514-3.35zm-35.5 0a1.5 1.5 0 0 1 2.472 1.7C18.104 16.452 14.716 18 10.25 18c-4.467 0-7.854-1.548-9.986-4.65a1.5 1.5 0 1 1 2.472-1.7C4.27 13.882 6.716 15 10.25 15c3.533 0 5.98-1.118 7.514-3.35zm.036 1.75a1.5 1.5 0 1 1 2.4-1.8c1.7 2.267 4.25 3.4 7.8 3.4s6.1-1.133 7.8-3.4a1.5 1.5 0 1 1 2.4 1.8C35.9 16.466 32.45 18 28 18c-4.45 0-7.9-1.534-10.2-4.6zm35.464 11.25a1.5 1.5 0 0 1 2.472 1.7C53.604 29.452 50.216 31 45.75 31c-4.467 0-7.854-1.548-9.986-4.65a1.5 1.5 0 0 1 2.472-1.7C39.77 26.882 42.216 28 45.75 28c3.533 0 5.98-1.118 7.514-3.35zm-35.5 0a1.5 1.5 0 0 1 2.472 1.7C18.104 29.452 14.716 31 10.25 31c-4.467 0-7.854-1.548-9.986-4.65a1.5 1.5 0 1 1 2.472-1.7C4.27 26.882 6.716 28 10.25 28c3.533 0 5.98-1.118 7.514-3.35zm.036 1.75a1.5 1.5 0 1 1 2.4-1.8c1.7 2.267 4.25 3.4 7.8 3.4s6.1-1.133 7.8-3.4a1.5 1.5 0 1 1 2.4 1.8C35.9 29.466 32.45 31 28 31c-4.45 0-7.9-1.534-10.2-4.6zm35.464 11.25a1.5 1.5 0 0 1 2.472 1.7C53.604 42.452 50.216 44 45.75 44c-4.467 0-7.854-1.548-9.986-4.65a1.5 1.5 0 0 1 2.472-1.7C39.77 39.882 42.216 41 45.75 41c3.533 0 5.98-1.118 7.514-3.35zm-35.5 0a1.5 1.5 0 0 1 2.472 1.7C18.104 42.452 14.716 44 10.25 44c-4.467 0-7.854-1.548-9.986-4.65a1.5 1.5 0 1 1 2.472-1.7C4.27 39.882 6.716 41 10.25 41c3.533 0 5.98-1.118 7.514-3.35zm.036 1.75a1.5 1.5 0 1 1 2.4-1.8c1.7 2.267 4.25 3.4 7.8 3.4s6.1-1.133 7.8-3.4a1.5 1.5 0 1 1 2.4 1.8C35.9 42.466 32.45 44 28 44c-4.45 0-7.9-1.534-10.2-4.6z"></path>
                                    <path d="M0 0h56v56H0z"></path>
                                </g>
                            </svg>
                            <input id='input-seaside' style={{ visibility: 'hidden' }} type="range" min='0' max='1' step='0.01'
                                defaultValue='0.75' onChange={(e) => this.changeSoundVolume(e)} ></input>
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
                            <input id='input-water' style={{ visibility: 'hidden' }} type="range" min='0' max='1' step='0.01'
                                defaultValue='0.75' onChange={(e) => this.changeSoundVolume(e)} ></input>
                        </div>

                        <div style={{ pointerEvents: 'none' }} data-key="bonfire" className={"card  bonfire"} onClick={(e) => this.onClick(e)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56">
                                <title>Bonfire</title>
                                <g fill="none" fillRule="evenodd">
                                    <path fill="currentColor" fillRule="nonzero" d="M13.69 28.026C12.564 30.599 12 33.585 12 37c0 8.837 7.163 16 16 16s16-7.163 16-16c0-2.65-1.061-5.295-4.043-7.863-1.558-1.343-2.56-2.577-3.161-3.903a7.859 7.859 0 0 1-.517-1.475c-.315 1.388-.422 3.265-.282 5.653.092 1.563-1.97 2.204-2.78.864-2.673-4.418-3.15-8.47-1.316-12.41 1.848-3.97 2.21-7.559 1.092-10.85-.717 3.747-2.933 7-6.606 9.694-4.621 3.388-7.076 8.299-7.389 14.861-.062 1.301-1.638 1.91-2.559.99-1.389-1.39-2.308-2.91-2.75-4.535zm2.85-.966c1.104-5.357 3.799-9.635 8.073-12.77 4.55-3.336 6.308-7.439 5.41-12.53C29.756.25 31.66-.64 32.648.536c4.538 5.398 5.19 11.69 1.972 18.598a8.712 8.712 0 0 0-.693 2.156c.651-1.528 1.634-2.59 2.982-3.168A1.5 1.5 0 0 1 39 19.5v.255c-.002 2.451.083 3.259.528 4.24.402.887 1.135 1.79 2.387 2.868C45.603 30.04 47 33.524 47 37c0 10.493-8.507 19-19 19S9 47.493 9 37c0-6.341 1.783-11.527 5.366-15.482a1.494 1.494 0 0 1 .778-.475 1.508 1.508 0 0 1 1.365.347 1.511 1.511 0 0 1 .448.754 1.491 1.491 0 0 1-.06.906c-.53 1.446-.651 2.771-.358 4.01z"></path>
                                    <path d="M0 0h56v56H0z"></path>
                                </g>
                            </svg>
                            <input id='input-bonfire' style={{ visibility: 'hidden' }} type="range" min='0' max='1' step='0.01'
                                defaultValue='0.75' onChange={(e) => this.changeSoundVolume(e)} ></input>
                        </div>

                        <div style={{ pointerEvents: 'none' }} data-key="summerNight" className={"card  summer-night"} onClick={(e) => this.onClick(e)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56">
                                <title>Summer night</title>
                                <g fill="none" fillRule="evenodd">
                                    <path fill="currentColor" fillRule="nonzero" d="M5 28c0 13.807 11.193 25 25 25 5.831 0 11.434-2.192 15.91-5.972-.957.108-1.924.163-2.898.163C28.872 47.191 17.5 36.028 17.5 22a25.456 25.456 0 0 1 8.06-18.607C13.871 5.488 5 15.708 5 28zM31.288 2.785A22.482 22.482 0 0 0 20.5 22c0 12.359 10.017 22.191 22.512 22.191 2.414 0 4.775-.38 7.02-1.116 1.427-.468 2.58 1.217 1.627 2.377C46.275 52.007 38.37 56 30 56 14.536 56 2 43.464 2 28S14.536 0 30 0c.178 0 .356.002.534.005 1.5.028 2.034 1.998.754 2.78z"></path>
                                    <path d="M0 0h56v56H0z"></path>
                                </g>
                            </svg>
                            <input id='input-summerNight' style={{ visibility: 'hidden' }} type="range" min='0' max='1' step='0.01'
                                defaultValue='0.75' onChange={(e) => this.changeSoundVolume(e)} ></input>
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
                            <input id='input-coffeeShop' style={{ visibility: 'hidden' }} type="range" min='0' max='1' step='0.01'
                                defaultValue='0.75' onChange={(e) => this.changeSoundVolume(e)} ></input>
                        </div>

                        <div style={{ pointerEvents: 'none' }} data-key="train" className={"card  train"} onClick={(e) => this.onClick(e)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56">
                                <title>Train</title>
                                <g fill="none" fillRule="evenodd">
                                    <path fill="currentColor" fillRule="nonzero" d="M15 1.5a1.5 1.5 0 0 1 3 0v53a1.5 1.5 0 0 1-3 0v-53zM37 47v3H19v-3h18zm5 0h2.5a1.5 1.5 0 0 1 0 3H42v-3zm-5-10v3H19v-3h18zm5 0h2.5a1.5 1.5 0 0 1 0 3H42v-3zm-5-10v3H19v-3h18zm5 0h2.5a1.5 1.5 0 0 1 0 3H42v-3zm-5-10v3H19v-3h18zm5 0h2.5a1.5 1.5 0 0 1 0 3H42v-3zM37 7v3H19V7h18zm5 0h2.5a1.5 1.5 0 0 1 0 3H42V7zM14 47v3h-2.5a1.5 1.5 0 0 1 0-3H14zm0-10v3h-2.5a1.5 1.5 0 0 1 0-3H14zm0-10v3h-2.5a1.5 1.5 0 0 1 0-3H14zm0-10v3h-2.5a1.5 1.5 0 0 1 0-3H14zm0-10v3h-2.5a1.5 1.5 0 0 1 0-3H14zm24-5.5a1.5 1.5 0 0 1 3 0v53a1.5 1.5 0 0 1-3 0v-53z"></path>
                                    <path d="M0 0h56v56H0z"></path>
                                </g>
                            </svg>
                            <input id='input-train' style={{ visibility: 'hidden' }} type="range" min='0' max='1' step='0.01'
                                defaultValue='0.75' onChange={(e) => this.changeSoundVolume(e)} ></input>
                        </div>
                    </div>

                    <div className={isAuth ? "premium" : "premium tooltip-active"} >

                        <TooltipUpgrade openRegistrationTool={this.openRegistrationTool} />

                        <div style={{ pointerEvents: 'none' }} data-key="fan" className={"card  fan prem"} onClick={(e) => isAuth ? this.onClick(e) : null}>
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
                                <input id='input-fan' style={{ visibility: 'hidden' }} type="range" min='0' max='1' step='0.01'
                                    defaultValue='0.5' onChange={(e) => this.changeSoundVolume(e)} ></input>
                            </div>
                        </div>

                        <div style={{ pointerEvents: 'none' }} data-key="tropical" className={"card  tropical"} onClick={(e) => isAuth ? this.onClick(e) : null}>
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
                                <input id='input-tropical' style={{ visibility: 'hidden' }} type="range" min='0' max='1' step='0.01'
                                    defaultValue='0.5' onChange={(e) => this.changeSoundVolume(e)} ></input>
                            </div>
                        </div>

                        <div style={{ pointerEvents: 'none' }} data-key="typewriter" className={"card  typewriter"} onClick={(e) => isAuth ? this.onClick(e) : null}>
                            <div className="mask" ></div>
                            <div className="wrap">
                                <svg xmlns="http://www.w3.org/2000/svg" width="56%" height="56%" viewBox="0 0 40 40">
                                    <title>Typewriter</title>
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
                                <input id='input-typewriter' style={{ visibility: 'hidden' }} type="range" min='0' max='1' step='0.01'
                                    defaultValue='0.5' onChange={(e) => this.changeSoundVolume(e)} ></input>
                            </div>
                        </div>

                        <div style={{ pointerEvents: 'none' }} data-key="bazar" className={"card  bazar"} onClick={(e) => isAuth ? this.onClick(e) : null}>
                            <div className="mask" ></div>
                            <div className="wrap">
                                <svg xmlns="http://www.w3.org/2000/svg" width="58px" height="58px" viewBox="0 0 56 56">
                                    <title>Bazar</title>
                                    <g id="surface1">
                                        <path fill="currentColor" stroke='none' fillRule='nonzero' strokeWidth='1' fillOpacity='1' d="M 8.707031 0.175781 C 7.789062 0.394531 6.8125 0.953125 6.125 1.640625 C 5.292969 2.472656 0.492188 10.03125 0.207031 10.960938 C -0.0429688 11.757812 -0.0546875 12.4375 0.175781 13.289062 C 0.480469 14.480469 1.269531 15.53125 2.265625 16.101562 L 2.84375 16.429688 L 2.84375 25.933594 C 2.84375 33.730469 2.820312 35.4375 2.703125 35.4375 C 2.265625 35.4375 1.355469 35.820312 0.972656 36.171875 C -0.449219 37.460938 -0.25 39.691406 1.367188 40.644531 L 1.859375 40.929688 L 1.859375 50.585938 L 1.519531 50.738281 C 0.625 51.132812 0.0546875 52.085938 0.0664062 53.210938 C 0.0664062 54.347656 0.558594 55.15625 1.585938 55.714844 L 2.023438 55.945312 L 53.976562 55.945312 L 54.414062 55.703125 C 55.421875 55.167969 55.933594 54.316406 55.945312 53.210938 C 55.945312 52.085938 55.375 51.132812 54.480469 50.738281 L 54.140625 50.585938 L 54.140625 40.929688 L 54.632812 40.644531 C 56.261719 39.679688 56.449219 37.40625 54.992188 36.160156 C 54.589844 35.808594 53.714844 35.4375 53.296875 35.4375 C 53.179688 35.4375 53.15625 33.730469 53.15625 25.933594 L 53.15625 16.429688 L 53.734375 16.101562 C 55.484375 15.105469 56.394531 12.863281 55.792969 10.960938 C 55.507812 10.039062 50.707031 2.472656 49.863281 1.628906 C 49.175781 0.929688 48.234375 0.40625 47.226562 0.164062 C 46.222656 -0.078125 9.691406 -0.0664062 8.707031 0.175781 Z M 47.480469 2.199219 C 48.386719 2.625 48.835938 3.140625 50.3125 5.46875 C 51.054688 6.640625 52.050781 8.203125 52.523438 8.9375 L 53.375 10.28125 L 45.433594 10.28125 L 44.582031 8.148438 C 43.695312 5.929688 43.464844 5.578125 42.90625 5.578125 C 42.570312 5.578125 42 6.136719 42 6.476562 C 42 6.617188 42.230469 7.296875 42.503906 7.984375 C 42.777344 8.671875 43.105469 9.472656 43.214844 9.757812 L 43.421875 10.28125 L 34.5625 10.28125 L 34.5625 9.265625 C 34.5625 8.136719 34.441406 7.789062 33.972656 7.570312 C 33.609375 7.382812 33.21875 7.46875 32.921875 7.789062 C 32.734375 7.996094 32.703125 8.171875 32.703125 9.15625 L 32.703125 10.28125 L 23.296875 10.28125 L 23.296875 9.15625 C 23.296875 8.171875 23.265625 7.996094 23.078125 7.789062 C 22.78125 7.46875 22.390625 7.382812 22.027344 7.570312 C 21.558594 7.789062 21.4375 8.136719 21.4375 9.265625 L 21.4375 10.28125 L 12.578125 10.28125 L 12.808594 9.703125 C 13.714844 7.449219 14 6.660156 14 6.464844 C 14 6.148438 13.5625 5.699219 13.179688 5.621094 C 12.566406 5.5 12.347656 5.820312 11.417969 8.148438 L 10.566406 10.28125 L 2.625 10.28125 L 3.476562 8.9375 C 3.949219 8.203125 4.945312 6.640625 5.6875 5.46875 C 7.371094 2.8125 7.90625 2.273438 9.15625 1.980469 C 9.394531 1.925781 17.566406 1.890625 28.21875 1.890625 L 46.867188 1.914062 Z M 10.28125 12.28125 C 10.28125 12.664062 9.921875 13.550781 9.625 13.914062 C 9.4375 14.132812 9.011719 14.449219 8.664062 14.625 C 8.050781 14.929688 8.007812 14.929688 6.070312 14.929688 C 4.234375 14.929688 4.070312 14.90625 3.523438 14.667969 C 2.84375 14.359375 2.265625 13.738281 2.035156 13.039062 C 1.695312 12.054688 1.3125 12.140625 6.070312 12.140625 C 9.484375 12.140625 10.28125 12.164062 10.28125 12.28125 Z M 21.4375 12.4375 C 21.4375 13.222656 20.585938 14.351562 19.699219 14.753906 C 19.109375 15.015625 14.460938 15.007812 13.878906 14.742188 C 12.992188 14.328125 12.328125 13.484375 12.183594 12.601562 L 12.109375 12.140625 L 21.4375 12.140625 Z M 32.636719 12.546875 C 32.527344 13.179688 32.035156 14 31.578125 14.339844 C 30.832031 14.886719 30.539062 14.929688 28 14.929688 C 25.460938 14.929688 25.167969 14.886719 24.421875 14.339844 C 23.964844 14 23.472656 13.179688 23.363281 12.546875 L 23.285156 12.140625 L 32.714844 12.140625 Z M 43.816406 12.601562 C 43.671875 13.484375 43.007812 14.328125 42.121094 14.742188 C 41.539062 15.007812 36.890625 15.015625 36.300781 14.753906 C 35.414062 14.351562 34.5625 13.222656 34.5625 12.4375 L 34.5625 12.140625 L 43.890625 12.140625 Z M 54.140625 12.335938 C 54.140625 12.742188 53.789062 13.550781 53.429688 13.96875 C 53.222656 14.207031 52.796875 14.523438 52.476562 14.667969 C 51.929688 14.90625 51.765625 14.929688 49.929688 14.929688 C 47.992188 14.929688 47.949219 14.929688 47.335938 14.625 C 46.988281 14.449219 46.5625 14.132812 46.375 13.914062 C 46.078125 13.550781 45.71875 12.664062 45.71875 12.28125 C 45.71875 12.164062 46.515625 12.140625 49.929688 12.140625 C 53.933594 12.140625 54.140625 12.152344 54.140625 12.335938 Z M 11.726562 15.488281 C 12.382812 16.101562 13.441406 16.601562 14.351562 16.734375 C 15.269531 16.875 18.351562 16.867188 19.28125 16.734375 C 20.246094 16.59375 21.066406 16.199219 21.808594 15.519531 L 22.410156 14.972656 L 22.914062 15.464844 C 23.546875 16.089844 24.566406 16.582031 25.484375 16.734375 C 26.402344 16.875 29.597656 16.875 30.515625 16.734375 C 31.433594 16.582031 32.40625 16.109375 33.0625 15.476562 L 33.589844 14.972656 L 34.191406 15.519531 C 34.933594 16.199219 35.753906 16.59375 36.71875 16.734375 C 37.648438 16.867188 40.730469 16.875 41.648438 16.734375 C 42.558594 16.601562 43.617188 16.101562 44.273438 15.488281 L 44.8125 14.984375 L 45.335938 15.488281 C 45.785156 15.914062 46.660156 16.417969 47.390625 16.667969 C 47.566406 16.722656 47.578125 17.269531 47.578125 26.085938 L 47.578125 35.4375 L 43.980469 35.4375 L 44.035156 35.078125 C 44.375 32.878906 44.8125 28.789062 44.734375 28.589844 C 44.515625 28.023438 44.375 28 41.070312 28 C 37.765625 28 37.625 28.023438 37.40625 28.589844 C 37.328125 28.789062 37.765625 32.878906 38.105469 35.078125 L 38.160156 35.4375 L 30.84375 35.4375 L 30.84375 33.492188 C 30.832031 30.976562 30.679688 30.515625 29.695312 30.066406 C 29.289062 29.882812 28.863281 29.859375 23.984375 29.859375 L 18.703125 29.859375 L 18.703125 26.140625 L 19.335938 26.140625 C 20.167969 26.140625 20.847656 25.800781 21.195312 25.199219 C 21.425781 24.804688 21.4375 24.664062 21.414062 23.230469 C 21.382812 21.753906 21.371094 21.679688 21.085938 21.304688 C 20.507812 20.550781 20.53125 20.550781 15.726562 20.585938 L 11.429688 20.617188 L 11.070312 20.867188 C 10.433594 21.328125 10.28125 21.796875 10.28125 23.308594 C 10.28125 24.421875 10.3125 24.730469 10.5 25.089844 C 10.828125 25.757812 11.351562 26.074219 12.261719 26.117188 L 13.015625 26.164062 L 13.015625 29.835938 L 12.261719 29.882812 C 11.351562 29.925781 10.828125 30.242188 10.5 30.910156 C 10.304688 31.304688 10.28125 31.578125 10.28125 33.390625 L 10.28125 35.4375 L 8.421875 35.4375 L 8.421875 26.085938 C 8.421875 17.269531 8.433594 16.722656 8.617188 16.667969 C 9.351562 16.417969 10.203125 15.925781 10.621094 15.507812 C 10.882812 15.234375 11.125 15.007812 11.144531 15.007812 C 11.167969 14.996094 11.429688 15.214844 11.726562 15.488281 Z M 6.5625 26.140625 L 6.5625 35.4375 L 4.703125 35.4375 L 4.703125 16.84375 L 6.5625 16.84375 Z M 51.296875 26.140625 L 51.296875 35.4375 L 49.4375 35.4375 L 49.4375 16.84375 L 51.296875 16.84375 Z M 19.578125 23.351562 L 19.578125 24.28125 L 12.140625 24.28125 L 12.140625 22.421875 L 19.578125 22.421875 Z M 16.84375 28 L 16.84375 29.859375 L 14.984375 29.859375 L 14.984375 26.140625 L 16.84375 26.140625 Z M 42.765625 30.046875 C 42.765625 30.15625 42.613281 31.402344 42.4375 32.8125 C 42.261719 34.222656 42.109375 35.394531 42.109375 35.40625 C 42.109375 35.425781 41.640625 35.4375 41.070312 35.4375 L 40.042969 35.4375 L 39.976562 35.078125 C 39.878906 34.464844 39.375 30.339844 39.375 30.101562 C 39.375 29.859375 39.40625 29.859375 41.070312 29.859375 C 42.613281 29.859375 42.765625 29.882812 42.765625 30.046875 Z M 28.960938 33.601562 L 28.984375 35.4375 L 12.140625 35.4375 L 12.140625 31.71875 L 20.539062 31.742188 L 28.929688 31.773438 Z M 53.890625 37.667969 C 54.109375 37.929688 54.152344 38.0625 54.097656 38.378906 C 54.0625 38.597656 53.933594 38.859375 53.800781 38.960938 C 53.582031 39.144531 52.195312 39.15625 28.011719 39.15625 C -0.304688 39.15625 2.054688 39.222656 1.902344 38.445312 C 1.828125 38.007812 2.054688 37.558594 2.4375 37.40625 C 2.582031 37.351562 13.550781 37.320312 28.140625 37.328125 L 53.617188 37.351562 Z M 52.257812 45.742188 L 52.28125 50.421875 L 3.71875 50.421875 L 3.71875 45.796875 C 3.71875 43.246094 3.75 41.125 3.796875 41.09375 C 3.828125 41.046875 14.742188 41.027344 28.042969 41.039062 L 52.226562 41.070312 Z M 53.714844 52.421875 C 54.21875 52.804688 54.261719 53.386719 53.824219 53.824219 L 53.507812 54.140625 L 2.492188 54.140625 L 2.175781 53.824219 C 1.738281 53.386719 1.78125 52.804688 2.285156 52.421875 C 2.539062 52.226562 53.460938 52.226562 53.714844 52.421875 Z M 53.714844 52.421875 " />
                                    </g>
                                </svg>
                                <input id='input-bazar' style={{ visibility: 'hidden' }} type="range" min='0' max='1' step='0.01'
                                    defaultValue='0.5' onChange={(e) => this.changeSoundVolume(e)} ></input>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
