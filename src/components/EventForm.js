import { useState } from "react";
import supabase from "../supabaseClient";

export default function EventForm({ onSaved }) {
  const [nome, setNome] = useState("");
  const [data, setData] = useState("");
  const [local, setLocal] = useState("");
  const [descricao, setDescricao] = useState("");
  const [capacidade, setCapacidade] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const user = (await supabase.auth.getUser()).data.user;
    const { error } = await supabase.from("events").insert([
      { nome, data, local, descricao, capacidade, organizer_id: user.id }
    ]);
    if (error) console.error(error);
    else {
      setNome(""); setData(""); setLocal(""); setDescricao(""); setCapacidade("");
      onSaved();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 border mb-4">
      <h3 className="text-lg">Criar Evento</h3>
      <input className="border p-2 block my-2" placeholder="Nome"
        value={nome} onChange={(e) => setNome(e.target.value)} />
      <input className="border p-2 block my-2" type="date"
        value={data} onChange={(e) => setData(e.target.value)} />
      <input className="border p-2 block my-2" placeholder="Local"
        value={local} onChange={(e) => setLocal(e.target.value)} />
      <textarea className="border p-2 block my-2" placeholder="Descrição"
        value={descricao} onChange={(e) => setDescricao(e.target.value)} />
      <input className="border p-2 block my-2" type="number" placeholder="Capacidade"
        value={capacidade} onChange={(e) => setCapacidade(e.target.value)} />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">Salvar</button>
    </form>
  );
}
