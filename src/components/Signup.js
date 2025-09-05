import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import supabase from "../supabaseClient";
import "./Auth.css";

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

    if (role === "organizer") {
      navigate("/dashboard");
    } else {
      navigate("/events");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSignup} className="auth-form">
        <button type="button" className="back-button" onClick={() => navigate(-1)}>
          ⬅ Voltar
        </button>
        <h2 className="auth-title">Cadastro</h2>
        <input
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="auth-input"
        />
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
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="auth-select"
        >
          <option value="participant">Participante</option>
          <option value="organizer">Organizador</option>
        </select>
        <button type="submit" className="auth-button signup-button">
          Cadastrar
        </button>
        <p className="auth-link-text">
          Já tem conta? <Link to="/login" className="auth-link">Entrar</Link>
        </p>
      </form>
    </div>
  );
}
