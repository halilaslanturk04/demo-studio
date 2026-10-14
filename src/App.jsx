import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import BookingPage from "./pages/BookingPage";
import DashboardPage from "./pages/DashboardPage";
import { useState, useEffect } from "react";

function App() {
  const [appointments, setAppointments] = useState(() => {
    const savedAppointments = localStorage.getItem("appointments");

    return savedAppointments ? JSON.parse(savedAppointments) : [];
  });
  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  function addAppointment(newAppointment) {
    setAppointments([...appointments, newAppointment]);
  }

  function completeAppointment(id, amount) {
    setAppointments(
      appointments.map((appointment) =>
        appointment.id === id
          ? {
              ...appointment,
              status: "completed",
              amount: Number(amount),
            }
          : appointment,
      ),
    );
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/booking"
            element={
              <BookingPage
                addAppointment={addAppointment}
                appointments={appointments}
              />
            }
          />
          <Route
            path="/dashboard"
            element={
              <DashboardPage
                appointments={appointments}
                completeAppointment={completeAppointment}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
