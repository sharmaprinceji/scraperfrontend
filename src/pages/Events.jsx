import { useEffect, useState } from "react";
import API from "../api/axios";
import EventCard from "../components/EventCard";

function Events() {

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchEvents();

  }, []);

  const fetchEvents = async () => {

    try {

      const res = await API.get("/events");

      setEvents(res.data.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Sydney Events
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {events.map(event => (
          <EventCard key={event._id} event={event} />
        ))}

      </div>

    </div>

  );

}

export default Events;