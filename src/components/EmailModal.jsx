import { useState } from "react";
import API from "../api/axios";

function EmailModal({ eventId, onClose }) {

  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {

    if (!email || !consent) {
      alert("Please enter email and consent");
      return;
    }

    try {

      setLoading(true);

      const res = await API.post("/email-optin", {
        email,
        consent,
        eventId
      });

      window.location.href = res.data.redirectUrl;

    } catch (error) {

      alert(error.response?.data?.message || "Error");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">

      <div className="bg-white p-6 rounded">

        <h2 className="text-xl font-bold mb-3">
          Enter Email
        </h2>

        <input
          type="email"
          placeholder="Enter email"
          className="border p-2 w-full mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="flex items-center mb-3">

          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mr-2"
          />

          I agree to receive updates

        </label>

        <div className="flex gap-2">

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {loading ? "Processing..." : "Continue"}
          </button>

          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>

        </div>

      </div>

    </div>

  );

}

export default EmailModal;