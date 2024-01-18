import React, { useState, useEffect } from "react";
import DraftRound from "./DraftRound";

function Draft({ teams, setTeams, shuffledPlayers }) {
  // Add id and team properties to each user
  const [users, setUsers] = useState(
    shuffledPlayers.map((user, index) => ({
      id: index + 1, // Assuming id starts from 1
      name: user, // Original user name
      team1: undefined,
      team2: undefined,
      team3: undefined,
      team4: undefined,
    }))
  );

  return (
  
    <div id="accordion">
      {/* {console.log("users: ", users)}
      {console.log("teams: ", teams)} */}
        
          <DraftRound round={1} users={users} setUsers={setUsers} teams={teams} setTeams={setTeams}/>
          <DraftRound round={2} users={users} setUsers={setUsers} teams={teams} setTeams={setTeams}/>
          <DraftRound round={3} users={users} setUsers={setUsers} teams={teams} setTeams={setTeams}/>
          <DraftRound round={4} users={users} setUsers={setUsers} teams={teams} setTeams={setTeams}/>
    </div>
  );
}

export default Draft;