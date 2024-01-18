import React, {useState} from "react";

function CreateLeagueForm( {onSubmit}){
    const [leagueName, setLeagueName] = useState('');
    const [players, setPlayers] = useState(Array(8).fill(''));

    // function handleInputChange(event) {
    //     event.preventDefault();
    //     setLeague({
    //       [event.target.name]: event.target.value,
    //     });
    // }
    function handleLeagueNameChange(event) {
        setLeagueName(event.target.value);
    }

    function handlePlayerNameChange(event, index) {
        const updatedPlayerNames = [...players];
        updatedPlayerNames[index] = event.target.value;
        setPlayers(updatedPlayerNames);
    }


    function handleSubmit(event) {
        event.preventDefault();
        // Pass data to parent component
        onSubmit({ leagueName, players });
    }

    return(
        <div className="centered-container">
            <div className="card text-center">
                <div className="card-header">
                    <span>League Information </span>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="admin_name">League Name</label>
                            <input 
                                type="text"
                                className="form-control"
                                id="leadue_name"
                                name="league_name"
                                aria-describedby="emailHelp"
                                placeholder="Enter League Name"
                                value={leagueName}
                                onChange={handleLeagueNameChange}
                            />
                        </div>
                        {/* Player Names */}
                        {Array.from({ length: 8 }, (_, index) => (
                            <div className="form-group" key={index}>
                                <div className="d-flex align-items-center">
                                <label htmlFor={`player${index + 1}`} className="mr-2 createFormLabels">
                                    Player {index + 1}:
                                </label>
                                <input 
                                    type="text"
                                    className="form-control createFormInputs"
                                    id={`player${index + 1}`}
                                    name={`player${index + 1}`}
                                    placeholder={`Enter Player ${index + 1} Name`}
                                    value={players[index]}
                                    onChange={(e) => handlePlayerNameChange(e, index)}
                                />
                                </div>
                            </div>
                        ))}                       
                        <button type="submit" className="btn btn-primary" >Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateLeagueForm