import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import supabase from "../supabaseClient";
import "./Auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({ email, password: senha });
    if (error) {
      alert(error.message);
      return;
    }

    const userId = data.user.id;
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("role")
      .eq("id", userId)
      .single();

    if (userError || !userData) {
      alert("Erro ao buscar usuário no banco.");
      return;
    }

    if (userData.role === "organizer") {
      navigate("/dashboard");
    } else {
      navigate("/events");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleLogin} className="auth-form">
        <button type="button" className="back-button" onClick={() => navigate(-1)}>
          ⬅ Voltar
        </button>
        <h2 className="auth-title">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="auth-input"
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="auth-input"
        />
        <button type="submit" className="auth-button login-button">
          Entrar
        </button>
        <p className="auth-link-text">
          Não tem conta? <Link to="/signup" className="auth-link">Cadastre-se</Link>
        </p>
      </form>
    </div>
  );
}
