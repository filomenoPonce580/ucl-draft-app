import React, { useState, useEffect } from "react";

function Draft({ teams, shuffledPlayers }) {
  // Remove empty names
  let initialUsers = shuffledPlayers.filter((player) => player.length > 1);

  // Add id and team properties to each user
  const [users, setUsers] = useState(
    initialUsers.map((user, index) => ({
      id: index + 1, // Assuming id starts from 1
      name: user, // Original user name
      team1: undefined,
      team2: undefined,
      team3: undefined,
      team4: undefined,
    }))
  );

  const [draftedTeams, setDraftedTeams] = useState(teams)

  const [roundVisibility, setRoundVisibility] = useState({
    1: true,
    2: false,
    3: false,
    4: false,
    // Add more rounds as needed
  });

  const [confirmation, setConfirmation] = useState({
    1: Array(users.length).fill(false),
    2: Array(users.length).fill(false),
    3: Array(users.length).fill(false),
    4: Array(users.length).fill(false),
    // Add more rounds as needed
  });

//   // Function to toggle round visibility and handle confirmation
//   const toggleRoundVisibility = (roundNumber, pickIndex) => {
//     const updatedConfirmation = { ...confirmation };
//     updatedConfirmation[roundNumber][pickIndex] = true;
//     setConfirmation(updatedConfirmation);

//     // Check if all picks in the round are confirmed
//     const allPicksConfirmed = updatedConfirmation[roundNumber].every(
//       (confirmed) => confirmed
//     );

//     // Toggle visibility based on confirmation status
//     if (allPicksConfirmed) {
//       setRoundVisibility((prevVisibility) => ({
//         ...prevVisibility,
//         [roundNumber]: false,
//         [roundNumber + 1]: true,
//       }));
//     }
//   };

  // Function to handle team selection for a user
  const handleTeamSelection = (roundNumber, pickIndex, team) => {
    setUsers((prevUsers) => {
      const userId = roundNumber * prevUsers.length + pickIndex + 1;
      const userIndex = userId - 1;

      return prevUsers.map((user, index) =>
        index === userIndex
          ? { ...user, [`team${roundNumber}`]: team }
          : user
      );
    });
  };

  // Function to handle confirming the team selection
  const handleConfirmTeam = (roundNumber, pickIndex) => {
    // Update confirmation status
    setConfirmation((prevConfirmation) => {
      const updatedConfirmation = { ...prevConfirmation };
      updatedConfirmation[roundNumber][pickIndex] = true;
      return updatedConfirmation;
    });

    // Extract selectedTeamId from the users state
    const selectedTeamId = users[pickIndex][`team${roundNumber}`];

    // Update the drafted property of the selected team
    const updatedTeams = teams.map((team) =>
      team.teamId === selectedTeamId ? { ...team, drafted: true } : team
    );
    setDraftedTeams(updatedTeams);

    console.log("users: ", users)
    console.log("teams: ", teams)
  };

  useEffect(() => {
    // Log the updated state after it has been updated
    console.log("users: ", users);
    console.log("teams: ", draftedTeams);
  }, [users, draftedTeams]); // The effect will re-run whenever users or draftedTeams change


  // Function to generate rows for a specific round
  function renderRoundRows(roundNumber) {
    const numberOfPicks = users.length;
    const rows = [];
    let currentUsers = users.map((user) => ({ ...user })); // Create a copy of the users array

    // Reverse the order if roundNumber is even
    if (roundNumber % 2 === 0) {
      currentUsers.reverse();
    }

    // Generate rows for each pick in the round
    for (let pick = 1; pick <= numberOfPicks; pick++) {
      const currentPick = `${roundNumber}.${pick < 10 ? "0" + pick : pick}`;
      rows.push(
        <tr key={`round${roundNumber}-pick${pick}`}>
          <td>{currentPick}</td>
          <td>{currentUsers[pick - 1].name}</td>
          <td>
            {/* Drop-down menu or form input for team selection */}
            <select
              value={currentUsers[pick - 1][`team${roundNumber}`]}
              onChange={(e) =>
                handleTeamSelection(
                  roundNumber,
                  pick - 1,
                  e.target.value
                )
              }
            >
              <option value="">Select Team</option>
              {draftedTeams
                .filter((team) => !currentUsers.some((user) => user[`team${roundNumber}`] === team.teamId))
                .map((team) => (
                  <option key={team.teamId} value={team.teamId}>
                    {team.teamName}
                  </option>
                ))}
            </select>
          </td>
          <td>
            {/* Button for confirmation */}
            {/* <button onClick={() => toggleRoundVisibility(roundNumber, pick - 1)}> */}
            <button onClick={() => handleConfirmTeam(roundNumber, pick - 1)}>
              Confirm
            </button>
          </td>
          <td>
            {/* Display confirmation status */}
            {confirmation[roundNumber][pick - 1] ? "Confirmed" : "Not Confirmed"}
          </td>
        </tr>
      );
    }

    return rows;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Pick</th>
          <th>User</th>
          <th>Team Selection</th>
          <th>Confirm</th>
          <th>Confirmation Status</th>
        </tr>
      </thead>
      <tbody>
        {/* Render rows for a specific round */}
        {roundVisibility[1] && renderRoundRows(1)}
        {roundVisibility[2] && renderRoundRows(2)}
        {roundVisibility[3] && renderRoundRows(3)}
        {roundVisibility[4] && renderRoundRows(4)}
        {/* Add more rounds as needed */}
      </tbody>
    </table>
  );
}

export default Draft;