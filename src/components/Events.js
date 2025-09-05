import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";
import Header from "./Header";
import "./Dashboard.css";

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
      <div className="dashboard-container">
        <h2 className="dashboard-title">Eventos Disponíveis</h2>

        <div className="events-grid">
          {events.map((ev) => (
            <div key={ev.id} className="event-card">
              <h3 className="event-card-title">{ev.nome}</h3>
              <p className="event-card-desc">{ev.descricao}</p>
              <p><b>Data:</b> {ev.data}</p>
              <p><b>Local:</b> {ev.local}</p>
              <p><b>Organizador:</b> {ev.users?.nome}</p>

              {!registrations.includes(ev.id) ? (
                <button
                  onClick={() => handleRegister(ev.id)}
                  className="event-button green"
                >
                  Registrar-se
                </button>
              ) : (
                <p className="registered-text">✅ Você está registrado neste evento</p>
              )}

              {registrations.includes(ev.id) && (
                <form
                  onSubmit={(e) => handleFeedback(e, ev.id)}
                  className="feedback-form"
                >
                  <textarea
                    className="event-input textarea"
                    placeholder="Deixe seu feedback..."
                    value={feedbacks[ev.id] || ""}
                    onChange={(e) =>
                      setFeedbacks((prev) => ({
                        ...prev,
                        [ev.id]: e.target.value,
                      }))
                    }
                  />
                  <button type="submit" className="event-button blue">
                    Enviar Feedback
                  </button>
                </form>
              )}

              {!user && (
                <button
                  onClick={() => navigate("/login")}
                  className="event-button gray"
                >
                  Faça login para registrar-se e enviar feedback
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
