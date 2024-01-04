import React from "react";

function DraftOrder({toggleShuffle, players, shuffledPlayers, randomizeOrder, beginDraft}){
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
                        )) : shuffledPlayers.map((player, index) => (
                                <li className="list-group-item" key={index}>{index + 1}. {player}</li>
                        )) }
                </ul>
                <button className="btn btn-primary" onClick={randomizeOrder}>Randomize Order</button>
                <button className="btn btn-secondary" onClick={beginDraft}>Begin Draft</button>
            </div>            
        </div>
    )
}

export default DraftOrder