import { observer } from "mobx-react";
import React, { useContext } from 'react';
import { Context } from "../../Context";
import Favorites from '../Favorites/Favorites';
import TopMenu from '../TopMenu/TopMenu';
import PlayList from './PlayList';
import './PlayList.css';

const PlayListContainer = ({ startPlaylist, resetSounds, savePlaylist, playlist, playListActive, isAuth }) => {

    const [activeButton, setActiveButton] = React.useState("playlist")
    const [activePlaylist, setActivePlaylist] = React.useState()
    const [activeFavorites, setActiveFavorites] = React.useState()
    const [response, setResponse] = React.useState()
    const ctx = useContext(Context)


    React.useEffect(async () => {
        if (isAuth) {
            let res = await ctx.getPlaylist(ctx.user.id)
            setResponse(res)
            savePlaylist(res)
        }

    }, [isAuth])

    return (
        <div className="playListContainer">

            <TopMenu isAuth={ctx.isAuth} savePlaylist={savePlaylist} resetSounds={resetSounds}
                setActiveButton={ setActiveButton} activeButton={activeButton}
            />
            {
                activeButton == "playlist"
                    ?
                    <PlayList startPlaylist={e => startPlaylist(e)} activePlaylist={activePlaylist}
                        resetSounds={resetSounds} playlist={playlist} setActivePlaylist={setActivePlaylist}
                    />
                    :
                    <Favorites startPlaylist={(e, r) => startPlaylist(e, r)} playListActive={playListActive} 
                    response={response} activeFavorites={activeFavorites} setActiveFavorites={setActiveFavorites}
                    resetSounds={resetSounds} playlist={playlist}
                     />
            }

        </div>
    )
}

export default observer(PlayListContainer);