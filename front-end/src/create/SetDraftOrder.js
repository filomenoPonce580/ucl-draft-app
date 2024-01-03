import React, { useState } from "react";

function SetDraftOrder({ players }) {
    const [shuffledPlayers, setShuffledPlayers] = useState([...players]);
    const [toggleShuffle, setToggleShuffle] = useState(false)

    // Function to randomize the order of players
    const randomizeOrder = () => {
        const shuffledArray = [...shuffledPlayers];

        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[i]];
        }

        setShuffledPlayers(shuffledArray);
        setToggleShuffle(true)
    };

    return (
        <div className="centered-container">
            <div className="card" style={{ width: "18rem" }}>
                <div className="card-header d-flex justify-content-center">
                    Set Order of Draft
                </div>
                <ul className="list-group list-group-flush">
                    {!toggleShuffle ? 
                        players.map((player, index) => (
                            <li className="list-group-item" key={index}>{index + 1}. {player}</li>
                        )) :
                        shuffledPlayers.map((player, index) => (
                                <li className="list-group-item" key={index}>{index + 1}. {player}</li>
                        ))}
                </ul>
                <button className="btn btn-primary" onClick={randomizeOrder}>Randomize Order</button>
                <button className="btn btn-secondary" onClick={randomizeOrder}>Begin Draft</button>
            </div>            
        </div>

    );
}

export default SetDraftOrder;