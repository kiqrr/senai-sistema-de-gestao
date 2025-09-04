import { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import Header from "./Header";
import EventForm from "./EventForm";

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
      <div className="p-6">
        <h2 className="text-2xl mb-4">Meu Dashboard</h2>
        <EventForm onSaved={fetchMyEvents} />
        <h3 className="text-xl mt-6">Meus Eventos</h3>
        {events.map(ev => (
          <div key={ev.id} className="border p-4 mb-2">
            <h3>{ev.nome}</h3>
            <p>{ev.descricao}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
