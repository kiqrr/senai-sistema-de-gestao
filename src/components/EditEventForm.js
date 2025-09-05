import { useState } from "react";
import supabase from "../supabaseClient";
import "./Dashboard.css";

export default function EditEventForm({ event, onClose, onUpdated }) {
  const [form, setForm] = useState({
    nome: event.nome,
    data: event.data,
    local: event.local,
    descricao: event.descricao,
    capacidade: event.capacidade,
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { error } = await supabase
      .from("events")
      .update(form)
      .eq("id", event.id);

    if (!error) {
      onUpdated();
      onClose();
    } else {
      alert("Erro ao atualizar evento");
    }
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Editar Evento</h3>
        <form onSubmit={handleSubmit} className="edit-event-form">
          <label>Nome</label>
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
          />

          <label>Data</label>
          <input
            type="date"
            name="data"
            value={form.data}
            onChange={handleChange}
          />

          <label>Local</label>
          <input
            type="text"
            name="local"
            value={form.local}
            onChange={handleChange}
          />

          <label>Descrição</label>
          <textarea
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
          />

          <label>Capacidade</label>
          <input
            type="number"
            name="capacidade"
            value={form.capacidade}
            onChange={handleChange}
          />

          <div className="form-actions">
            <button type="submit" className="save-btn">Salvar</button>
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
