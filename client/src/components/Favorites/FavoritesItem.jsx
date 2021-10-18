import React from 'react';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import TooltipDelete from '../Tooltip/TooltipDelete';
import './FavoritesContainer.css';

export default function FavoritesItem({ name, activateCard, setEditMode, changeNamePlaylist, deletePlaylist }) {

    const [value, setValue] = React.useState()
    const [changeName, setChangeName] = React.useState(false)
    const [detailsButton, setDetailsButton] = React.useState(false)
    const [tooltip, setTooltip] = React.useState(false)
    const [textInput, setTextInput] = React.useState(false)
    const ref = React.useRef()
    const ref1 = React.useRef()

    useOnClickOutside(ref1, () => {
        if (textInput) save()
    });

    React.useEffect(() => {
        setValue(name)
    }, [name])

    function handleChange(e) {
        setValue(e.target.value)
    }

    function editName(e) {
        e.preventDefault()

        setChangeName(true)
        setTextInput(true)

        let a = document.getElementById(name)

        a.querySelector(".favorites__edit-container").style.display = 'none'
        a.querySelector(".favorites__text").style.display = 'block'
        a.querySelector(".favorites__text").classList.add('jSqNqh')
        a.querySelector(".favorites__text input").style.display = 'block'

        ref.current.focus();

        setEditMode(true)
    }

    function activateFavorites(e) {
        e.preventDefault()
        activateCard(e)
    }

    async function save() {

        setEditMode(false)
        setChangeName(false)
        changeNamePlaylist(name, value)
        setDetailsButton(false)
        setTextInput(false)

        let a = document.getElementById(name)
        a.querySelector(".favorites__edit-container").style.display = 'flex'
        a.querySelector(".favorites__text").classList.remove('jSqNqh')
        a.querySelector(".favorites__edit").classList.remove('eePtjH')
        a.querySelector(".favorites__text input").style.display = 'none'
    }

    async function handleKeyDown(e) {
        if (e.key === 'Enter') save()
    }

    function openEditMode() {
        // setChangeName(false)
        setDetailsButton(!detailsButton)
        let a = document.getElementById(name)
        let element = document.querySelector(`[data-key=${name}]`)

        if (!changeName && detailsButton || changeName && !detailsButton) {
            // скрыв кнопки
            if (!changeName) {
                element.classList.remove('eePtjH')
                setEditMode(false)
            }
            if (changeName) setChangeName(false)

            a.querySelector(".favorites__edit-container").style.display = 'flex'
            a.querySelector(".favorites__text").style.display = 'none'
            a.querySelector(".favorites__text").classList.remove('jSqNqh')
            a.querySelector(".favorites__text input").style.display = 'none'
        } else if (!changeName && !detailsButton) {
            // показыв кнопки
            element.classList.add('eePtjH')
            a.querySelector(".favorites__edit-container").style.display = 'none'
            a.querySelector(".favorites__text").style.display = 'block'
            a.querySelector(".favorites__text").classList.add('jSqNqh')
            a.querySelector(".favorites__text input").style.display = 'block'
        }
    }


    function del() {
        deletePlaylist(name)
    }

    return (
        <div className="favorites__container" id={name}>
            <div className="favorites__inner-container" onClick={e => activateFavorites(e)}>
                <button className="favorites__edit" data-key={name} onClick={openEditMode}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
                        <g fill="none" fillRule="evenodd">
                            <path fill="currentColor" fillRule="nonzero" d="M7 4a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 5a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 5a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"></path>
                            <path d="M0 0h14v14H0z"></path>
                        </g>
                    </svg>
                </button>
                <div className="favorites__edit-container" style={detailsButton ? { display: 'flex' } : { display: 'none' }}>
                    <div className="favorites__edit-container-text">
                    </div>
                    <div ref={ref1} className={"favorites__edit-container-btn"}
                        style={detailsButton ? { display: 'flex' } : { display: 'none' }}>
                        <button className={"favorites__edit-btn"}
                            style={changeName && !detailsButton ? { display: "none" } : { display: "inline-block" }}
                            onClick={(e) => editName(e)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
                                <g fill="none" fillRule="evenodd">
                                    <path fill="currentColor" fillRule="nonzero" d="M10.293 5.293a1 1 0 0 1 1.414 1.414l-7 7A1 1 0 0 1 4 14H1a1 1 0 0 1-1-1v-3a1 1 0 0 1 .293-.707l7-7a1 1 0 0 1 1.414 1.414L2 10.414V12h1.586l6.707-6.707z"></path>
                                    <path fill="currentColor" fillRule="nonzero" d="M7.793 4.207a1 1 0 0 1 1.414-1.414l2 2a1 1 0 1 1-1.414 1.414l-2-2z"></path>
                                    <path fill="currentColor" fillRule="nonzero" d="M8.707 3.707a1 1 0 0 1-1.414-1.414L8.586 1a2 2 0 0 1 2.828 0L13 2.586a2 2 0 0 1 0 2.828l-1.293 1.293a1 1 0 0 1-1.414-1.414L11.586 4 10 2.414 8.707 3.707z"></path>
                                    <path d="M0 0h14v14H0z"></path>
                                </g>
                            </svg>
                        </button>

                        <button className="favorites__edit-btn"
                            style={changeName && !detailsButton ? { visibility: "hidden" } : { visibility: "visible" },
                                tooltip ? { opacity: "1" } : {}
                            }
                            onClick={() => setTooltip(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
                                <g fill="none" fillRule="evenodd">
                                    <path fill="currentColor" fillRule="nonzero" d="M1 5a1 1 0 1 1 0-2h12a1 1 0 0 1 0 2H1z"></path>
                                    <path fill="currentColor" fillRule="nonzero" d="M10 4h2v8c0 1.116-.733 1.85-1.876 1.992L10 14H4c-1.245 0-2-.89-2-2V4h2v8h6V4z"></path>
                                    <path fill="currentColor" fillRule="nonzero" d="M8 6.5a.5.5 0 0 1 1 0v4a.5.5 0 1 1-1 0v-4zm-3 0a.5.5 0 0 1 1 0v4a.5.5 0 1 1-1 0v-4zm0-3a1 1 0 1 1-2 0V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1.5a1 1 0 0 1-2 0V2H5v1.5z"></path>
                                    <path d="M0 0h14v14H0z"></path>
                                </g>
                            </svg>

                        </button>
                    </div>
                </div>
                <div className={"favorites__text"}
                    style={changeName || detailsButton ? { display: 'none' } : { display: 'block' }}>{name}
                    <input type="text" style={changeName ? { display: "inline-block" } : { display: "none" }}
                        onChange={e => handleChange(e)} onKeyDown={e => handleKeyDown(e)} ref={ref} value={value}
                    />
                </div>
            </div>
            <div className={"favorites-tool-active cRLSrs"} style={tooltip ? { opacity: '1', visibility: 'visible' } : { opacity: '0', visibility: 'hidden' }}>
                <TooltipDelete del={del} setTooltip={setTooltip} />
            </div>
        </div>
    )
}
