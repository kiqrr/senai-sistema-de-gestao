import { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import Header from "./Header";
import EventForm from "./EventForm";
import EditEventForm from "./EditEventForm";
import RegistrationsTable from "./RegistrationsTable";
import "./Dashboard.css";

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

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

        <div className="dashboard-actions">
          {/* Removed Financial Reports button as component is deleted */}
          {/* <button onClick={() => setShowFinancialReports(true)} className="event-button blue">
            Relatórios Financeiros
          </button> */}
        </div>

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

              <div className="event-actions">
                <button onClick={() => setEditingEvent(ev)} className="event-btn">
                  Editar evento
                </button>
                <button onClick={() => setSelectedEvent(ev)} className="event-btn">
                  Ver inscritos
                </button>
                {/* Removed Co-Organizadores button as component is deleted */}
                {/* <button onClick={() => setManagingCoOrganizers(ev)} className="event-btn orange">
                  Co-Organizadores
                </button> */}
              </div>
            </div>
          ))}
        </div>

        {/* Formulário de edição */}
        {editingEvent && (
          <EditEventForm
            event={editingEvent}
            onClose={() => setEditingEvent(null)}
            onUpdated={fetchMyEvents}
          />
        )}

        {/* Tabela de inscritos */}
        {selectedEvent && (
          <RegistrationsTable
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
          />
        )}

        {/* Relatórios Financeiros */}
        {/* Removed FinancialReports component usage */}
        {/* {showFinancialReports && (
          <FinancialReports
            onClose={() => setShowFinancialReports(false)}
          />
        )} */}

        {/* Gerenciamento de Co-Organizadores */}
        {/* Removed CoOrganizerManagement component usage */}
        {/* {managingCoOrganizers && (
          <CoOrganizerManagement
            event={managingCoOrganizers}
            onClose={() => setManagingCoOrganizers(null)}
          />
        )} */}
      </div>
    </div>
  );
}
