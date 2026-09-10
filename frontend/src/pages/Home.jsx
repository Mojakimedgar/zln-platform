import { Link } from "react-router-dom";
import "../index.css";

function Home() {
  const handlePanic = () => {
    const guardNumber = "27820000000";

    const message =
      "EMERGENCY ALERT: I need assistance at my residence.";

    window.open(
      `https://wa.me/${guardNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div className="app">
      <header className="topbar">
        <h1>ZLN</h1>
        <span>Safety</span>
      </header>

      <main className="container">
        <div className="status">
          🟢 ZONE STATUS: SECURE
        </div>

        <h2>Welcome to ZLN</h2>
        <p>Community safety and local services.</p>

        <button className="panic-button" onClick={handlePanic}>
          PANIC
        </button>

        <div className="quick-actions">
          <Link to="/visitor-qr">Visitor QR</Link>
          <Link to="/community">Hey Neighbours</Link>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </div>
      </main>
    </div>
  );
}

export default Home;