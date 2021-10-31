import { observer } from "mobx-react";
import React from 'react';
import { Context } from "../../Context.js";
import Buttons from "./Buttons";
import Icon from "./Icon";
import Menu from "./Menu";
import './NavBar.css';

let width: number
width = window.screen.width

interface NavBarProps {
    setPage(value: string): void
    openModal(value: boolean, value1: string): void
    page: string
}

const NavBar: React.FC<NavBarProps> = ({ setPage, openModal, page }) => {

    const [dropdown, setDropdown] = React.useState<boolean>()
    const [buttons, setBtn] = React.useState(false)

    const ctx = React.useContext(Context)

    React.useEffect(() => {
        ctx.checkAuth()
    }, [])

    function logout() {
        ctx.logout()
        setPage('body')
    }

    return (
        <div className='nav' onClick={() => setDropdown(false)}>
            {
                ctx.isAuth
                    ?
                    <Menu setPage={setPage} logout={logout} setDropdown={setDropdown} dropdown={dropdown}
                        page={page}
                    />
                    : <Buttons openModal={openModal} width={width} buttons={buttons} setBtn={setBtn} />
            }
            {
                width < 1000 && !ctx.isAuth &&
                <Icon setBtn={setBtn} buttons={buttons} />
            }
        </div >
    )
}

export default observer(NavBar)