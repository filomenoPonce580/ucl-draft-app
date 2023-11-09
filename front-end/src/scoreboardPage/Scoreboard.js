import React, { useState, useEffect } from "react";
import { fetchUCLData } from "../utils/api";

function Scoreboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://api.football-data.org/v4/competitions', {
            method: 'GET',
            headers: {
              'X-Auth-Token': '425961e8665a48a99e6d118ff052dfd2', // Replace with your API key
            },
          });
          if (response.ok) {
            const json = await response.json();
            setData(json);
          } else {
            console.error('API request failed');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
        setLoading(false);
      };
  
      fetchData();
    }, []);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (!data) {
      return <div>Error loading data</div>;
    }
  
    // Render your data here
    return (
      <div>
        {/* Render your data here */}
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
}

export default Scoreboard;