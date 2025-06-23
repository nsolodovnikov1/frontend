import React, { useState } from "react";

export default function TrainEditor({ trains, setTrains, apiUrl }) {
  const [name, setName] = useState("");
  const [route, setRoute] = useState([{ station: "", arrival: "", departure: "" }]);

  const addRoutePoint = () =>
    setRoute([...route, { station: "", arrival: "", departure: "" }]);

  const handleRouteChange = (idx, field, value) => {
    const newRoute = [...route];
    newRoute[idx][field] = value;
    setRoute(newRoute);
  };

  const addTrain = async () => {
    if (!name) return;
    const res = await fetch(`${apiUrl}/trains`, {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({ name, routes: route })
    });
    const newTrain = await res.json();
    setTrains([...trains, newTrain]);
    setName("");
    setRoute([{ station: "", arrival: "", departure: "" }]);
  };

  return (
    <div>
      <h3>Добавить поезд</h3>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Название поезда" />
      {route.map((r, idx) => (
        <div key={idx} style={{marginBottom: "4px"}}>
          <input
            value={r.station}
            onChange={e => handleRouteChange(idx, "station", e.target.value)}
            placeholder="Станция"
          />
          <input
            type="time"
            value={r.arrival}
            onChange={e => handleRouteChange(idx, "arrival", e.target.value)}
            placeholder="Прибытие"
          />
          <input
            type="time"
            value={r.departure}
            onChange={e => handleRouteChange(idx, "departure", e.target.value)}
            placeholder="Отправление"
          />
        </div>
      ))}
      <button onClick={addRoutePoint}>Добавить точку маршрута</button>
      <button onClick={addTrain}>Добавить поезд</button>
      <ul>
        {trains.map(train => (
          <li key={train.id}>
            {train.name}: {train.routes?.map(r => r.station).join(" → ")}
          </li>
        ))}
      </ul>
    </div>
  );
}