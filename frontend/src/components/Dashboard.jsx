function Dashboard({ connected }) {
  return (
    <>
      <h1>Real-Time Product Dashboard</h1>

      <div className={connected ? "online" : "offline"}>
        {connected
          ? "🟢 Connected to Socket.IO"
          : "🔴 Disconnected"}
      </div>
    </>
  );
}

export default Dashboard;