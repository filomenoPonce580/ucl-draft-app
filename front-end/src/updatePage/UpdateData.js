import React, { useState, useEffect } from "react";
import { listUsers, listTeams, updateResults } from "../utils/api";
import {useHistory} from "react-router-dom"

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

    const [formData, setFormData] = useState(initialFormData);

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
        //next: update results by pushing result string into results array in DB
        //also, add goals scored and goals conceded
        const abortController = new AbortController();
        updateResults(formattedData, abortController.signal)
           .then(history.push(`/dashboard`))
        return () => abortController.abort();
    }
    return (
        <div>
            <h1>Update Scores</h1>
            <div className="card">
                <h5 className="card-header">Add Score</h5>
                <div className="card-body">

                    <form>
                    <h5 className="card-title">Select Home Team</h5>
                        <div className="form-row">
                            <div className="form-group col-md-3">
                                <label htmlFor="homeTeam" className="form-label">
                                    Home Team: {" "}
                                </label>
                                <select
                                    className="form-select"
                                    id="homeTeam"
                                    name="homeTeam"
                                    value={formData.homeTeam}
                                    onChange={handleInputChange}
                                    required
                                    >
                                <option value="" defaultValue>
                                    Select...
                                </option>
                                {teams
                                  .slice() // Create a copy of the array to avoid mutating the original
                                  .sort((a, b) => a.teamName.localeCompare(b.teamName)) // Sort alphabetically
                                  .map((team) => (
                                    <option key={team.teamId} value={team.teamId}>
                                        {team.teamName}
                                    </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="homeTeamGoals">Goals: </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="homeTeamGoals"
                                    id="homeTeamGoals"

                                    value={formData ? formData.homeTeamGoals : ''}
                                    onChange={handleInputChange}/>
                            </div>
                        </div>

                        <h5 className="card-title">Select Away Team</h5>
                        <div className="form-row">
                            <div className="form-group col-md-3">
                                <label htmlFor="awayTeam" className="form-label">
                                    Away Team:{" "}
                                </label>
                                <select
                                    className="form-select"
                                    id="awayTeam"
                                    name="awayTeam"
                                    value={formData.awayTeam}
                                    onChange={handleInputChange}
                                    required
                                    >
                                <option value="" defaultValue>
                                    Select...
                                </option>
                                {teams
                                  .slice() // Create a copy of the array to avoid mutating the original
                                  .sort((a, b) => a.teamName.localeCompare(b.teamName)) // Sort alphabetically
                                  .map((team) => (
                                    <option key={team.teamId} value={team.teamId}>
                                        {team.teamName}
                                    </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="awayTeamGoals">Goals: </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="awayTeamGoals"
                                    id="awayTeamGoals"

                                    value={formData ? formData.awayTeamGoals : ''}
                                    onChange={handleInputChange}/>
                            </div> 
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary m-1"
                            onClick={handleSubmit}
                            >
                            Submit
                        </button>   
                    </form>
                </div>
            </div>
        </div>
    )
    
}

export default UpdateData