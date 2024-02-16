import React from "react";

function AddSeasonCard({ teams, seasons, results, handleInputChange, formData}) {
    function handleSeasonSubmit(){
        console.log("submit")
    }
  return (
    <div>    
      {/* {console.log("seasons: ", seasons)}
      {console.log("teams: ", teams)}
      {console.log("results: ", results)} */}
      <div className="card updateCard">
        <h5 className="card-header">Add New Season</h5>
        <div className="card-body">
          <form>                        

            {/* new season */}
            <h5 className="card-title updateSectionTitle">Select Home Team</h5>
            <div className="form-col centered updateFormCol">
              <div className="form-group row-md-3">
                <label htmlFor="seasonName" className="updateFormLabel">
                  Season:{" "}
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

            <button
              type="submit"
              className="btn btn-primary m-1"
              onClick={handleSeasonSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddSeasonCard;