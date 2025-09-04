import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import supabase from "../supabaseClient";

export default function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const session = supabase.auth.getSession();
    session.then(({ data }) => setUser(data?.session?.user || null));

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
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
          <button onClick={handleLogout}>Logout</button>
        )}
      </nav>
    </header>
  );
}
