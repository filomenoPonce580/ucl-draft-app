import React, { useState } from "react";
import Draft from "./Draft";
import DraftOrder from "./DraftOrder";

function SetDraftOrder({ players, league, setLeague, teams, setTeams }) {
    // Remove empty names
    let filteredPlayers = players.filter((player) => player.length > 1);

    // console.log("shuffled players: ", shuffledPlayers)
    const [shuffledPlayers, setShuffledPlayers] = useState([...filteredPlayers]);
    const [toggleShuffle, setToggleShuffle] = useState(false)

    // Function to randomize the order of players
    function randomizeOrder(){
        const shuffledArray = [...shuffledPlayers];

        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[i]];
        }

        setShuffledPlayers(shuffledArray);
        setToggleShuffle(true)
    };

    function beginDraft(){
        setLeague({...league, draftReady: true})
        //console.log(league)
    }


    return (
        <div>
            {!league.draftReady ? <DraftOrder toggleShuffle={toggleShuffle} players={filteredPlayers} shuffledPlayers={shuffledPlayers} randomizeOrder={randomizeOrder} beginDraft={beginDraft}/>: <Draft teams={teams} setTeams={setTeams} shuffledPlayers={shuffledPlayers}/>}            
        </div>
    );
}

export default SetDraftOrder;