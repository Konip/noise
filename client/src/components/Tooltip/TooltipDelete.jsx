import React from 'react';
import '../Favorites/FavoritesContainer.css';
import './Tooltip.css';

export default function TooltipDelete({ del, setTooltip }) {
    return (
        <div>
            <span id='text'>Do you want to delete<br />
                this Combo?</span>
            <div className="actionsWrapper">
                <span className="cancelAction" onClick={() => setTooltip(false)}>No</span>
                <span className="deleteAction" onClick={del}>Yes, delete</span>
            </div>
        </div>

    )
}
