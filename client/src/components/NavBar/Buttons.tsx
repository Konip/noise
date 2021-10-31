import React from 'react';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';

interface ButtonsProps {
    openModal(value: boolean, value1: string): void
    width: number
    buttons: boolean
    setBtn(value: boolean): void
}

const Buttons: React.FC<ButtonsProps> = ({ openModal, width, buttons, setBtn }) => {

    const ref = React.useRef(null)

    let icon = document.querySelector(".icon-wrap")
    useOnClickOutside(ref, () => {
        if (buttons) setBtn(false)
    }, icon);

    function open(e: string) {
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
export default Buttons