import { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import Header from "./Header";

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    const { data, error } = await supabase.from("events").select("*, users(nome)");
    if (error) console.error(error);
    else setEvents(data);
  }

  return (
    <div>
      <Header />
      <div className="p-6">
        <h2 className="text-2xl mb-4">Eventos Disponíveis</h2>
        {events.map(ev => (
          <div key={ev.id} className="border p-4 mb-2">
            <h3 className="text-xl">{ev.nome}</h3>
            <p>{ev.descricao}</p>
            <p><b>Data:</b> {ev.data}</p>
            <p><b>Local:</b> {ev.local}</p>
            <p><b>Organizador:</b> {ev.users?.nome}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
