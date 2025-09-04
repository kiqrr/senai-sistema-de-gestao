import Header from "./Header";

export default function Home() {
  return (
    <div>
      <Header />
      <main className="p-6">
        <h1 className="text-2xl">Bem-vindo ao EventFlow 🎉</h1>
        <p>Gerencie e participe de eventos facilmente.</p>
      </main>
    </div>
  );
}
