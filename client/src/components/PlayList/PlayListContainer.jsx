import { observer } from "mobx-react";
import React, { useContext } from 'react';
import { Context } from "../../Context";
import Favorites from '../Favorites/Favorites';
import TopMenu from '../TopMenu/TopMenu';
import PlayList from './PlayList';
import './PlayList.css';

const PlayListContainer = ({ startPlaylist, resetSounds, savePlaylist, playlist, playListActive }) => {

    const [activeButton, setActiveButton] = React.useState("playlist")
    const [activePlaylist, setPlaylist] = React.useState()
    const ctx = useContext(Context)

    console.log(activePlaylist);


    return (
        <div className="playListContainer">

            <TopMenu isAuth={ctx.isAuth} savePlaylist={savePlaylist} resetSounds={resetSounds}
                setActiveButton={(e) => setActiveButton(e)} activeButton={activeButton}
            />
            {
                activeButton == "playlist"
                    ?
                    <PlayList startPlaylist={(e) => startPlaylist(e)} activePlaylist={activePlaylist}
                        resetSounds={resetSounds} playlist={playlist} setPlaylist={setPlaylist}
                    />
                    :
                    <Favorites playListActive={playListActive} />
            }

        </div>
    )
}

export default observer(PlayListContainer);