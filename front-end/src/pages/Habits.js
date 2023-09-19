//import HabitForm from "./HabitForm"; // Update the path as needed
import React, { useEffect, useState } from "react";
import {BrowserRouter as Router, Link, useHistory} from "react-router-dom"
import Habit from "./Habit";


function Habits({habits}){
    return (
        <main>
            <h1>Habits</h1>
            <div className="table-responsive table-responsive-sm table-responsive-md">
                <table className="table-sm">
                <thead className="tableHead">
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Action +</th>
                        <th>Action -</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {habits.map((oneHab) => <Habit key={oneHab.habit_id} habit={oneHab}/>)}
                </tbody>
                </table>
            </div>

            <Link to={`/habits/new`}><button>New Habit</button></Link>
        </main>
    );
}

export default Habits