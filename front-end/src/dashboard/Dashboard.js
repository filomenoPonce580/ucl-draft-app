import React, { useEffect, useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { listUsers, listTeams } from "../utils/api";
import {Link} from "react-router-dom"
import { listHabits } from "../utils/api";
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
  }, [teams]);

  return (
    <main>
      <h1 className="title">Dashboard</h1>
      <div className=" mb-3 title">
        <h4 className="mb-0">Overview</h4>        
      </div>
      <ErrorAlert error={usersError || teamsError} />
      <div className="table-responsive table-responsive-sm table-responsive-md">
        <table className="table-sm">
          <thead className="tableHead">
            <tr>
              <th>Name</th>
              <th>Team 1</th>
              <th>Team 2</th>
              <th>Team 3</th>
              <th>Team 4</th>
              <th>Points</th>
              <th>GD</th>
              <th className="actionButtonCol">Action</th>
            </tr>
          </thead>
          
          <tbody>{/* Renders '... loading' while data loads*/}
            {users.length > 0 && teams.length > 0 ? (
              users.map((oneUser, indx) => (
                <User
                  key={oneUser.userId}
                  user={oneUser}
                  teams={teams}
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
      {/* <ErrorAlert error={habitsError} /> */}

    </main>
  );
}

export default Dashboard;