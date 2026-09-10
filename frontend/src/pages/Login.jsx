
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    whatsapp_number: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    try {
      const response = await api.post("/auth/login", form);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      if (response.data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user)
        );
      }

      setMessage(response.data.message || "Login successful");

      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (error) {
      console.error("Login error:", error);

      setMessage(
        error.response?.data?.message ||
        "Login failed"
      );
    }
  };

  return (
    <div className="app">
      <main className="container">
        <h2>Resident Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="whatsapp_number"
            type="tel"
            placeholder="WhatsApp number"
            value={form.whatsapp_number}
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Login
          </button>
        </form>

        <p>{message}</p>

        <p>
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </p>
      </main>
    </div>
  );
}

export default Login;

