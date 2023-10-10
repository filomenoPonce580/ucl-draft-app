import React from "react";
import {BrowserRouter as Router, Link, useHistory} from "react-router-dom"

function User({user, teams, points, gD, findTeam}){
    const history = useHistory()

    return (
        <tr>
            <td>{user.name}</td>
            <td>{findTeam(user.team1).teamName}</td>
            <td>{findTeam(user.team2).teamName}</td>
            <td>{findTeam(user.team3).teamName}</td>
            <td>{findTeam(user.team4).teamName}</td>
            <td>{points}</td>
            <td>{gD}</td>
            <td><button>View</button></td>
        </tr>
   )
    
}

export default User