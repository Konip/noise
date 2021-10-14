import { toJS } from "mobx";
import { observer } from "mobx-react";
import React, { useContext } from 'react';
import { Context } from "../../Context";
import FavoritesContainer from '../Favorites/FavoritesContainer';
import TopMenu from '../TopMenu/TopMenu';
import PlayList from './PlayList';
import './PlayList.css';

const PlayListContainer = ({ startPlaylist, resetSounds, playlist, playListActive, isAuth, savePlaylist, resetPlaylist }) => {

    const [activeButton, setActiveButton] = React.useState("playlist")
    const [activePlaylist, setActivePlaylist] = React.useState()
    const [activeFavorites, setActiveFavorites] = React.useState()
    const ctx = useContext(Context)

    React.useEffect(async () => {
        if (isAuth) {
            try {
                await ctx.getPlaylist(ctx.user.id)
            } catch (error) {
                console.log(error);
            }
        } else {
            setActiveButton('playlist')
            resetSounds()
            setActiveFavorites('')
        }
    }, [isAuth])

    debugger
    return (
        <div className="playListContainer">

            <TopMenu isAuth={ctx.isAuth} resetSounds={resetSounds}
                setActiveButton={setActiveButton} activeButton={activeButton}
                activeFavorites={activeFavorites} playListActive={playListActive}
                playlist={playlist}
            />
            {
                activeButton == "playlist"
                    ?
                    <PlayList startPlaylist={e => startPlaylist(e)} activePlaylist={activePlaylist}
                        resetSounds={resetSounds} playlist={playlist} setActivePlaylist={setActivePlaylist}
                        setActiveFavorites={setActiveFavorites}
                    />
                    :
                    <FavoritesContainer startPlaylist={(e, r) => startPlaylist(e, r)} playListActive={playListActive}
                        response={toJS(ctx.playlist)} activeFavorites={activeFavorites} setActiveFavorites={setActiveFavorites}
                        resetSounds={resetSounds} playlist={playlist} setActivePlaylist={setActivePlaylist}
                        savePlaylist={savePlaylist} resetPlaylist={resetPlaylist}
                    />
            }

        </div>
    )
}

export default observer(PlayListContainer);