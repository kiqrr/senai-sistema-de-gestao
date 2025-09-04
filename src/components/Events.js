import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";
import Header from "./Header";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [feedbacks, setFeedbacks] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
    loadUser();
  }, []);

  async function fetchEvents() {
    const { data, error } = await supabase
      .from("events")
      .select("id, nome, descricao, data, local, users(nome)");
    if (error) console.error(error);
    else setEvents(data);
  }

  async function loadUser() {
    const { data: sessionData } = await supabase.auth.getSession();
    const currentUser = sessionData?.session?.user || null;
    setUser(currentUser);

    if (currentUser) {
      const { data: regs, error } = await supabase
        .from("registrations")
        .select("event_id")
        .eq("participant_id", currentUser.id);
      if (!error) setRegistrations(regs.map((r) => r.event_id));
    }
  }

  async function handleRegister(eventId) {
    if (!user) {
      navigate("/login");
      return;
    }

    const { error } = await supabase
      .from("registrations")
      .insert([{ event_id: eventId, participant_id: user.id }]);

    if (error) {
      if (error.code === "23505") {
        alert("Você já está registrado neste evento.");
      } else {
        console.error(error);
        alert("Erro ao registrar.");
      }
    } else {
      alert("Registro realizado com sucesso!");
      setRegistrations((prev) => [...prev, eventId]);
    }
  }

  async function handleFeedback(e, eventId) {
    e.preventDefault();

    if (!user) {
      navigate("/login");
      return;
    }

    const comentario = feedbacks[eventId];
    if (!comentario) {
      alert("Digite um comentário antes de enviar.");
      return;
    }

    const { error } = await supabase
      .from("feedbacks")
      .insert([{ event_id: eventId, participant_id: user.id, comentario }]);

    if (error) {
      if (error.code === "23505") {
        alert("Você já enviou um feedback para este evento.");
      } else {
        console.error(error);
        alert("Erro ao enviar feedback.");
      }
    } else {
      alert("Feedback enviado com sucesso!");
      setFeedbacks((prev) => ({ ...prev, [eventId]: "" }));
    }
  }

  return (
    <div>
      <Header />
      <div className="p-6">
        <h2 className="text-2xl mb-4">Eventos Disponíveis</h2>

        {events.map((ev) => (
          <div key={ev.id} className="border p-4 mb-4 rounded">
            <h3 className="text-xl font-bold">{ev.nome}</h3>
            <p>{ev.descricao}</p>
            <p>
              <b>Data:</b> {ev.data}
            </p>
            <p>
              <b>Local:</b> {ev.local}
            </p>
            <p>
              <b>Organizador:</b> {ev.users?.nome}
            </p>

            {/* Botão de registro */}
            {!registrations.includes(ev.id) ? (
              <button
                onClick={() => handleRegister(ev.id)}
                className="bg-green-500 text-white px-4 py-2 mt-2 rounded"
              >
                Registrar-se
              </button>
            ) : (
              <p className="text-green-600 mt-2">✅ Você está registrado neste evento</p>
            )}

            {/* Form de feedback só para quem está registrado */}
            {registrations.includes(ev.id) && (
              <form
                onSubmit={(e) => handleFeedback(e, ev.id)}
                className="mt-4"
              >
                <textarea
                  className="border p-2 w-full mb-2"
                  placeholder="Deixe seu feedback..."
                  value={feedbacks[ev.id] || ""}
                  onChange={(e) =>
                    setFeedbacks((prev) => ({
                      ...prev,
                      [ev.id]: e.target.value,
                    }))
                  }
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Enviar Feedback
                </button>
              </form>
            )}

            {!user && (
              <button
                onClick={() => navigate("/login")}
                className="bg-gray-400 text-white px-4 py-2 mt-2 rounded"
              >
                Faça login para registrar-se e enviar feedback
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
