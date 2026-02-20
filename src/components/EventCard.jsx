import { useState } from "react";
import EmailModal from "./EmailModal";

function EventCard({ event }) {

  const [showModal, setShowModal] = useState(false);

  return (

    <div className="bg-white shadow-md rounded-lg p-4">

      <img
        src={event.imageUrl || "https://via.placeholder.com/400"}
        className="w-full h-48 object-cover rounded"
      />

      <h2 className="text-xl font-bold mt-2">
        {event.title}
      </h2>

      <p className="text-gray-600">
        {new Date(event.dateTime).toLocaleString()}
      </p>

      <p className="text-gray-600">
        {event.venueName}
      </p>

      <p className="text-sm mt-2">
        {event.description}
      </p>

      <button
        onClick={() => setShowModal(true)}
        className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        GET TICKETS
      </button>

      {showModal && (
        <EmailModal
          eventId={event._id}
          onClose={() => setShowModal(false)}
        />
      )}

    </div>

  );

}

export default EventCard;