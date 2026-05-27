import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import HeroBanner from "./components/layout/HeroBanner";
import BookingForm from "./components/booking/BookingForm";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import RequireAuth from "./auth/RequireAuth";

function HomePage() {
  return (
    <>
      <HeroBanner />
      <main className="max-w-2xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Casey Jones Railway Co.
        </h1>
        <BookingForm />
      </main>
    </>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <ProfilePage />
            </RequireAuth>
          }
        />
      </Routes>
    </>
  );
}
