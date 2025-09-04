import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
    if (error) alert(error.message);
    else navigate("/");
  };

  return (
    <form onSubmit={handleLogin} className="p-6">
      <h2 className="text-xl">Login</h2>
      <input className="border p-2 block my-2" type="email" placeholder="Email"
        value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="border p-2 block my-2" type="password" placeholder="Senha"
        value={senha} onChange={(e) => setSenha(e.target.value)} />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">Entrar</button>
    </form>
  );
}
