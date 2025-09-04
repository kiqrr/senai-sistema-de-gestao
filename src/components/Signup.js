import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";

export default function Signup() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [role, setRole] = useState("participant");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({ email, password: senha });
    if (error) return alert(error.message);

    const userId = data.user.id;
    await supabase.from("users").insert([{ id: userId, nome, email, role }]);
    navigate("/");
  };

  return (
    <form onSubmit={handleSignup} className="p-6">
      <h2 className="text-xl">Cadastro</h2>
      <input className="border p-2 block my-2" placeholder="Nome"
        value={nome} onChange={(e) => setNome(e.target.value)} />
      <input className="border p-2 block my-2" type="email" placeholder="Email"
        value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="border p-2 block my-2" type="password" placeholder="Senha"
        value={senha} onChange={(e) => setSenha(e.target.value)} />
      <select className="border p-2 block my-2"
        value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="participant">Participante</option>
        <option value="organizer">Organizador</option>
      </select>
      <button type="submit" className="bg-green-500 text-white px-4 py-2">Cadastrar</button>
    </form>
  );
}
