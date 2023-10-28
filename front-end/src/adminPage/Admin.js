import React, { useState, useEffect } from "react";
import { listUsers, listTeams, updateResults } from "../utils/api";
import {useHistory} from "react-router-dom"

function Admin(){
    return (
        <div>
            <h1>Admin page in development...</h1>
            <h2>Features to add:</h2>
            <h3>Log in feature</h3>
            <span>if not logged in, display log in card. once logged in display the following options</span>
            
            <div>
                <ol>
                    <li>Add nww teams each season, set the active teams so new leagues can only choose from the active teams</li>
                    <li>move update data page functionality to here(admin updates scores for now)</li>
                    <li>Display all leagues, have ability to edit leagues</li> 
                </ol>

            </div>
        </div>
    )
    

}

export default Admin