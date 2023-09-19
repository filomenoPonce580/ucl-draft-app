import React from "react";
import {BrowserRouter as Router, Link, useHistory} from "react-router-dom"
//mport { cancelReservation } from "../utils/api";
//import { tConvert } from "../utils/tConvert";


function User({user, teams}){
    const history = useHistory()
    console.log(teams)
    //console.log(teams[user.team1].results)

    // function handleCancel(event){
    //     event.preventDefault();
    //     let result = window.confirm("Do you want to cancel this reservation? This cannot be undone.")
    //     if(result){
    //         cancelReservation(reservation_id)
    //             .then(history.go(0))
    //     }
    // }

    function calculatePoints(resultsArr){
        let total = 0
        console.log(resultsArr)
        resultsArr.forEach( result =>{
            if(result === 'W'){
                total += 4
            } else if (result === 'D'){
                total += 1
            }
        })
        return total
    }

    return (
        <tr>
            <td>{user.name}</td>
            <td>{teams[user.team1].teamName}</td>
            <td className="sizeColumn">data</td>
            <td>data</td>
            <td className="phoneNumberColumn">data</td>
            <td>{calculatePoints(teams[user.team1].results)}</td>
            <td>data</td>
        </tr>
   )
    
}

export default User