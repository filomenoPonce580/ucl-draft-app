import React, { useState, useEffect } from "react";
import { listUsers, listTeams, updateResults, listResults, listSeasons } from "../utils/api";
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

    const initialSeasonFormData = {
      season: '',
      teamIds: []
    }
    const [users, setUsers] = useState([]);
    const [usersError, setUsersError] = useState(null);
    const [teams, setTeams] = useState([]);
    const [teamsError, setTeamsError] = useState(null);
    const [loggedIn, setLoggedIn] = useState(true); //set to false when not debugging
    const [formData, setFormData] = useState(initialFormData);  
    const [seasonFormData, setSeasonFormData] = useState(initialSeasonFormData);
    const [results, setResults] = useState([]);
    const [resultsError, setResultsError] = useState(null);
    const [seasons, setSeasons] = useState([]);
    const [seasonsError, setSeasonsError] = useState(null);

    useEffect(() => {
      const abortController = new AbortController();
      setUsersError(null);
      setTeamsError(null);
  
      // Fetch users and teams data
      Promise.all([listUsers(abortController.signal), listTeams(abortController.signal), listResults(abortController.signal), listSeasons(abortController.signal)])
        .then(([usersData, teamsData, results, seasons]) => {
          setUsers(usersData);
          setTeams(teamsData);
          setResults(results);
          setSeasons(seasons);
        })
        .catch((error) => {
          setUsersError(error);
          setTeamsError(error);
          setResultsError(error);
          setSeasonsError(error);
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
        // updateResults(formattedData, abortController.signal)
        //    .then(history.push(`/dashboard`))
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
        <div className=" mb-3 title">
          <h1 className="mb-0">Update Scores</h1>        
        </div>
        <div className="title centered-container">
          { !loggedIn ? <AdminLogin toggleLogin={toggleLogin} /> : <UpdateCard formData={formData} teams={teams} seasons={seasons} results={results} handleInputChange={handleInputChange} handleSubmit={handleSubmit} seasonFormData={seasonFormData}/>}
        </div>
      </div>
    )
    
}

export default UpdateData