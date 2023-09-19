import React, { useState } from "react";
import { createHabit } from "../utils/api";
import {BrowserRouter, useHistory} from "react-router-dom"

function HabitForm() {
  const history = useHistory()
  let initialFormData = {
    habit_name: "",
    habit_description: "",
    category_id: "",
    difficulty: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  //Data linking the form with categories/difficulties so selection is rendered on page.
  const categories = {
    '1': 'Physical',
    '2': 'Emotional',
    '3': 'Intellectual',
    '4': 'Social',
    '5': 'Spiritual',
    '6': 'Financial',
    '7': 'Occupational',
    '8': 'Environmental',
  }

  const difficulties = {
    1: "Very Easy",
    2: "Easy",
    3: "Moderate",
    4: "Difficult",
    5: "Very Difficult"
  };

  //handle the change in form inputs
  function handleInputChange(event) {
    event.preventDefault();
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  //Creates habit in database successfully. However, new data is not rendering until page is manually reloaded
  const handleSubmit = (event) => {
    event.preventDefault();

    formData.isActive = true;
    formData.category_id = Number(formData.category_id)
    formData.difficulty = Number(formData.difficulty)
    
    const abortController = new AbortController()
    createHabit(formData, abortController.signal)
        .then((res) => {
            history.push(`/`)
        })
    return () => abortController.abort() 
  };

  //Creates form component
  return (
    <div>
      <div className="card m-4 p-4">
        <div className="card-header">Create New Habit</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="habit_name" className="form-label">
                Habit Name
              </label>
              <input
                type="text"
                className="form-control"
                id="habit_name"
                name="habit_name"
                value={formData.habit_name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="habit_description" className="form-label">
                Habit Description
              </label>
              <textarea
                className="form-control"
                id="habit_description"
                name="habit_description"
                value={formData.habit_description}
                onChange={handleInputChange}
                required
              />
            </div>
            {/* CODE FOR DROPDOWN INPUT (DIFFICULTY)
            
            <div className="mb-3">
                        <label htmlFor="difficulty" className="form-label">Difficulty: </label>
                        <select
                            className="form-select"
                            id="difficulty"
                            name="difficulty"
                            value={formData.difficulty}
                            onChange={handleInputChange}
                            required
                        >
                        <option value="" disabled defaultValue>Select difficulty...</option>
                        {Object.keys(testDifficulties).map((difficultyId) => (
                            <option key={difficultyId} value={difficultyId}>{testDifficulties[difficultyId]}</option>
                        ))}
                        </select>
                    </div> */}

            {/* CODE FOR SLIDER (DIFFICULTY) */}
            <div className="mb-3">
              <label htmlFor="difficulty" className="form-label">
                Difficulty:
              </label>
              <input
                type="range"
                className="form-range"
                id="difficulty"
                name="difficulty"
                min="1"
                max="5"
                step="1"
                value={formData.difficulty}
                onChange={handleInputChange}
              />
              <div className="text-center">{formData.difficulty ? `${formData.difficulty}: ${difficulties[formData.difficulty]}` : ''}</div>
            </div>
            <div className="mb-3">
              <label htmlFor="category" className="form-label">
                Category:{" "}
              </label>
              <select
                className="form-select"
                id="category_id"
                name="category_id"
                value={formData.category_id}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled defaultValue>
                  Select category...
                </option>
                {Object.keys(categories).map((categoryId) => (
                  <option key={categoryId} value={categoryId}>
                    {categories[categoryId]}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              Create Habit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default HabitForm;
