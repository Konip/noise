import React from 'react';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';

export default function Buttons({ openModal, width, buttons, setBtn }) {

    const ref = React.useRef()

    let icon = document.querySelector(".icon-wrap")
    useOnClickOutside(ref, () => {
        if (buttons) setBtn(false)
    }, icon);

    function open(e) {
        openModal(true, e)
        setBtn(false)
    }

    return (
        <div className={width > 1000 && !buttons || width < 1000 && buttons ? "buttons-active" : "buttons"}
            ref={ref}
        >
            <button className="btn" onClick={() => open("Sign up")} >
                Sign up
            </button>
            <button className="btn" onClick={() => open("Log In")}>
                Log In
            </button>
        </div>
    )
}
