import { observer } from "mobx-react";
import React, { useContext } from 'react';
import { Context } from "../../Context";
import TooltipAlreadySaved from "../Tooltip/TooltipAlreadySaved";
import TooltipNotActiveSound from "../Tooltip/TooltipNotActiveSound ";
import Empty from "./Empty";
import './FavoritesContainer.css';
import FavoritesItem from "./FavoritesItem";

let prev

function FavoritesContainer({ playListActive, response, startPlaylist, activeFavorites, setActiveFavorites, resetSounds,
    playlist, setActivePlaylist, savePlaylist, resetPlaylist
}) {

    const [active, setActive] = React.useState(false)
    const [value, setValue] = React.useState()
    const [editMode, setEditMode] = React.useState(false)
    const ctx = useContext(Context)

    // alert('FavoritesContainer')
    console.log('playListActive', playListActive, 'response',
        response, 'activeFavorites', activeFavorites, 'playlist', playlist);

    const { id } = ctx.user
    let keys
    let soundsActive = Object.keys(playListActive).length
    console.log('soundsActive', soundsActive);
    if (response) {
        keys = Object.keys(response)
    }

    React.useEffect(() => {
        if (activeFavorites) {
            document.getElementById(activeFavorites).style.backgroundColor = 'rgba(255, 255, 255, 0.3)'

        }
        if (!playlist && prev) {
            debugger
            document.getElementById(activeFavorites).style.backgroundColor = 'rgba(255, 255, 255, 0.15)'

            prev = ''
            setActiveFavorites('')
            setActivePlaylist('')
            setActive(false)
        }
    }, [playlist, activeFavorites])

    function handleChange(e) {
        e.preventDefault()
        setValue(e.target.value)
    }

    async function handleKeyDown(e) {

        const obj = {
            [value]: { ...playListActive }
        }

        if (e.key === 'Enter') {
            setActive(false)
            setValue('')
            try {
                let res = await ctx.savePlaylist(obj, id)
                let name = Object.keys(res)
                setActiveFavorites(name[name.length - 1])
                savePlaylist()
                prev = name[name.length - 1]
                // prev = ''
            } catch (error) {
                console.log(error);
            }
        }
    }

    function activateCard(e) {
        console.log(e);
        if (e.target.localName !== "path" && e.target.localName !== "svg" && !editMode) {
            debugger
            let name = e.target.innerText
            let object = response[name]
            setActivePlaylist('')
            setActive(false)
            soundsActive = 0
            // выкл
            if (activeFavorites === name) {

                document.getElementById(name).style.backgroundColor = 'rgba(255, 255, 255, 0.15)'
                setActiveFavorites('')
                resetSounds()
                prev = ''
                // перекл
            } else if (activeFavorites) {
                document.getElementById(activeFavorites).style.backgroundColor = 'rgba(255, 255, 255, 0.15)'
                document.getElementById(name).style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
                setActiveFavorites(name)
                startPlaylist('Favorites', object)
                prev = activeFavorites
                // вкл
            } else {
                document.getElementById(name).style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
                setActiveFavorites(name)
                startPlaylist('Favorites', object)
                prev = name
            }
        }
    }

    async function changeNamePlaylist(currentName, newName) {
        await ctx.changeNamePlaylist(id, currentName, newName)
        setActiveFavorites(newName)
    }

    async function deletePlaylist(name) {
        try {
            if (name === activeFavorites) {
                await resetPlaylist()
                await setActiveFavorites('')
            }

            await ctx.deletePlaylist(id, name)
            resetSounds()
        } catch (error) {
            console.log(error);
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
            <div className="favorites__wrap" >
                {keys && keys.map((el, index) => {
                    return <FavoritesItem key={index + el} name={el} activateCard={activateCard} handleKeyDown={handleKeyDown}
                        editMode={editMode} setEditMode={setEditMode}
                        changeNamePlaylist={(currentName, newName) => changeNamePlaylist(currentName, newName)}
                        deletePlaylist={name => deletePlaylist(name)}
                    />
                })
                }
                <button className={active ? "favorites__btn-input" : "favorites__btn"} style={!activeFavorites && soundsActive ? { color: "rgb(255, 255, 255)" } : { color: "" }}
                    onClick={soundsActive && !active && !activeFavorites ? () => setActive(true) : null}
                >
                    {active
                        ? ''
                        : 'Save Combo'
                    }

                    <div className={soundsActive && !activeFavorites ? "favorites-tool" : "favorites-tool-active"} >
                        {!activeFavorites
                            ? <TooltipNotActiveSound />
                            : <TooltipAlreadySaved />
                        }
                    </div>

                    <div className="favorites__details" style={active && !activeFavorites ? { display: "flex" } : { display: "none" }}>
                        Give it a nice name
                        <div className="favorites__details-btn">
                            <input type="text" placeholder="Give a nice name" value={value}
                                onChange={e => handleChange(e)} onKeyDown={e => handleKeyDown(e)} />
                        </div>
                    </div>
                </button>
            </div>
            <Empty keys={keys} />
            {/* <div style={keys ? { visibility: "hidden" } : { visibility: "visible" }}>
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
            </div> */}

        </div>
    )
}

export default observer(FavoritesContainer);