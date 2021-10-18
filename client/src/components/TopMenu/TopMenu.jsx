import React from 'react';
import '../Favorites/FavoritesContainer.css';
import TooltipAlreadySaved from '../Tooltip/TooltipAlreadySaved';
import TooltipMaximumNumber from '../Tooltip/TooltipMaximumNumber';
import TooltipNotActiveSound from '../Tooltip/TooltipNotActiveSound ';
import './TopMenu.css';


const TopMenu = React.memo(({ isAuth, resetSounds, setActiveButton, activeButton, activeFavorites, playListActive,
    playlist, response
}) => {
  
    let soundsActive = Object.keys(playListActive ?? {}).length
    let maxNumber = Object.keys(response ?? {}).length === 3 ? true : false

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
                <button className={!soundsActive && activeFavorites && maxNumber || soundsActive && !activeFavorites && !maxNumber
                    ? "topMenu__SaveButton-active" : "topMenu__SaveButton eeP"}
                    style={activeButton !== "playlist" || !isAuth ? { visibility: "hidden" } : { visibility: "visible" }}
                    onClick={soundsActive && !activeFavorites && !maxNumber ? () => setActiveButton("favourites") : null}
                >
                    Save
                    <div className={playlist && soundsActive && !activeFavorites ? "favorites-tool" : "favorites-tool-active"} >
                        {!activeFavorites && soundsActive && maxNumber
                            ? <TooltipMaximumNumber />
                            : !activeFavorites && !soundsActive
                                ? <TooltipNotActiveSound />
                                : <TooltipAlreadySaved />
                        }
                    </div>
                </button>
                <span className="topMenu__ClearButton" onClick={resetSounds}>Clear</span>
            </div>
        </div>
    )
})

export default TopMenu