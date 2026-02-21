import { BrowserRouter, Routes, Route } from "react-router-dom";

import Events from "./pages/Events";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

function App() {

  return (

    <BrowserRouter>

      <Navbar />

      {/* This div prevents content going behind navbar */}
      <div className="pt-20">

        <Routes>

          <Route path="/" element={ <Events />} />
          <Route path="/login" element={<Login />} />

          <Route path="/events" element={<Events />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

        </Routes>

      </div>

    </BrowserRouter>

  );

}

export default App;