import React from 'react';
import '../Favorites/FavoritesContainer.css';
import TooltipAlreadySaved from '../Tooltip/TooltipAlreadySaved';
import TooltipNotActiveSound from '../Tooltip/TooltipNotActiveSound ';
import './TopMenu.css';


const TopMenu = React.memo(({ isAuth, resetSounds, setActiveButton, activeButton, activeFavorites, playListActive,
    playlist
}) => {
    React.useEffect(() => {

    }, [playlist])

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
            <div className="topMenu__section" >
                <button className={!playlist && Object.keys(playListActive).length && !activeFavorites ? "topMenu__SaveButton-active" : "topMenu__SaveButton eeP"}
                    style={activeButton !== "playlist" || !isAuth ? { visibility: "hidden" } : { visibility: "visible" }}
                    onClick={() => setActiveButton("favourites")} disabled={ false}
                >
                    Save
                    <div className={!playlist && Object.keys(playListActive).length && !activeFavorites ? "favorites-tool" : "favorites-tool-active"} >
                        {!activeFavorites
                            ? <TooltipNotActiveSound />
                            : <TooltipAlreadySaved />
                        }
                    </div>
                </button>

                <span className="topMenu__ClearButton" onClick={() => resetSounds()}>Clear</span>
            </div>
        </div>
    )
})

export default TopMenu