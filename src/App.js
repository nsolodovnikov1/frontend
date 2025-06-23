import React, { useState, useEffect } from "react";
import TrainEditor from "./TrainEditor";
import RestrictionEditor from "./RestrictionEditor";
import TrainGraph from "./TrainGraph";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

function App() {
  const [trains, setTrains] = useState([]);
  const [restrictions, setRestrictions] = useState([]);
  const [conflicts, setConflicts] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/trains`).then(res => res.json()).then(setTrains);
    fetch(`${API_URL}/restrictions`).then(res => res.json()).then(setRestrictions);
  }, []);

  const analyze = async () => {
    const res = await fetch(`${API_URL}/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({trains, restrictions})
    });
    const data = await res.json();
    setConflicts(data.conflicts || []);
  };

  return (
    <div>
      <h1>Train Schedule App</h1>
      <TrainEditor trains={trains} setTrains={setTrains} apiUrl={API_URL} />
      <RestrictionEditor restrictions={restrictions} setRestrictions={setRestrictions} apiUrl={API_URL} />
      <button onClick={analyze}>Анализ конфликтов</button>
      {conflicts.length > 0 && (
        <div>
          <h3>Конфликты:</h3>
          <ul>
            {conflicts.map((c, i) => (
              <li key={i}>{JSON.stringify(c)}</li>
            ))}
          </ul>
        </div>
      )}
      <TrainGraph trains={trains} />
    </div>
  );
}

export default App;