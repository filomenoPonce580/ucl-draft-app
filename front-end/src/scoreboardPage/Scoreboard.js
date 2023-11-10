import React, { useState, useEffect } from "react";
import { fetchUCLData } from "../utils/api";
import Group from "./Group";

function Scoreboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const uclData = await fetchUCLData();
        setData(uclData);
      } catch (error) {
        setError("Error loading UCL data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log("UCL Data in component:", data);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!data || (Array.isArray(data) && data.length === 0)) {
    return <div>No UCL data available</div>;
  }

  // Render UCL data here
  if(data){
    return (
      <div>
        {data.standings.map((group, index) => (
          <Group group={group} key={index}/>
        ))}
      </div>
    );    
  }
}

export default Scoreboard;