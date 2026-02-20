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

      <Routes>

        <Route path="/" element={<Login />} />

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

    </BrowserRouter>

  );

}

export default App;