import React, { useState } from "react";

function SetDraftOrder({ players }) {
    const [shuffledPlayers, setShuffledPlayers] = useState([...players]);

    // Function to randomize the order of players
    const randomizeOrder = () => {
        const shuffledArray = [...shuffledPlayers];

        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[i]];
        }

        setShuffledPlayers(shuffledArray);
    };

    return (
        <div>
            <h1>Set Order of Draft</h1>
            <div>
                <h2>Original Order:</h2>
                <ul>
                    {players.map((player, index) => (
                        <li key={index}>{player}</li>
                    ))}
                </ul>
            </div>
            <div>
                <h2>Shuffled Order:</h2>
                <ul>
                    {shuffledPlayers.map((player, index) => (
                        <li key={index}>{player}</li>
                    ))}
                </ul>
                <button onClick={randomizeOrder}>Randomize Order</button>
            </div>
        </div>
    );
}

export default SetDraftOrder;