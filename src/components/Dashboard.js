import { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import Header from "./Header";
import EventForm from "./EventForm";
import "./Dashboard.css";

export default function Dashboard() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchMyEvents();
  }, []);

  async function fetchMyEvents() {
    const user = (await supabase.auth.getUser()).data.user;
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("organizer_id", user.id);
    if (!error) setEvents(data);
  }

  return (
    <div>
      <Header />
      <div className="dashboard-container">
        <h2 className="dashboard-title">Meu Dashboard</h2>
        <EventForm onSaved={fetchMyEvents} />

        <h3 className="dashboard-subtitle">Meus Eventos</h3>
        <div className="events-grid">
          {events.map((ev) => (
            <div key={ev.id} className="event-card">
              <h3 className="event-card-title">{ev.nome}</h3>
              <p className="event-card-desc">{ev.descricao}</p>
              <p><b>Data:</b> {ev.data}</p>
              <p><b>Local:</b> {ev.local}</p>
              <p><b>Capacidade:</b> {ev.capacidade}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
