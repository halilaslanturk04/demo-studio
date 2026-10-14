import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

function LoginPage() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const demoPhone = "05338522839";
  const demoPassword = "1234";

  function handleSubmit(e) {
    e.preventDefault();
    if (phone === demoPhone && password === demoPassword) {
      setError("");
      navigate("/dashboard");
    } else {
      setError("Telefon numarası veya şifre hatalı.");
    }
  }

  return (
    <main className="login-page">
      <section className="login-card" aria-labelledby="login-title">
        <a className="brand" href="/">
          demo studio<span>.</span>
        </a>
        <p className="eyebrow">STÜDYO YÖNETİMİ</p>
        <h1 id="login-title">Hoş geldiniz.</h1>
        <p className="muted">Gününüzü yönetmek için giriş yapın.</p>
        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="phone">Telefon numarası</label>
          <input
            id="phone"
            type="tel"
            autoComplete="username"
            placeholder="05XX XXX XX XX"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <label htmlFor="password">Şifre</label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="Şifrenizi girin"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <p className="error-message" role="alert">
              {error}
            </p>
          )}
          <button className="primary-button" type="submit">
            Giriş yap <span aria-hidden="true">↗</span>
          </button>
        </form>
      </section>
    </main>
  );
}
export default LoginPage;
