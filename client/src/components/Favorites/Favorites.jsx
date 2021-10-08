import { observer } from "mobx-react";
import React, { useContext } from 'react';
import { Context } from "../../Context";
import './Favorites.css';

let prev

function Favorites({ playListActive, response, startPlaylist, activeFavorites, setActiveFavorites, resetSounds, playlist }) {
    console.log('Favorites');
    const [active, setActive] = React.useState(false)
    const [value, setValue] = React.useState()
    const ctx = useContext(Context)
    console.log(playlist);
    // debugger
    const { id } = ctx.user
    let keys
    let key = Object.keys(playListActive).length

    if (response) {
        keys = Object.keys(response)
    }
    // if (!playlist && prev) {
    //     prev = ''
    //     setActiveFavorites('')
    // }

    function handleChange(e) {
        e.preventDefault()
        console.log(e.target.value);
        setValue(e.target.value)
    }

    async function handleKeyDown(e) {
        const obj = {
            [value]: { ...playListActive }
        }

        if (e.key === 'Enter') {
            setActive(false)
            try {
                await ctx.savePlaylist(obj, id)

            } catch (error) {
                console.log(error);
            }
        }
    }

    function activateCard(e) {

        let name = e.target.innerText
        let object = response[name]
        console.log(name);

        if (activeFavorites === name) {
            document.getElementById(name).style.backgroundColor = 'rgba(255, 255, 255, 0.15)'
            setActiveFavorites('')
            resetSounds()
            prev = ''
        } else if (activeFavorites) {
            document.getElementById(activeFavorites).style.backgroundColor = 'rgba(255, 255, 255, 0.15)'
            document.getElementById(name).style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
            setActiveFavorites(name)
            startPlaylist(null, object)
            prev = activeFavorites
        } else {
            document.getElementById(name).style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
            setActiveFavorites(name)
            startPlaylist(null, object)
            prev = name
        }

    }

    // let element = document.querySelector('.favorites__wrap')
    // element?.addEventListener("", () => {

    //     setActive(false)
    //     console.log("active", active)
    // })


    // let PlayMasterVolumeController = document.querySelector('.PlayMasterVolumeController')
    //     var clientRect = PlayMasterVolumeController.getBoundingClientRect();

    //     let volumeController = document.querySelector('.volumeController')
    //     let mouseover = document.querySelector('.mouseover')

    //     PlayMasterVolumeController.addEventListener("mouseover", () => {
    //         volumeController.className = "volumeController-active"
    //     })

    //     mouseover.addEventListener("mouseover", () => {
    //         volumeController.className = "volumeController"
    return (
        <div className="favorites">
            <div className="favorites__wrap" onClick={key && !active ? () => setActive(!active) : null}>
                {keys && keys.map((el, index) => {
                    return <div className="favorites__container" key={index + el} onClick={e => activateCard(e)}
                        id={el}
                    >
                        <div className="favorites__inner-container">
                            <div className="favorites__text">{el}</div>
                        </div>
                    </div>
                })
                }
                <button className={active ? "favorites__btn-input" : "favorites__btn"} style={key ? { color: "rgb(255, 255, 255)" } : { color: "" }}
                >
                    {active
                        ? ''
                        : 'Save Combo'
                    }
                    <div className={key ? "favorites-tool" : "favorites-tool-active"} >
                        <span id='text'>You need to active a sound<br />
                            in order to save a Favorite.</span>
                    </div>
                    <div className="favorites__details" style={active ? { display: "flex" } : { display: "none" }}>
                        Give it a nice name
                        <div className="favorites__details-btn">
                            <input type="text" placeholder="Give a nice name" onChange={e => handleChange(e)} onKeyDown={e => handleKeyDown(e)} />
                        </div>
                    </div>
                </button>
            </div>
            <div style={keys ? { visibility: "hidden" } : { visibility: "visible" }}>
                <div className="favorites__text1">
                    <p>
                        Oh no! It looks sooo   empty in here.
                    </p>
                </div>
                <div className="favorites__text2">
                    <p>
                        Activate one or more sounds and mix and match them as you like. <br />
                        Once you’re happy you can save it to your Favorites.
                    </p>
                </div>
            </div>

        </div>
    )
}
export default observer(Favorites);