import React from "react";
import {BrowserRouter as Router, Link, useHistory} from "react-router-dom"
//mport { cancelReservation } from "../utils/api";
//import { tConvert } from "../utils/tConvert";


function User({user, teams}){
    const history = useHistory()
    //console.log(teams)
    //console.log('user: ', user)
    //console.log(teams[user.team1])
    //console.log(teams[user.team1].results)

    // function handleCancel(event){
    //     event.preventDefault();
    //     let result = window.confirm("Do you want to cancel this reservation? This cannot be undone.")
    //     if(result){
    //         cancelReservation(reservation_id)
    //             .then(history.go(0))
    //     }
    // }

    function calculateTeamPoints(resultsArr){
        let total = 0
        if(resultsArr.length === 0) return total
        console.log(resultsArr)
        resultsArr.forEach( result =>{
            if(result === 'W'){
                total += 1
            } else if (result === 'D'){
                total += 0.5
            }
        })
        return total
    }

    function calculateAllPoints(teams, user){
        let team1 = calculateTeamPoints(teams[user.team1].results);
        let team2 = calculateTeamPoints(teams[user.team2].results) * 2;
        let team3 = calculateTeamPoints(teams[user.team3].results) * 3;
        let team4 = calculateTeamPoints(teams[user.team4].results) * 4;

        return team1 + team2 + team3 + team4
    }

    function calculateGD(teams, user){
        let one = teams[user.team1].goalsFor - teams[user.team1].goalsAgainst;
        let two = teams[user.team2].goalsFor - teams[user.team2].goalsAgainst;
        let three = teams[user.team3].goalsFor - teams[user.team3].goalsAgainst;
        let four = teams[user.team4].goalsFor - teams[user.team4].goalsAgainst;

        return one + two + three + four
    }

    return (
        <tr>
            <td>{user.name}</td>
            <td>{teams[user.team1].teamName}</td>
            <td>{teams[user.team2].teamName}</td>
            <td>{teams[user.team3].teamName}</td>
            <td>{teams[user.team4].teamName}</td>
            <td>{calculateAllPoints(teams, user)}</td>
            <td>{calculateGD(teams, user)}</td>
            <td><button>View</button></td>
        </tr>
   )
    
}

export default User