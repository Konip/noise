import { observer } from "mobx-react";
import React, { useContext } from 'react';
import { Context } from "../../Context.js";
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import TooltipAlreadySaved from "../Tooltip/TooltipAlreadySaved";
import TooltipMaximumNumber from '../Tooltip/TooltipMaximumNumber';
import TooltipNotActiveSound from "../Tooltip/TooltipNotActiveSound ";
import Empty from "./Empty";
import './FavoritesContainer.css';
import FavoritesItem from "./FavoritesItem";

interface FavoritesContainerProps {
    playListActive: object
    response: {
        [key: string]: object
    }
    startPlaylist(name: string, object: object): void
    activeFavorites: string
    setActiveFavorites(activeFavorites: string): void
    resetSounds(): void
    playlist: string
    setActivePlaylist(activePlaylist: string): void
    savePlaylist(): void
    resetPlaylist(): void
}

let prev: string

const FavoritesContainer: React.FC<FavoritesContainerProps> = ({ playListActive, response, startPlaylist,
    activeFavorites, setActiveFavorites, resetSounds,
    playlist, setActivePlaylist, savePlaylist, resetPlaylist
}) => {

    const [active, setActive] = React.useState(false)
    const [value, setValue] = React.useState('')
    const [editMode, setEditMode] = React.useState(false)
    const ctx = useContext(Context)
    const ref = React.useRef<HTMLButtonElement>(null)

    useOnClickOutside(ref, () => {
        let res = document.querySelector(".favorites__btn-input")
        if (res && value?.length) save()
    });

    const { id }: { id: string } = ctx.user

    let keys: string[] = Object.keys(response ?? {})
    let soundsActive = Object.keys(playListActive).length
    let maxNumber = Object.keys(response ?? {}).length === 3 ? true : false

    React.useEffect(() => {
        if (!soundsActive) {
            setActive(false)
        }
        // if (activeFavorites) {
        //     alert('activeFavorites')
        //     document.getElementById(activeFavorites)!.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
        // }
        if (!playlist && prev) {
            if (activeFavorites) document.getElementById(activeFavorites)!.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
            prev = ''
            setActiveFavorites('')
            setActivePlaylist('')
            setActive(false)
        }
    }, [playlist, activeFavorites, playListActive])

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault()
        setValue(e.target.value)
    }

    async function save() {

        const obj: { [k: string]: any } = {
            [value]: { ...playListActive }
        }

        setActive(false)
        setValue('')
        try {
            let res = await ctx.savePlaylist(obj, id)
            let name = Object.keys(res)
            setActiveFavorites(name[name.length - 1])
            setActivePlaylist('')
            savePlaylist()
            prev = name[name.length - 1]
        } catch (error) {
            console.log(error);
        }
    }

    function handleKeyDown(e: React.KeyboardEvent) {
        if (e.key === 'Enter') save()
    }

    function activateCard(e: React.SyntheticEvent) {

        const target = e.target as Element

        if (target.localName !== "path" && target.localName !== "svg" && !editMode) {
            let name: string = target?.textContent!;
            let object: object = response[name]

            setActivePlaylist('')
            setActive(false)
            soundsActive = 0
            // выкл
            if (activeFavorites === name) {
                if (name) document.getElementById(name)!.style.backgroundColor = 'rgba(255, 255, 255, 0.15)'
                setActiveFavorites('')
                resetSounds()
                prev = ''
                // перекл
            } else if (activeFavorites) {
                document.getElementById(activeFavorites)!.style.backgroundColor = 'rgba(255, 255, 255, 0.15)'
                if (name) document.getElementById(name)!.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
                setActiveFavorites(name)
                startPlaylist('Favorites', object)
                prev = activeFavorites
                // вкл
            } else {
                document.getElementById(name)!.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
                setActiveFavorites(name)
                startPlaylist('Favorites', object)
                prev = name
            }
        }
    }

    async function changeNamePlaylist(currentName: string, newName: string) {
        await ctx.changeNamePlaylist(id, currentName, newName)
        if (activeFavorites) setActiveFavorites(newName)
    }

    async function deletePlaylist(name: string) {
        try {
            if (name === activeFavorites) {
                resetPlaylist()
                setActiveFavorites('')
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
                    return <FavoritesItem key={index + el} name={el} activateCard={activateCard} setEditMode={setEditMode}
                        changeNamePlaylist={(currentName, newName) => changeNamePlaylist(currentName, newName)}
                        deletePlaylist={name => deletePlaylist(name)} active={el === activeFavorites ? activeFavorites : null}
                    />
                })
                }
                <button ref={ref} className={active ? "favorites__btn-input" : "favorites__btn"}
                    style={!activeFavorites && soundsActive && !maxNumber ? { color: "rgb(255, 255, 255)" } : { color: "" }}
                    onClick={soundsActive && !active && !activeFavorites && !maxNumber ? () => setActive(true) : null!}
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