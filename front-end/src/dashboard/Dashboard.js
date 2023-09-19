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
      name: "LG",
      id: 1,
      team1: '18',
      team2: '20',
      team3: '11',
      team4: '17',
    },
    {
      name: "Alex",
      id: 2,
      team1: '4',
      team2: '28',
      team3: '26',
      team4: '31',
    },
    {
      name: "Jr",
      id: 3,
      team1: '3',
      team2: '16',
      team3: '5',
      team4: '29',
    },
    {
      name: "Chase",
      id: 4,
      team1: '1',
      team2: '19',
      team3: '22',
      team4: '30',
    },
    {
      name: "Gus",
      id: 5,
      team1: '25',
      team2: '12',
      team3: '24',
      team4: '15',
    },
    {
      name: "Tots",
      id: 6,
      team1: '14',
      team2: '23',
      team3: '13',
      team4: '6',
    },    {
      name: "Cosso",
      id: 7,
      team1: '21',
      team2: '2',
      team3: '10',
      team4: '27',
    },
  ]

  const teams = {
    '0': {
      teamName: 'Antwerp',
      abbreviation: 'ANT',
      country: 'BEL',
      results: ['L'],
      goalsFor: 0,
      goalsAgainst: 5,
    },
    '1': {
      teamName: 'Arsenal',
      abbreviation: 'ARS',
      country: 'ENG',
      results: [],
      goalsFor: 0,
      goalsAgainst: 0,
    },
    '2': {
      teamName: 'Atletico de Madrid',
      abbreviation: 'ATM',
      country: 'ESP',
      results: ['D'],
      goalsFor: 1,
      goalsAgainst: 1,
    },
    '3': {
      teamName: 'Barcelona',
      abbreviation: 'BAR',
      country: 'ESP',
      results: ['W'],
      goalsFor: 5,
      goalsAgainst: 0,
    },
    '4': {
      teamName: 'Bayern Munich',
      abbreviation: 'BAY',
      country: 'GER',
      results: [],
      goalsFor: 0,
      goalsAgainst: 0,
    },
    '5': {
      teamName: 'Benfica',
      abbreviation: 'BEN',
      country: 'POR',
      results: [],
      goalsFor: 0,
      goalsAgainst: 0,
    },
    '6': {
      teamName: 'Braga',
      abbreviation: 'BRA',
      country: 'POR',
      results: [],
      goalsFor: 0,
      goalsAgainst: 0,
    },
    '7': {
      teamName: 'Celtic',
      abbreviation: 'CEL',
      country: 'SCO',
      results: ['L'],
      goalsFor: 0,
      goalsAgainst: 2,
    },
    '8': {
      teamName: 'Copenhagen',
      abbreviation: 'COP',
      country: 'DEN',
      results: [],
      goalsFor: 0,
      goalsAgainst: 0,
    },
    '9': {
      teamName: 'Crvena Zvezda',
      abbreviation: 'CRZ',
      country: 'SRB',
      results: ['L'],
      goalsFor: 0,
      goalsAgainst: 0,
    },
    '10': {
      teamName: 'Dortmund',
      abbreviation: 'DOR',
      country: 'GER',
      results: ['L'],
      goalsFor: 0,
      goalsAgainst: 0,
    },
    '11': {
      teamName: 'FC Porto',
      abbreviation: 'POR',
      country: 'POR',
      results: ['W'],
      goalsFor: 3,
      goalsAgainst: 1,
    },
    '12': {
      teamName: 'Feyenoord',
      abbreviation: 'FEY',
      country: 'NED',
      results: ['W'],
      goalsFor: 2,
      goalsAgainst: 0,
    },
    '13': {
      teamName: 'Galatasaray',
      abbreviation: 'GAL',
      country: 'TUR',
      results: [],
      goalsFor: 0,
      goalsAgainst: 0,
    },
    '14': {
      teamName: 'Inter Milan',
      abbreviation: 'INT',
      country: 'ITA',
      results: [],
      goalsFor: 0,
      goalsAgainst: 0,
    },
    '15': {
      teamName: 'Lazio',
      abbreviation: 'LAZ',
      country: 'ITA',
      results: ['D'],
      goalsFor: 1,
      goalsAgainst: 1,
    },
    '16': {
      teamName: 'Leipzig',
      abbreviation: 'LEI',
      country: 'GER',
      results: ['W'],
      goalsFor: 3,
      goalsAgainst: 1,
    },
    '17': {
      teamName: 'Lens',
      abbreviation: 'LEN',
      country: 'FRA',
      results: [],
      goalsFor: 0,
      goalsAgainst: 0,
    },
    '18': {
      teamName: 'Manchester City',
      abbreviation: 'MCI',
      country: 'ENG',
      results: ['W'],
      goalsFor: 3,
      goalsAgainst: 1,
    },
    '19': {
      teamName: 'Manchester United',
      abbreviation: 'MAN',
      country: 'ENG',
      results: [],
      goalsFor: 0,
      goalsAgainst: 0,
    },
    '20': {
      teamName: 'AC Milan',
      abbreviation: 'MIL',
      country: 'ITA',
      results: ['D'],
      goalsFor: 0,
      goalsAgainst: 0,
    },
    '21': {
      teamName: 'Napoli',
      abbreviation: 'NAP',
      country: 'ITA',
      results: [],
      goalsFor: 0,
      goalsAgainst: 0,
    },
    '22': {
      teamName: 'Newcastle',
      abbreviation: 'NEW',
      country: 'ENG',
      results: ['D'],
      goalsFor: 0,
      goalsAgainst: 0,
    },
    '23': {
      teamName: 'Paris Saint Germain',
      abbreviation: 'PSG',
      country: 'FRA',
      results: ['W'],
      goalsFor: 0,
      goalsAgainst: 0,
    },
    '24': {
      teamName: 'PSV',
      abbreviation: 'PSV',
      country: 'NED',
      results: [],
      goalsFor: 0,
      goalsAgainst: 0,
    },
    '25': {
      teamName: 'Real Madrid',
      abbreviation: 'RMA',
      country: 'ESP',
      results: [],
      goalsFor: 0,
      goalsAgainst: 0,
    },
    '26': {
      teamName: 'Real Sociedad',
      abbreviation: 'SOC',
      country: 'ESP',
      results: [],
      goalsFor: 0,
      goalsAgainst: 0,
    },
    '27': {
      teamName: 'Salzburg',
      abbreviation: 'SAL',
      country: 'AUT',
      results: [],
      goalsFor: 0,
      goalsAgainst: 0,
    },
    '28': {
      teamName: 'Sevilla',
      abbreviation: 'SEV',
      country: 'ESP',
      results: [],
      goalsFor: 0,
      goalsAgainst: 0,
    },
    '29': {
      teamName: 'Shakhtar Donetsk',
      abbreviation: 'SHA',
      country: 'UKR',
      results: ['L'],
      goalsFor: 1,
      goalsAgainst: 3,
    },
    '30': {
      teamName: 'Union Berlin',
      abbreviation: 'UNI',
      country: 'GER',
      results: [],
      goalsFor: 0,
      goalsAgainst: 0,
    },
    '31': {
      teamName: 'Young Boys',
      abbreviation: 'YB',
      country: 'SUI',
      results: ['L'],
      goalsFor: 1,
      goalsAgainst: 3,
    }
  };

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
              <th>GD</th>
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