import { toJS } from "mobx";
import { observer } from "mobx-react";
import React, { useContext } from 'react';
import { Context } from "../../Context.js";
import FavoritesContainer from '../Favorites/FavoritesContainer';
import TopMenu from '../TopMenu/TopMenu';
import PlayList from './PlayList';
import './PlayList.css';

interface PlayListContainerProps {
    startPlaylist(name: string, object?: object): void
    resetSounds(): void
    playlist: string
    playListActive: object
    savePlaylist(): void
    resetPlaylist(): void
}

const PlayListContainer: React.FC<PlayListContainerProps> = ({ startPlaylist, resetSounds,
    playlist, playListActive, savePlaylist, resetPlaylist }) => {

    const [activeButton, setActiveButton] = React.useState("playlist")
    const [activePlaylist, setActivePlaylist] = React.useState('')
    const [activeFavorites, setActiveFavorites] = React.useState('')
    const ctx = useContext(Context)

    const { id }: { id: string } = ctx.user
    const { isAuth }: { isAuth: boolean } = ctx

    React.useEffect(() => {
        if (isAuth) {
            try {
                ctx.getPlaylist(id)
            } catch (error) {
                console.log(error);
            }
        } else {
            setActiveButton('playlist')
            resetSounds()
            setActiveFavorites('')
        }

    }, [isAuth, id])

    React.useEffect(() => {
        if (Object.keys(playListActive).length && !playlist || !Object.keys(playListActive).length) {
            setActiveFavorites('')
        }
    }, [playListActive])

    return (
        <div className="playListContainer">
            <TopMenu isAuth={isAuth} resetSounds={resetSounds}
                setActiveButton={setActiveButton} activeButton={activeButton}
                activeFavorites={activeFavorites} playListActive={playListActive}
                playlist={playlist} response={toJS(ctx.playlist)}
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