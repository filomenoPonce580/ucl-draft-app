import React, { useState, useEffect } from "react";

function Draft({ teams, shuffledPlayers }) {
  // Remove empty names
  let users = shuffledPlayers.filter((player) => player.length > 1);

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

  // Function to toggle round visibility
  const toggleRoundVisibility = (roundNumber) => {
    const updatedVisibility = { ...roundVisibility };
    updatedVisibility[roundNumber] = !updatedVisibility[roundNumber];
    setRoundVisibility(updatedVisibility);
  };

  // Function to handle confirmation of a player's selection
  const handleConfirmation = (roundNumber, index) => {
    const updatedConfirmation = { ...confirmation };
    updatedConfirmation[roundNumber][index] = true;
    setConfirmation(updatedConfirmation);
  };

  // Check if all players have confirmed for a specific round
  const allConfirmed = (roundNumber) => {
    return confirmation[roundNumber].every((confirmed) => confirmed);
  };

  // Collapse round if all players confirmed for that round
  useEffect(() => {
    for (let i = 1; i <= Object.keys(roundVisibility).length; i++) {
      if (allConfirmed(i)) {
        toggleRoundVisibility(i);
        // Automatically open the next round if it exists
        if (i < Object.keys(roundVisibility).length) {
          toggleRoundVisibility(i + 1);
        }
      }
    }
  }, [confirmation]);

  // Function to generate rows for a specific round
  function renderRoundRows(roundNumber) {
    const numberOfPicks = users.length;
    const rows = [];
    let currentUsers = users.slice(); // Create a copy of the users array

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
          <td>{currentUsers[pick - 1]}</td>
          {/* Here you can add selection */}
          <td>Selection</td>
          <td>
            {/* Button for confirmation */}
            <button onClick={() => handleConfirmation(roundNumber, pick - 1)}>
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
          <th>Selection</th>
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