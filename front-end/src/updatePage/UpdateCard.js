import React from "react";

function UpdateCard({ formData, teams, seasons, handleInputChange, handleSubmit }) {
  return (
    <div>    
      <div className="card updateCard">
        <h5 className="card-header">Add Score</h5>
        <div className="card-body">
          <form>
                        
            {/* Season Selection Input */}
            <div className="form-group row-md-3">
              <label htmlFor="season" className="form-label updateFormLabel">
                Select Season:{" "}
              </label>
              <select
                className="form-select"
                id="season"
                name="season"
                value={formData ? formData.season : ''}
                onChange={handleInputChange}
                required
              >
                <option value="" defaultValue>
                  Select...
                </option>

                {seasons.map((seasonData) => (
                  <option key={seasonData.id} value={seasonData.id}>
                    {seasonData.season}
                  </option>
                ))}
              </select>
            </div>

            {/* Home team */}
            <h5 className="card-title updateSectionTitle">Select Home Team</h5>
            <div className="form-col centered updateFormCol">
              <div className="form-group row-md-3">
                <label htmlFor="homeTeam" className="form-label updateFormLabel">
                  Home Team:{" "}
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
                    .slice()
                    .sort((a, b) => a.teamName.localeCompare(b.teamName))
                    .map((team) => (
                      <option key={team.teamId} value={team.teamId}>
                        {team.teamName}
                      </option>
                    ))}
                </select>
              </div>
              <div className="form-group row-md-3">
                <label htmlFor="homeTeamGoals" className="updateFormLabel">
                  Goals:{" "}
                </label>
                <input
                  type="text"
                  className="form-control goalsInput"
                  name="homeTeamGoals"
                  id="homeTeamGoals"
                  value={formData ? formData.homeTeamGoals : ''}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Away team */}
            <h5 className="card-title updateSectionTitle">Select Away Team</h5>
            <div className="form-col centered updateFormCol">
              <div className="form-group row-md-3">
                <label htmlFor="awayTeam" className="form-label updateFormLabel">
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
                    .slice()
                    .sort((a, b) => a.teamName.localeCompare(b.teamName))
                    .map((team) => (
                      <option key={team.teamId} value={team.teamId}>
                        {team.teamName}
                      </option>
                    ))}
                </select>
              </div>
              <div className="form-group row-md-3">
                <label htmlFor="awayTeamGoals" className="updateFormLabel">
                  Goals:{" "}
                </label>
                <input
                  type="text"
                  className="form-control goalsInput"
                  name="awayTeamGoals"
                  id="awayTeamGoals"
                  value={formData ? formData.awayTeamGoals : ''}
                  onChange={handleInputChange}
                />
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
  );
}

export default UpdateCard;