import React, { useEffect, useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { listUsers, listTeams } from "../utils/api";
import {Link} from "react-router-dom"
import User from "./User";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard( ) {
  const [users, setUsers] = useState([]);
  const [usersError, setUsersError] = useState(null);
  const [teams, setTeams] = useState([]);
  const [teamsError, setTeamsError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
  
    async function loadDashboard() {
      try {
        setUsersError(null);
        setTeamsError(null);
  
        const [usersData, teamsData] = await Promise.all([
          listUsers(abortController.signal),
          listTeams(abortController.signal),
        ]);
  
        // Check if the component is still mounted before setting the state
        if (!abortController.signal.aborted) {
          setUsers(usersData);
          setTeams(teamsData);
        }
      } catch (error) {
        if (!abortController.signal.aborted) {
          // Only update errors if the operation was not aborted
          setUsersError(error);
          setTeamsError(error);
        }
      }
    }
  
    loadDashboard();
  
    return () => {
      abortController.abort();
    };
  }, []);

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
    <main>


      <div className="centered-container">
        <div className="card text-center">
          <div className="card-header">
            <span>Welcome, please enter your league name</span>
          </div>
          <div className="card-body">
            <form>
                <div className="form-group">
                    <label htmlFor="admin_name">League Name</label>
                    <input 
                        type="text"
                        className="form-control"
                        id="leadue_name"
                        name="league_name"
                        aria-describedby="emailHelp"
                        placeholder="Enter League Name"
                        // value={loginCreds.admin_name}
                        // onChange={}
                    />
                </div>
                <button type="submit" className="btn btn-primary" >Search</button>
            </form>
          </div>
          <div class="card-footer text-muted">
            <span>Don't have a league? Create a league <a href="#">here</a></span>
          </div>
        </div>
      </div>




      <div className=" mb-3 title">
        <h1 className="mb-0">Overview</h1>        
      </div>
      <ErrorAlert error={usersError || teamsError} />
      <div className="table-responsive table-responsive-sm table-responsive-md">
        <table className="table-sm">
          <thead className="tableHead">
            <tr>
              <th>Name</th>
              <th className="team-column">Team 1</th>
              <th className="team-column">Team 2</th>
              <th className="team-column">Team 3</th>
              <th className="team-column">Team 4</th>
              <th>Points</th>
              <th>GD</th>
            </tr>
          </thead>
          
          <tbody>{/* Renders '... loading' while data loads*/}
            {users.length > 0 && teams.length > 0 ? (
              //sorts users data by point totals in descending order then renders information using .map & User component
              users.sort((user1, user2) => {
                  const points1 = calculateAllPoints(teams, user1);
                  const points2 = calculateAllPoints(teams, user2);
                  return points2 - points1;
                })
                  .map((oneUser, indx) => (
                    <User
                      key={oneUser.userId}
                      user={oneUser}
                      teams={teams}
                      gD={calculateGD(teams, oneUser)}
                      points={calculateAllPoints(teams, oneUser)}
                      findTeam={findTeam}
                    />
              ))
            ) : (
              <tr>
                <td colSpan="8">Loading...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/*ErrorAlert not needed yet, waiting to get main functionality working first */}
      {/* <ErrorAlert error={usersError} /> */}

    </main>
  );
}

export default Dashboard;