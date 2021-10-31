import React from 'react';
import './FavoritesContainer.css';

interface EmptyProps {
    keys: string[]
}

const Empty: React.FC<EmptyProps> = ({ keys }) => {
    return (
        <div style={keys?.length ? { visibility: "hidden" } : { visibility: "visible" }}>
            <div className="favorites__text1">
                <p>
                    Oh no! It looks sooo   empty in here.
                </p>
            </div>
            <div className="favorites__text2">
                <p>
                    Activate one or more sounds and mix and match them as you like. <br />
                    Once you’re happy you can save it to your Favorites.
                </p>
            </div>
        </div>
    )
}
export default Empty