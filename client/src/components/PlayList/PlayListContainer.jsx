import { observer } from "mobx-react";
import React, { useContext } from 'react';
import { Context } from "../../Context";
import FavoritesContainer from '../Favorites/FavoritesContainer';
import TopMenu from '../TopMenu/TopMenu';
import PlayList from './PlayList';
import './PlayList.css';

const PlayListContainer = ({ startPlaylist, resetSounds, playlist, playListActive, isAuth }) => {

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
        }
    }, [isAuth])


    return (
        <div className="playListContainer">

            <TopMenu isAuth={ctx.isAuth} resetSounds={resetSounds}
                setActiveButton={setActiveButton} activeButton={activeButton}
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
                        response={ctx.playlist} activeFavorites={activeFavorites} setActiveFavorites={setActiveFavorites}
                        resetSounds={resetSounds} playlist={playlist} setActivePlaylist={setActivePlaylist}
                    />
            }

        </div>
    )
}

export default observer(PlayListContainer);