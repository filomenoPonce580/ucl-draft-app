import React, { useState } from "react";

function UpdateData(){
    const initialFormData = {
        team1: '',
        team2: '',
        team1Goals: '',
        team2Goals: ''
    }
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
        console.log(formData)
    }
    return (
        <div>
            <h1>Card: Add score</h1>
            <div className="card">
                <h5 className="card-header">Add Score</h5>
                <div className="card-body">

                    <form>
                    <h5 className="card-title">Select Home Team</h5>
                        <div className="form-row">
                            <div className="form-group col-md-3">
                                <label htmlFor="team1" className="form-label">
                                    Home Team:{" "}
                                </label>
                                <select
                                    className="form-select"
                                    id="team1"
                                    name="team1"
                                    value={formData.team1}
                                    onChange={handleInputChange}
                                    required
                                    >
                                <option value="" disabled defaultValue>
                                    Select...
                                </option>
                                {Object.keys(teams).map((teamId) => (
                                    <option key={teamId} value={teamId}>
                                        {teams[teamId].teamName}
                                    </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="team1Goals">Goals: </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="team1Goals"
                                    id="team1Goals"

                                    value={formData ? formData.team1Goals : ''}
                                    onChange={handleInputChange}/>
                            </div>
                        </div>

                        <h5 className="card-title">Select Away Team</h5>
                        <div className="form-row">
                            <div className="form-group col-md-3">
                                <label htmlFor="team2" className="form-label">
                                    Away Team:{" "}
                                </label>
                                <select
                                    className="form-select"
                                    id="team2"
                                    name="team2"
                                    value={formData.team2}
                                    onChange={handleInputChange}
                                    required
                                    >
                                <option value="" disabled defaultValue>
                                    Select...
                                </option>
                                {Object.keys(teams).map((teamId) => (
                                    <option key={teamId} value={teamId}>
                                        {teams[teamId].teamName}
                                    </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="team2Goals">Goals: </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="team2Goals"
                                    id="team2Goals"

                                    value={formData ? formData.team2Goals : ''}
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