import React from "react"

function Group({ group }) {
    return (
      <div className="card group">
        <div className="card-header">{`${group.name}`}</div>
        <ul className="list-group list-group-flush">
          {group.rows.map((row, index) => (
            <li className="list-group-item" key={index}>
              <div className="team-info">
                <span className="team-name">{row.team.name}</span>
                <span className="points">{row.points}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

export default Group