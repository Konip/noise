import { observer } from "mobx-react";
import React, { useContext } from 'react';
import { Context } from "../../Context";
import TooltipAlreadySaved from "../Tooltip/TooltipAlreadySaved";
import TooltipNotActiveSound from "../Tooltip/TooltipNotActiveSound ";
import { useOnClickOutside } from './../../hooks/useOnClickOutside';
import TooltipMaximumNumber from './../Tooltip/TooltipMaximumNumber';
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
    const ref = React.useRef();

    useOnClickOutside(ref, () => {
        let res = document.querySelector(".favorites__btn-input")
        if (res && value?.length) save()
    });

    const { id } = ctx.user
    let keys = Object.keys(response ?? {})
    let soundsActive = Object.keys(playListActive).length
    let maxNumber = Object.keys(response ?? {}).length === 3 ? true : false

    React.useEffect(() => {
        if (!soundsActive) {
            setActive(false)
        }
        if (activeFavorites) {
            document.getElementById(activeFavorites).style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
        }
        if (!playlist && prev) {
            if (activeFavorites) document.getElementById(activeFavorites).style.backgroundColor = 'rgba(255, 255, 255, 0.15)'
            prev = ''
            setActiveFavorites('')
            setActivePlaylist('')
            setActive(false)
        }
    }, [playlist, activeFavorites, playListActive])

    function handleChange(e) {
        e.preventDefault()
        setValue(e.target.value)
    }

    async function save() {

        const obj = {
            [value]: { ...playListActive }
        }

        setActive(false)
        setValue('')
        try {
            let res = await ctx.savePlaylist(obj, id)
            let name = Object.keys(res)
            setActiveFavorites(name[name.length - 1])
            savePlaylist()
            prev = name[name.length - 1]
        } catch (error) {
            console.log(error);
        }
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter') save()
    }

    function activateCard(e) {

        if (e.target.localName !== "path" && e.target.localName !== "svg" && !editMode) {
            let name = e.target?.innerText
            let object = response[name]
            setActivePlaylist('')
            setActive(false)
            soundsActive = 0
            // выкл
            if (activeFavorites === name) {
                if (name) document.getElementById(name).style.backgroundColor = 'rgba(255, 255, 255, 0.15)'
                setActiveFavorites('')
                resetSounds()
                prev = ''
                // перекл
            } else if (activeFavorites) {
                document.getElementById(activeFavorites).style.backgroundColor = 'rgba(255, 255, 255, 0.15)'
                if (name) document.getElementById(name).style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
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
        if (activeFavorites) setActiveFavorites(newName)
    }

    async function deletePlaylist(name) {
        try {
            if (name === activeFavorites) {
                await resetPlaylist()
                await setActiveFavorites('')
                resetSounds()
            }
            await ctx.deletePlaylist(id, name)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={keys?.length ? "favorites" : "favorites  gYVsrS"}>
            <div className="favorites__wrap" >
                {keys && keys.map((el, index) => {
                    return <FavoritesItem key={index + el} name={el} activateCard={activateCard} handleKeyDown={handleKeyDown}
                        editMode={editMode} setEditMode={setEditMode}
                        changeNamePlaylist={(currentName, newName) => changeNamePlaylist(currentName, newName)}
                        deletePlaylist={name => deletePlaylist(name)}
                    />
                })
                }
                <button ref={ref} className={active ? "favorites__btn-input" : "favorites__btn"}
                    style={!activeFavorites && soundsActive && !maxNumber ? { color: "rgb(255, 255, 255)" } : { color: "" }}
                    onClick={soundsActive && !active && !activeFavorites && !maxNumber ? () => setActive(true) : null}
                >
                    {active
                        ? ''
                        : 'Save Combo'
                    }
                    <div className={soundsActive && maxNumber || !soundsActive && !activeFavorites || activeFavorites ? "favorites-tool-active" : "favorites-tool"} >

                        {!activeFavorites && soundsActive && maxNumber
                            ? <TooltipMaximumNumber />
                            : !activeFavorites && !soundsActive
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
        </div>
    )
}

export default observer(FavoritesContainer);