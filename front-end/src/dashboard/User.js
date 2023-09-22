import React from "react";
import { Link } from "react-router-dom";

function User({ user, teams }) {
  const calculateTeamPoints = (resultsArr) =>
    resultsArr.reduce((total, result) => {
      if (result === 'W') return total + 1;
      if (result === 'D') return total + 0.5;
      return total;
    }, 0);

  const calculateAllPoints = (user) =>
    [1, 2, 3, 4].reduce((total, index) => total + calculateTeamPoints(teams[user[`team${index}`]].results) * index, 0);

  const calculateGD = (user) =>
    [1, 2, 3, 4].reduce((total, index) => {
      const team = teams[user[`team${index}`]];
      return total + (team.goalsFor - team.goalsAgainst);
    }, 0);

  return (
    <tr>
      <td>{user.name}</td>
      {[1, 2, 3, 4].map((index) => (
        <td key={index}>{teams[user[`team${index}`]].teamName}</td>
      ))}
      <td>{calculateAllPoints(user)}</td>
      <td>{calculateGD(user)}</td>
      <td><button>View</button></td>
    </tr>
  );
}

export default User;