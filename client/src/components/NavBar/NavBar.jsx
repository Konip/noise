import { observer } from "mobx-react";
import React from 'react';
import { Context } from "../../Context";
import Buttons from "./Buttons";
import Icon from "./Icon";
import Menu from "./Menu";
import './NavBar.css';

let width
width = window.screen.width

export const NavBar = observer(
    function NavBar({ setPage, openModal, page }) {

        const [dropdown, setDropdown] = React.useState()
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
)
