import React from "react";
import RenderRoundRows from "./RenderRoundRows";

function DraftRound({round, users, setUsers, teams, setTeams}){
    function translateNum(number){
        if(number === 1)return 'One'
        if(number === 2)return 'Two'
        if(number === 3)return 'Three'
        if(number === 4)return 'Four'
    }
    let roundText = translateNum(round)
    
    return(
        <div className="card wideCard">
            <div className="card-header" id={`heading${roundText}`}>
                <h5 className="mb-0">
                    <button className="btn btn-link" data-toggle="collapse" data-target={`#collapse${roundText}`} aria-expanded="true" aria-controls={`collapse${roundText}`}>
                    Round {round}
                    </button>
                </h5>
            </div>

            <div id={`collapse${roundText}`} className="collapse show" aria-labelledby={`heading${roundText}`} data-parent="#accordion">
                <div className="card-body">
                <table>
                    <thead>
                        <tr>
                            <th>Pick</th>
                            <th>User</th>
                            <th>Team Selection</th>
                            <th>Confirm</th>
                        </tr>
                    </thead>
                    <tbody>

                        {/* Render rows for a specific round */}
                        <RenderRoundRows round={round} users={users} setUsers={setUsers} teams={teams} setTeams={setTeams}/>
                        {/* Add more rounds as needed */}
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    )
}

export default DraftRound