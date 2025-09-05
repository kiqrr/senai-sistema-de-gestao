import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import supabase from "../supabaseClient";
import "./Header.css"; // Importando o CSS externo

export default function Header() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadUser() {
      const { data: sessionData } = await supabase.auth.getSession();
      const authUser = sessionData?.session?.user || null;
      setUser(authUser);

      if (authUser) {
        const { data: userData } = await supabase
          .from("users")
          .select("role")
          .eq("id", authUser.id)
          .single();
        setRole(userData?.role || null);
      }
    }

    loadUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      if (session?.user) {
        supabase
          .from("users")
          .select("role")
          .eq("id", session.user.id)
          .single()
          .then(({ data }) => setRole(data?.role || null));
      } else {
        setRole(null);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setRole(null);
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="logo">
          EventFlow
        </Link>

        {/* Nav */}
        <nav className="nav">
          {!user ? (
            <>
              <Link to="/login" className="btn btn-login">
                Login
              </Link>
              <Link to="/signup" className="btn btn-signup">
                Sign Up
              </Link>
            </>
          ) : (
            <>
              {role === "organizer" && (
                <Link to="/dashboard" className="nav-link">
                  Dashboard
                </Link>
              )}
              {role === "participant" && (
                <Link to="/events" className="nav-link">
                  Eventos
                </Link>
              )}
              <button onClick={handleLogout} className="btn btn-logout">
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
