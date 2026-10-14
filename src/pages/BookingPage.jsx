import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/booking.css";

function BookingPage({ addAppointment, appointments }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const today = new Date();
  const formattedToday = today.toLocaleDateString("tr-TR");
  const currentHour = today.getHours();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const nextDay = new Date(tomorrow);
  nextDay.setDate(tomorrow.getDate() + 1);
  const dates = [today, tomorrow, nextDay];
  const hours = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
  ];

  function handleSubmit(e) {
    e.preventDefault();
    const isUnavailable = appointments.some(
      (appointment) =>
        appointment.date === formData.date &&
        appointment.time === formData.time,
    );
    const isPast =
      formData.date === new Date().toLocaleDateString("tr-TR") &&
      Number(formData.time.split(":")[0]) <= new Date().getHours();
    if (
      !formData.name.trim() ||
      !formData.phone.trim() ||
      !formData.date ||
      !formData.time ||
      isUnavailable ||
      isPast
    ) {
      setError("Bilgilerinizi doldurun ve uygun bir saat seçin.");
      return;
    }
    addAppointment({
      ...formData,
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      id: Date.now(),
      status: "pending",
      amount: null,
    });
    setSuccess(true);
    setError("");
    setFormData({ name: "", phone: "", date: "", time: "" });
  }

  return (
    <div className="app-shell booking-shell">
      <header className="topbar">
        <Link className="brand" to="/">
          demo studio<span>.</span>
        </Link>
        <span className="topbar-note">Randevunuzu kolayca planlayın</span>
      </header>
      <main className="booking-main">
        <div className="page-heading">
          <p className="eyebrow">SİZE AYRILAN ZAMAN</p>
          <h1>Bir sonraki randevunuz.</h1>
          <p className="muted">
            Bilgilerinizi girin, gününüzü ve size uygun saati seçin.
          </p>
        </div>
        {success && (
          <div className="success-message" role="status">
            ✓ Randevunuz oluşturuldu. Görüşmek üzere!
          </div>
        )}
        <form className="booking-card" onSubmit={handleSubmit}>
          <section className="booking-section">
            <h2>
              <span className="step-number">01</span> İletişim bilgileriniz
            </h2>
            <div className="field-grid">
              <div className="field">
                <label htmlFor="name">Ad soyad</label>
                <input
                  id="name"
                  autoComplete="name"
                  placeholder="Adınız ve soyadınız"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="field">
                <label htmlFor="booking-phone">Telefon numarası</label>
                <input
                  id="booking-phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="05XX XXX XX XX"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
            </div>
          </section>
          <section className="booking-section">
            <h2>
              <span className="step-number">02</span> Gün seçin
            </h2>
            <div className="date-grid">
              {dates.map((date, index) => {
                const formattedDate = date.toLocaleDateString("tr-TR");
                return (
                  <button
                    key={formattedDate}
                    type="button"
                    aria-pressed={formData.date === formattedDate}
                    className={`date-button ${formData.date === formattedDate ? "selected" : ""}`}
                    onClick={() => {
                      setFormData({
                        ...formData,
                        date: formattedDate,
                        time: "",
                      });
                      setSuccess(false);
                    }}
                  >
                    <span>
                      {index === 0
                        ? "Bugün"
                        : index === 1
                          ? "Yarın"
                          : date.toLocaleDateString("tr-TR", {
                              weekday: "long",
                            })}
                    </span>
                    <strong>
                      {date.toLocaleDateString("tr-TR", {
                        day: "numeric",
                        month: "long",
                      })}
                    </strong>
                  </button>
                );
              })}
            </div>
          </section>
          <section className="booking-section">
            <h2>
              <span className="step-number">03</span> Saat seçin
            </h2>
            {formData.date ? (
              <>
                <div className="hours-grid">
                  {hours.map((hour) => {
                    const isPast =
                      formData.date === formattedToday &&
                      Number(hour.split(":")[0]) <= currentHour;
                    const isBooked = appointments.some(
                      (appointment) =>
                        appointment.date === formData.date &&
                        appointment.time === hour,
                    );
                    return (
                      <button
                        key={hour}
                        type="button"
                        disabled={isPast || isBooked}
                        title={
                          isBooked
                            ? "Bu saat dolu"
                            : isPast
                              ? "Bu saat geçti"
                              : "Uygun saat"
                        }
                        aria-pressed={formData.time === hour}
                        className={`hour-button ${formData.time === hour ? "selected" : ""}`}
                        onClick={() => setFormData({ ...formData, time: hour })}
                      >
                        {hour}
                      </button>
                    );
                  })}
                </div>
                <p className="field-note">
                  Soluk görünen saatler dolu veya geçmiş saatlerdir.
                </p>
              </>
            ) : (
              <p className="selection-placeholder">
                Uygun saatleri görmek için önce bir gün seçin.
              </p>
            )}
          </section>
          <div className="booking-submit">
            <div>
              <span className="eyebrow">SEÇİMİNİZ</span>
              <p>
                {formData.date && formData.time
                  ? `${formData.date} · ${formData.time}`
                  : "Gün ve saat seçimi bekleniyor"}
              </p>
            </div>
            <button
              className="primary-button"
              disabled={!formData.date || !formData.time}
              type="submit"
            >
              Randevu oluştur <span aria-hidden="true">↗</span>
            </button>
          </div>
          {error && (
            <p className="error-message" role="alert">
              {error}
            </p>
          )}
        </form>
      </main>
      <footer className="page-footer">
        demo studio · Size zaman ayırıyoruz.
      </footer>
    </div>
  );
}
export default BookingPage;
