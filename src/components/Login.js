import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Login no Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({ email, password: senha });
    if (error) {
      alert(error.message);
      return;
    }

    const userId = data.user.id;

    // Buscar role do usuário na tabela "users"
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("role")
      .eq("id", userId)
      .single();

    if (userError || !userData) {
      alert("Erro ao buscar usuário no banco.");
      return;
    }

    // Redirecionar baseado no role
    if (userData.role === "organizer") {
      navigate("/dashboard");
    } else {
      navigate("/events");
    }
  };

  return (
    <form onSubmit={handleLogin} className="p-6">
      <h2 className="text-xl">Login</h2>
      <input
        className="border p-2 block my-2"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border p-2 block my-2"
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Entrar
      </button>
    </form>
  );
}
