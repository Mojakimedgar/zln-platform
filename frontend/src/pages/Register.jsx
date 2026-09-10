import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
    whatsapp_number: "",
    id_number: "",
    street_address: "",
    unit_or_stand: "",
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

    try {
      const response = await api.post("/auth/register", form);

      setMessage(response.data.message);

      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Registration failed"
      );
    }
  };

  return (
    <div className="app">
      <main className="container">
        <h2>Register as Resident</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="full_name"
            placeholder="Full name"
            onChange={handleChange}
            required
          />

          <input
            name="whatsapp_number"
            placeholder="WhatsApp number"
            onChange={handleChange}
            required
          />

          <input
            name="id_number"
            placeholder="ID number"
            onChange={handleChange}
          />

          <input
            name="street_address"
            placeholder="Street address"
            onChange={handleChange}
            required
          />

          <input
            name="unit_or_stand"
            placeholder="Unit / Stand number"
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="Create password"
            onChange={handleChange}
            required
          />

          <button type="submit">
            Activate My Account
          </button>
        </form>

        <p>{message}</p>
      </main>
    </div>
  );
}

export default Register;