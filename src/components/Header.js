import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import supabase from "../supabaseClient";

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
    <header className="p-4 bg-gray-200 flex justify-between">
      <Link to="/">EventFlow</Link>
      <nav>
        {!user ? (
          <>
            <Link to="/login" className="mr-4">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        ) : (
          <>
            {role === "organizer" && (
              <Link to="/dashboard" className="mr-4">Dashboard</Link>
            )}
            {role === "participant" && (
              <Link to="/events" className="mr-4">Eventos</Link>
            )}
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </nav>
    </header>
  );
}
