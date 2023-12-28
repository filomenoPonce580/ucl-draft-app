import React, { useEffect, useState } from "react";
import { listTeams } from "../utils/api";
import CreateLeagueForm from "./CreateLeagueForm";

function CreateLeague(){
    const [teams, setTeams] = useState([]);
    const [teamsError, setTeamsError] = useState(null);
    const initialLeague = {
        leagueName: "",
        players: [],
    }
    const [league, setLeague] = useState(initialLeague)
  
    useEffect(() => {
      const abortController = new AbortController();
    
      async function loadTeams() {
        try {

          setTeamsError(null);
    
          const teamsData = await listTeams(abortController.signal);
    
          // Check if the component is still mounted before setting the state
          if (!abortController.signal.aborted) {
            setTeams(teamsData);
          }
        } catch (error) {
          if (!abortController.signal.aborted) {
            // Only update errors if the operation was not aborted
            setTeamsError(error);
          }
        }
      }
    
      loadTeams();
    
      return () => {
        abortController.abort();
      };
    }, []);

    // Function to handle form submission from CreateLeagueForm
    function handleFormSubmit(formData) {
        // Do something with the submitted data (formData)
        console.log("Form data submitted:", formData);
        // For example, update the league state
        setLeague(formData);
    }


    return (
        <div>
        <CreateLeagueForm league={league} teams={teams} onSubmit={handleFormSubmit}/>

        {console.log(teams)}

        {teams.map((team, i)=>{
            return <h1 key={i}>{team.teamName}</h1>
        })}


        </div>
    )
}

export default CreateLeague


/*
functionality:
    - should have access to available teams for the current season
    - randomize function for users
    - draft players
    - 
    form:
        - enter league name
        - enter users
    
    - randomizer (decides draft order)
    - next page allows players draft teams
    - finish returns to dashboard





*/