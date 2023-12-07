import React from "react";

function UpdateCard({formData, teams, handleInputChange, handleSubmit}){
    return (
        <div>
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
                                  .slice()
                                  .sort((a, b) => a.teamName.localeCompare(b.teamName)) // Sorts alphabetically
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
                                  .slice()
                                  .sort((a, b) => a.teamName.localeCompare(b.teamName)) // Sorts alphabetically
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

export default UpdateCard