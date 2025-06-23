import React, { useState } from "react";

export default function RestrictionEditor({ restrictions, setRestrictions, apiUrl }) {
  const [r, setR] = useState({
    type: "",
    segment: "",
    value: "",
    start_time: "",
    end_time: ""
  });

  const addRestriction = async () => {
    if (!r.type || !r.segment) return;
    const res = await fetch(`${apiUrl}/restrictions`, {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({ ...r, value: r.value ? Number(r.value) : null })
    });
    const newR = await res.json();
    setRestrictions([...restrictions, newR]);
    setR({ type: "", segment: "", value: "", start_time: "", end_time: "" });
  };

  return (
    <div>
      <h3>Добавить ограничение</h3>
      <input placeholder="Тип (speed/closed/window)" value={r.type} onChange={e => setR({...r, type: e.target.value})} />
      <input placeholder="Участок" value={r.segment} onChange={e => setR({...r, segment: e.target.value})} />
      <input placeholder="Значение" value={r.value} onChange={e => setR({...r, value: e.target.value})} />
      <input type="time" placeholder="Начало" value={r.start_time} onChange={e => setR({...r, start_time: e.target.value})} />
      <input type="time" placeholder="Конец" value={r.end_time} onChange={e => setR({...r, end_time: e.target.value})} />
      <button onClick={addRestriction}>Добавить ограничение</button>
      <ul>
        {restrictions.map(r => (
          <li key={r.id}>
            {r.type} {r.segment} {r.value} {r.start_time}-{r.end_time}
          </li>
        ))}
      </ul>
    </div>
  );
}