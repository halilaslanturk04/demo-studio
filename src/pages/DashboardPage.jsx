import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/dashboard.css";

function DashboardPage({ appointments, completeAppointment }) {
  const [completingId, setCompletingId] = useState(null);
  const [amount, setAmount] = useState("");
  const totalIncome = appointments
    .filter((appointment) => appointment.status === "completed")
    .reduce((total, appointment) => total + Number(appointment.amount || 0), 0);
  const totalAppointments = appointments.length;
  const completedAppointments = appointments.filter(
    (appointment) => appointment.status === "completed",
  ).length;
  const today = new Date().toLocaleDateString("tr-TR");
  const todayAppointments = appointments.filter(
    (appointment) => appointment.date === today,
  );
  const todayCompleted = todayAppointments.filter(
    (appointment) => appointment.status === "completed",
  ).length;
  const todayIncome = todayAppointments
    .filter((appointment) => appointment.status === "completed")
    .reduce((total, appointment) => total + Number(appointment.amount || 0), 0);
  const completionPercent = totalAppointments
    ? Math.round((completedAppointments / totalAppointments) * 100)
    : 0;
  const currency = (value) =>
    new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      maximumFractionDigits: 2,
    }).format(value);

  return (
    <div className="app-shell">
      <header className="topbar">
        <Link className="brand" to="/dashboard">
          demo studio<span>.</span>
        </Link>
        <nav aria-label="Ana menü">
          <Link className="nav-active" to="/dashboard">
            Genel bakış
          </Link>
          <Link to="/booking">
            Randevu oluştur <span aria-hidden="true">↗</span>
          </Link>
          <Link to="/">Çıkış</Link>
        </nav>
      </header>
      <main className="dashboard-main">
        <div className="dashboard-heading">
          <div>
            <p className="eyebrow">STÜDYONUZ, BİR BAKIŞTA</p>
            <h1>Gününüz kontrol altında.</h1>
            <p className="muted">
              Randevularınızı takip edin, emeğinizin karşılığını görün.
            </p>
          </div>
          <span className="date-label">
            {new Date().toLocaleDateString("tr-TR", {
              day: "numeric",
              month: "long",
              weekday: "long",
            })}
          </span>
        </div>
        <section className="stats-grid" aria-label="Stüdyo özeti">
          <article className="stat-card income-card">
            <span className="stat-label">Toplam gelir</span>
            <strong className="stat-value">{currency(totalIncome)}</strong>
            <span className="stat-caption">
              Tamamlanan {completedAppointments} randevudan
            </span>
            <div className="income-divider" />
            <div className="income-today">
              <span>Bugünün geliri</span>
              <strong>{currency(todayIncome)}</strong>
            </div>
          </article>
          <article className="stat-card">
            <span className="stat-label">Bugünkü randevular</span>
            <strong className="stat-value">
              {todayCompleted}
              <span className="stat-denominator">
                {" "}
                / {todayAppointments.length}
              </span>
            </strong>
            <span className="stat-caption">randevu tamamlandı</span>
            <progress
              value={todayCompleted}
              max={todayAppointments.length || 1}
              aria-label="Bugünkü tamamlanma durumu"
            />
            <span className="stat-caption">
              {todayAppointments.length - todayCompleted} randevu bekliyor
            </span>
          </article>
          <article className="stat-card completion-card">
            <div>
              <span className="stat-label">Genel tamamlanma</span>
              <strong className="stat-value">
                {completedAppointments}
                <span className="stat-denominator"> / {totalAppointments}</span>
              </strong>
              <span className="stat-caption">toplam randevu</span>
            </div>
            <svg
              className="completion-ring"
              viewBox="0 0 120 120"
              role="img"
              aria-label={`Randevuların yüzde ${completionPercent} kadarı tamamlandı`}
            >
              <circle className="ring-track" cx="60" cy="60" r="48" />
              <circle
                className="ring-value"
                cx="60"
                cy="60"
                r="48"
                pathLength="100"
                strokeDasharray={`${completionPercent} 100`}
              />
              <text x="60" y="65" textAnchor="middle">
                %{completionPercent}
              </text>
            </svg>
            <div className="chart-legend">
              <span>
                <i className="legend-completed" />
                Tamamlanan
              </span>
              <span>
                <i className="legend-pending" />
                Bekleyen
              </span>
            </div>
          </article>
        </section>
        <section className="today-strip">
          <div>
            <span className="eyebrow">BUGÜNÜN AKIŞI</span>
            <h2>Bugünkü randevular</h2>
          </div>
          <div className="today-items">
            {todayAppointments.length ? (
              todayAppointments
                .slice()
                .sort((a, b) => a.time.localeCompare(b.time))
                .map((appointment) => (
                  <div className="today-item" key={appointment.id}>
                    <strong>{appointment.time}</strong>
                    <span>{appointment.name}</span>
                    <span
                      className={`small-status ${appointment.status === "completed" ? "done" : ""}`}
                    >
                      {appointment.status === "completed"
                        ? "Tamamlandı"
                        : "Bekliyor"}
                    </span>
                  </div>
                ))
            ) : (
              <p className="muted">Bugün için henüz randevu yok.</p>
            )}
          </div>
        </section>
        <section className="appointments-section">
          <div className="section-heading">
            <div>
              <h2>Tüm randevular</h2>
              <p className="muted">Her randevu, her detay, tek bir yerde.</p>
            </div>
            <span className="count-badge">{totalAppointments} randevu</span>
          </div>
          {appointments.length ? (
            <ul className="appointment-list">
              {appointments.map((appointment) => (
                <li className="appointment-row" key={appointment.id}>
                  <div className="appointment-time">
                    <strong>{appointment.time}</strong>
                    <span>{appointment.date}</span>
                  </div>
                  <div className="appointment-person">
                    <strong>{appointment.name}</strong>
                    <a href={`tel:${appointment.phone}`}>{appointment.phone}</a>
                  </div>
                  <div className="appointment-action">
                    {appointment.status === "pending" ? (
                      <>
                        <span className="status-badge">Bekliyor</span>
                        <button
                          className="secondary-button"
                          type="button"
                          onClick={() => {
                            setCompletingId(appointment.id);
                            setAmount("");
                          }}
                        >
                          Tamamla <span aria-hidden="true">↗</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <span className="status-badge completed">
                          ✓ Tamamlandı
                        </span>
                        <strong className="appointment-amount">
                          {currency(appointment.amount)}
                        </strong>
                      </>
                    )}
                  </div>
                  {completingId === appointment.id &&
                    appointment.status === "pending" && (
                      <form
                        className="completion-form"
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (
                            amount.trim() === "" ||
                            !Number.isFinite(Number(amount)) ||
                            Number(amount) < 0
                          )
                            return;
                          completeAppointment(appointment.id, amount);
                          setCompletingId(null);
                          setAmount("");
                        }}
                      >
                        <div className="field">
                          <label htmlFor={`amount-${appointment.id}`}>
                            Alınan ücret (TL)
                          </label>
                          <input
                            id={`amount-${appointment.id}`}
                            type="number"
                            min="0"
                            step="0.01"
                            required
                            autoFocus
                            placeholder="Örn. 500"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                          />
                        </div>
                        <button className="primary-button" type="submit">
                          Kaydet ve tamamla
                        </button>
                        <button
                          className="text-button"
                          type="button"
                          onClick={() => {
                            setCompletingId(null);
                            setAmount("");
                          }}
                        >
                          Vazgeç
                        </button>
                      </form>
                    )}
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-state">
              <span className="empty-symbol" aria-hidden="true">
                ＋
              </span>
              <h3>Yeni bir güne, temiz bir başlangıç.</h3>
              <p className="muted">
                İlk randevunuz oluşturulduğunda burada görünecek.
              </p>
              <Link className="secondary-button" to="/booking">
                İlk randevuyu oluştur ↗
              </Link>
            </div>
          )}
        </section>
      </main>
      <footer className="page-footer">
        demo studio · Her detay yerli yerinde.
      </footer>
    </div>
  );
}
export default DashboardPage;
