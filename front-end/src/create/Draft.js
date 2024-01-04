import React from "react";

function Draft({ teams }) {
    return (
      <div className="row team-cards-whole">
        {teams.map((team, i) => (
          <div key={i} >
            <div className="card draft-room-teams">
              <div className="card-body">
                {team.teamName}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

export default Draft