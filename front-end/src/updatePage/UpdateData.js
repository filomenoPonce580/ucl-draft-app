import React, { useState, useEffect } from "react";
import { listUsers, listTeams, updateResults } from "../utils/api";
import {useHistory} from "react-router-dom"
import UpdateCard from "./UpdateCard";
import AdminLogin from "./AdminLogin";

function UpdateData(){
    const history = useHistory()
    const initialFormData = {
        homeTeam: '',
        homeTeamGoals: '',
        awayTeam: '',
        awayTeamGoals: ''
    }

    const [users, setUsers] = useState([]);
    const [usersError, setUsersError] = useState(null);
    const [teams, setTeams] = useState([]);
    const [teamsError, setTeamsError] = useState(null);
    const [loggedIn, setLoggedIn] = useState(true);
    const [formData, setFormData] = useState(initialFormData);  

    useEffect(() => {
      const abortController = new AbortController();
      setUsersError(null);
      setTeamsError(null);
  
      // Fetch users and teams data
      Promise.all([listUsers(abortController.signal), listTeams(abortController.signal)])
        .then(([usersData, teamsData]) => {
          setUsers(usersData);
          setTeams(teamsData);
        })
        .catch((error) => {
          setUsersError(error);
          setTeamsError(error);
        });
  
      return () => abortController.abort();
    }, []);

    function handleInputChange(event) {
        event.preventDefault();
        setFormData({
          ...formData,
          [event.target.name]: event.target.value,
        });
    }

    function handleSubmit(event){
        event.preventDefault()

        //parse input data into integer
        const parsedData = {}
        Object.keys(formData).forEach((key)=>{
          parsedData[key] = parseInt(formData[key], 10)
        })

        //Derive results from goals scored in match
        let results = {
          home: 'D',
          away: 'D'
        }
        if(parsedData.homeTeamGoals > parsedData.awayTeamGoals){
          results.home = 'W';
          results.away = 'L';
        } else if (parsedData.homeTeamGoals < parsedData.awayTeamGoals){
          results.home = 'L';
          results.away = 'W';
        }
        
        //format data into single object with home/away objects nested inside
        const formattedData = {
          home: {
            teamId: parsedData.homeTeam,
            goalsScored: parsedData.homeTeamGoals,
            goalsConceded: parsedData.awayTeamGoals,
            result: results.home,
          },
          away: {
            teamId: parsedData.awayTeam,
            goalsScored: parsedData.awayTeamGoals,
            goalsConceded: parsedData.homeTeamGoals,
            result: results.away
          }
        }

        console.log(formattedData)
        const abortController = new AbortController();
        updateResults(formattedData, abortController.signal)
           .then(history.push(`/dashboard`))
        return () => abortController.abort();
    }

    function toggleLogin(){
      if(!loggedIn){

        setLoggedIn(true)
      }else{
        setLoggedIn(false)
      }
    }


    return (
      <div>
        { !loggedIn ? <AdminLogin toggleLogin={toggleLogin} /> : <UpdateCard formData={formData} teams={teams} handleInputChange={handleInputChange} handleSubmit={handleSubmit}/>}
      </div>
    )
    
}

export default UpdateData