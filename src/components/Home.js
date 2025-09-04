import { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import Header from "./Header";

export default function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    const { data, error } = await supabase
      .from("events")
      .select("id, nome, data, local, descricao, capacidade, users(nome), feedbacks(comentario, users(nome))");

    if (error) {
      console.error(error);
    } else {
      setEvents(data);
    }
  }

  return (
    <div>
      <Header />
      <main className="p-6">
        <h1 className="text-2xl mb-4">Eventos Públicos 🎉</h1>

        {events.map((ev) => (
          <div key={ev.id} className="border p-4 mb-4 rounded">
            <h2 className="text-xl font-bold">{ev.nome}</h2>
            <p><b>Data:</b> {ev.data}</p>
            <p><b>Local:</b> {ev.local}</p>
            <p><b>Descrição:</b> {ev.descricao}</p>
            <p><b>Capacidade:</b> {ev.capacidade}</p>
            <p><b>Organizador:</b> {ev.users?.nome}</p>

            {/* Mostra até 3 feedbacks */}
            {ev.feedbacks?.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold">Feedbacks recentes:</h3>
                <ul className="list-disc list-inside">
                  {ev.feedbacks.slice(0, 3).map((fb, i) => (
                    <li key={i}>
                      <span className="italic">"{fb.comentario}"</span>{" "}
                      — <b>{fb.users?.nome || "Anônimo"}</b>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </main>
    </div>
  );
}
