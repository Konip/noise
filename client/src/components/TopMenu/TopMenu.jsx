import React from 'react';
import './TopMenu.css';


const TopMenu = React.memo(({ isAuth, savePlaylist, resetSounds, setActiveButton, activeButton }) => {

    function save() {
        console.log(savePlaylist());
    }

    return (
        <div className="topMenu" style={isAuth ? { visibility: "visible" } : { visibility: "hidden" }}>
            <div className="topMenu__section">
                <span className={activeButton == "playlist" ? "topMenu__PlaylistsButton-active" : "topMenu__PlaylistsButton"}
                    onClick={() => setActiveButton("playlist")}
                >Playlists
                </span>
                <span className={activeButton == "favourites" ? "topMenu__FavouritesButton-active" : "topMenu__FavouritesButton"}
                    onClick={() => setActiveButton("favourites")}
                >Favorites
                </span>
            </div>
            <div className="topMenu__section">
                <span className="topMenu__SaveButton" onClick={() => save()}
                    style={activeButton !== "playlist" ? { visibility: "hidden" } : { visibility: "visible" }}>
                    Save</span>
                <span className="topMenu__ClearButton" onClick={() => resetSounds()}>Clear</span>
            </div>
        </div>
    )
})
export default TopMenu