import React from 'react'
import './TopMenu.css'

export default function TopMenu({ isAuth }) {

    const [activeButton, setActiveButton] = React.useState("playlist")

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
                <span className="topMenu__SaveButton">Save</span>
                <span className="topMenu__ClearButton">Clear</span>
            </div>
        </div>
    )
}
