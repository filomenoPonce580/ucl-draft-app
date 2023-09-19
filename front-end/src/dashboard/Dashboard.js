import React, { useEffect, useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
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

  const dummyUsers = [
    {
      'name': "Fil",
      'id': 1,
      'team1': '0'
    },
    {
      'name': "Gus",
      'id': 2,
      'team1': '1'
    },
  ]

  const teams = {
    '0': {
      'teamName': 'Manchester City',
      results: ['W', 'W', 'D']
    },
    '1': {
      'teamName': 'Real Madrid',
      results: ['W', 'W', 'D']
    }
  }

  useEffect(loadDashboard, []);

  function loadDashboard() {
    const abortController = new AbortController();
    // setReservationsError(null);
    // listReservations({  }, abortController.signal)
    //   .then(setReservations)
    //   .catch(setReservationsError);
    // listTables(abortController.signal)
    //   .then(setTables)
    //   .catch(setTablesError)
    setUsers(dummyUsers)
    return () => abortController.abort();
  }

  return (
    <main>
      <h1 className="title">Dashboard</h1>
      <div className=" mb-3 title">
        <h4 className="mb-0">Overview</h4>        
      </div>
      <ErrorAlert error={usersError} />
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
              <th className="actionButtonCol">Action</th>
            </tr>
          </thead>
          <tbody>
              {users.map((oneUser, indx) => <User key={oneUser.id} user={oneUser} teams={teams}/>)}
          </tbody>
        </table>
      </div>
    </main>
  );
}

    //   {/* JSON line not needed, ErrorAlert not needed yet, waiting to get main functionality working first */}
    //   {/* <ErrorAlert error={habitsError} /> */}
    //   {/* {JSON.stringify(habits)} */}
    // </main>
//   );
// }

export default Dashboard;