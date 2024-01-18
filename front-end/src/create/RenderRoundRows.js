import React, { useState } from "react";

function RenderRoundRows({ round, users, setUsers, teams, setTeams }) {
  const numberOfPicks = users.length;
  const rows = [];
  let currentUsers = users.map((user) => ({ ...user })); // Create a copy of the users array

  // Reverse the order if round is even
  if (round % 2 === 0) {
    currentUsers.reverse();
  }

  // State to track the selected teams for each pick
  const [selectedTeams, setSelectedTeams] = useState(Array(numberOfPicks).fill(null));

  // Function to handle team selection for a user
  function handleTeamSelection(event, pick) {
    // event.preventDefault();
    setUsers((currentUsers) => {
      const updatedUsers = [...currentUsers];
      updatedUsers[pick - 1][`team${round}`] = event.target.value;
      return updatedUsers;
    });
  }

  function handleConfirmTeam(pick) {
    // Find the selected team based on the user's choice
    const selectedTeamId = Number(currentUsers[pick - 1][`team${round}`]);

    let updatedTeams = teams.map((team) => {
      if (team.teamId === selectedTeamId) {
        team.drafted = true;
      }
      return team;
    });

    // Update the teams data by marking the selected team as drafted
    setTeams(updatedTeams);

    // Update the selected teams array with the selected team for the specific pick
    setSelectedTeams((prevSelectedTeams) => {
      const updatedSelectedTeams = [...prevSelectedTeams];
      updatedSelectedTeams[pick - 1] = teams.find((team) => team.teamId === selectedTeamId);
      return updatedSelectedTeams;
    });
  }

  for (let pick = 1; pick <= numberOfPicks; pick++) {
    const currentPick = `${round}.${pick < 10 ? "0" + pick : pick}`;

    const selectedTeam = selectedTeams[pick - 1];
    const availableTeams = teams.filter((team) => !team.drafted);

    rows.push(
      <tr key={`round${round}-pick${pick}`}>
        <td>{currentPick}</td>
        <td>{currentUsers[pick - 1].name}</td>
        <td>
          {selectedTeam ? (
            // Display selected team information
            <span>{selectedTeam.teamName}</span>
          ) : (
            // Drop-down menu or form input for team selection
            <select
              value={currentUsers[pick - 1][`team${round}`]}
              onChange={(e) => handleTeamSelection(e, pick)}
            >
              <option value="">Select Team</option>
              {availableTeams.map((team) => (
                <option key={team.teamId} value={team.teamId}>
                  {team.teamName}
                </option>
              ))}
            </select>
          )}
        </td>
        <td>
          {selectedTeam ? (
            // Display confirmation status with selected team
            <span>Confirmed</span>
          ) : (
            // Button for confirmation
            <button onClick={() => handleConfirmTeam(pick)}>Confirm</button>
          )}
        </td>
      </tr>
    );
  }

  return rows;
}

export default RenderRoundRows;