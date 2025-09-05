import { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import "./Dashboard.css";

export default function RegistrationsTable({ event, onClose }) {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  async function fetchRegistrations() {
    const { data, error } = await supabase
      .from("registrations")
      .select("id, users(nome, email)")
      .eq("event_id", event.id);

    if (!error) setRegistrations(data);
  }

  async function deleteRegistration(id) {
    const { error } = await supabase.from("registrations").delete().eq("id", id);
    if (!error) {
      setRegistrations((prev) => prev.filter((r) => r.id !== id));
    }
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Inscritos em {event.nome}</h3>
        {registrations.length === 0 ? (
          <p>Nenhum participante inscrito.</p>
        ) : (
          <table className="registrations-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((r) => (
                <tr key={r.id}>
                  <td>{r.users.nome}</td>
                  <td>{r.users.email}</td>
                  <td>
                    <button
                      onClick={() => deleteRegistration(r.id)}
                      className="delete-btn"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="form-actions">
          <button onClick={onClose} className="close-btn">Fechar</button>
        </div>
      </div>
    </div>
  );
}
