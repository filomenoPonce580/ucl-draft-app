import React from "react";
import {BrowserRouter as Router, Link, useHistory} from "react-router-dom"
//mport { cancelReservation } from "../utils/api";
//import { tConvert } from "../utils/tConvert";


function User({user, teams}){
    const history = useHistory()

    //Helper Function. Locates the users team from within the teams array
    function findTeam(teamId){
        return teams.find((team) => teamId === team.teamId)
    }

    //Calculates Team Points: turns the result value from array ('W/L/D') into an integer representing points gained. 
    const calculateTeamPoints = (resultsArr) =>
        resultsArr.reduce((total, result) => {
            if (result === 'W') return total + 1;
            if (result === 'D') return total + 0.5;
        return total;
    }, 0);

    //Combines all the users' point totals and multiplies the value according to the round in which the team is drafted
    function calculateAllPoints(teams, user){
        let team1 = calculateTeamPoints(findTeam(user.team1).results);
        let team2 = calculateTeamPoints(findTeam(user.team2).results) * 2;
        let team3 = calculateTeamPoints(findTeam(user.team3).results) * 3;
        let team4 = calculateTeamPoints(findTeam(user.team4).results) * 4;

        return team1 + team2 + team3 + team4
    }

    //Calculates the combined goal difference for all the users' teams
    function calculateGD(teams, user){
        let one = findTeam(user.team1).goalsFor - findTeam(user.team1).goalsAgainst;
        let two = findTeam(user.team2).goalsFor - findTeam(user.team2).goalsAgainst;
        let three = findTeam(user.team3).goalsFor - findTeam(user.team3).goalsAgainst;
        let four = findTeam(user.team4).goalsFor - findTeam(user.team4).goalsAgainst;

        return one + two + three + four
    }

    return (
        <tr>
            <td>{user.name}</td>
            <td>{findTeam(user.team1).teamName}</td>
            <td>{findTeam(user.team2).teamName}</td>
            <td>{findTeam(user.team3).teamName}</td>
            <td>{findTeam(user.team4).teamName}</td>
            <td>{calculateAllPoints(teams, user)}</td>
            <td>{calculateGD(teams, user)}</td>
            <td><button>View</button></td>
        </tr>
   )
    
}

export default User


// import React from "react";
// import { Link } from "react-router-dom";

// function User({ user, teams }) {
//     console.log(user)
//     console.log(teams)

//     //Calculates Team Points - turns the result value from array ('W/L/D') into an integer representing points gained. 
//     const calculateTeamPoints = (resultsArr) =>
//         resultsArr.reduce((total, result) => {
//             if (result === 'W') return total + 1;
//             if (result === 'D') return total + 0.5;
//         return total;
//     }, 0);

//     //Combines all of the points gained by the users' teams. Awards wore points for teams picked later in the draft. 
//     const calculateAllPoints = (user) =>
//         [1, 2, 3, 4].reduce((total, index) => total + calculateTeamPoints(teams[user[`team${index}`]].results) * index, 0);

//     //Calculates and combines goal difference for each user
//     const calculateGD = (user) =>
//         [1, 2, 3, 4].reduce((total, index) => {
//             const team = teams[user[`team${index}`]];
//             return total + (team.goalsFor - team.goalsAgainst);
//         }, 0);

//     return (
//         <tr>
//         <td>{user.name}</td>
//         <td>{teams.map(team => {if(team.teamId === user.team1) return team.teamName})}</td>
//         <td>{teams.map(team => {if(team.teamId === user.team2) return team.teamName})}</td>
//         <td>{teams.map(team => {if(team.teamId === user.team3) return team.teamName})}</td>
//         <td>{teams.map(team => {if(team.teamId === user.team4) return team.teamName})}</td>
//         <td>{calculateAllPoints(user)}</td>
//         <td>{calculateGD(user)}</td>
//         <td><button>View</button></td>
//         </tr>
//     );
// }

// export default User;