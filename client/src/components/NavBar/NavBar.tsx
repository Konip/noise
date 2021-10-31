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
    modalActive: boolean
}

const NavBar: React.FC<NavBarProps> = ({ setPage, openModal, page, modalActive }) => {

    const [dropdown, setDropdown] = React.useState<boolean>()
    const [buttons, setBtn] = React.useState(false)

    const ctx = React.useContext(Context)

    React.useEffect(() => {
        ctx.checkAuth()
    }, [])
    React.useEffect(() => {
        if (modalActive && width < 1000) {
            (document?.querySelector('.sound') as HTMLDivElement).style.zIndex = '0';
        } else if (!modalActive && width < 1000) {
            (document?.querySelector('.sound') as HTMLDivElement).style.zIndex = '20';
        }
    }, [modalActive])

    function logout() {
        ctx.logout()
        setPage('body')
    }

    return (
        <div className={modalActive ? 'nav-darkened' : 'nav'}
            style={{ zIndex: !modalActive && width < 1000 ? 20 : 0 }}
            onClick={() => setDropdown(false)}>
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