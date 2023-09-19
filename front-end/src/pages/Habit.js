import React from "react";
import {Link} from "react-router-dom"

//creates individual habits for the habit component
function Habit({habit}){
    return (
        <tr>
            <td>{habit.habit_name}</td>
            <td>{habit.habit_description}</td>
            <td><button>+</button></td>
            <td><button>-</button></td>
            <td><Link to={`/habits/edit`}><button>Edit Habit</button></Link></td>
        </tr>
    )
}

export default Habit