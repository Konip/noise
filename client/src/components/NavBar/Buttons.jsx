import React from 'react';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';

export default function Buttons({ openModal, width, buttons, setBtn }) {
    const ref = React.useRef()

    useOnClickOutside(ref, () => {
        alert()
        let res = document.querySelector(".buttons-active")
        if (res) setBtn(false)
    });
    console.log('-----');
    return (
        <div className={width > 1000 && !buttons || width < 1000 && buttons ? "buttons-active" : "buttons"}
            ref={ref}
        >
            <button className="btn" onClick={() => openModal(true, "Sign up")} >
                Sign up
            </button>
            <button className="btn" onClick={() => openModal(true, "Log In")}>
                Log In
            </button>
        </div>
    )
}
