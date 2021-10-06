import React from 'react';
import './Favorites.css';

export default function Favorites({ playListActive }) {
    console.log(playListActive);

    const [active, setActive] = React.useState(false)
    const [value, setValue] = React.useState()

    let key = Object.keys(playListActive).length

    function handleChange(e) {
        e.preventDefault()
        console.log(e.target.value);
        setValue(e.target.value)
    }
    let element = document.querySelector('.favorites__wrap')
    element?.addEventListener("click", () => {
        console.log("aaaa")
        setActive(false)
    })
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
                    <div className="favorites__item" style={active ? { display: "flex" } : { display: "none" }}>
                        Give it a nice name
                        <div className="favorites__item-btn">
                            <input type="text" placeholder="Give a nice name" onChange={e => handleChange(e)} />
                        </div>
                    </div>
                </button>
            </div>
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
    )
}
