import { useState } from "react";
import supabase from "../supabaseClient";
import "./Dashboard.css";

export default function EventForm({ onSaved }) {
  const [nome, setNome] = useState("");
  const [data, setData] = useState("");
  const [local, setLocal] = useState("");
  const [descricao, setDescricao] = useState("");
  const [capacidade, setCapacidade] = useState("");
  const [price, setPrice] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const user = (await supabase.auth.getUser()).data.user;
    const { error } = await supabase.from("events").insert([
      { nome, data, local, descricao, capacidade, price: parseFloat(price) || 0, organizer_id: user.id }
    ]);
    if (error) console.error(error);
    else {
      setNome(""); setData(""); setLocal(""); setDescricao(""); setCapacidade(""); setPrice("");
      onSaved();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="event-form">
      <h3 className="event-form-title">Criar Evento</h3>
      <input className="event-input" placeholder="Nome"
        value={nome} onChange={(e) => setNome(e.target.value)} required />
      <input className="event-input" type="date"
        value={data} onChange={(e) => setData(e.target.value)} required />
      <input className="event-input" placeholder="Local"
        value={local} onChange={(e) => setLocal(e.target.value)} required />
      <textarea className="event-input textarea" placeholder="Descrição"
        value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
      <input className="event-input" type="number" placeholder="Capacidade"
        value={capacidade} onChange={(e) => setCapacidade(e.target.value)} required />
      <input className="event-input" type="number" step="0.01" placeholder="Preço do Ingresso (R$)"
        value={price} onChange={(e) => setPrice(e.target.value)} />
      <button type="submit" className="event-button">Salvar</button>
    </form>
  );
}
