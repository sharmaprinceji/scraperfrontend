import { useEffect, useState } from "react";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

function Dashboard() {

  const { user } = useAuth();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // filters state
  const [filters, setFilters] = useState({
    keyword: "",
    status: "",
    city: "",
    startDate: "",
    endDate: ""
  });

  const [importingId, setImportingId] = useState(null);

  useEffect(() => {

    if (user) {
      fetchEvents();
    }

  }, [user, filters]);

  const fetchEvents = async () => {

    try {

      setLoading(true);

      const query = new URLSearchParams(filters).toString();

      const res = await API.get(`/events?${query}`);

      setEvents(res.data.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  const importEvent = async (id) => {

    try {

      setImportingId(id);

      await API.post(`/events/import/${id}`, {
        notes: "Imported from dashboard"
      });

      fetchEvents();

    } catch {

      alert("Import failed");

    } finally {

      setImportingId(null);

    }

  };

  const handleChange = (e) => {

    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });

  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      {/* Filters */}
      <div className="grid grid-cols-5 gap-4 mb-6">

        <input
          type="text"
          name="keyword"
          placeholder="Search..."
          value={filters.keyword}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <select
          name="status"
          value={filters.status}
          onChange={handleChange}
          className="border p-2 rounded"
        >

          <option value="">All Status</option>
          <option value="new">New</option>
          <option value="updated">Updated</option>
          <option value="inactive">Inactive</option>
          <option value="imported">Imported</option>

        </select>

        <input
          type="text"
          name="city"
          placeholder="City"
          value={filters.city}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleChange}
          className="border p-2 rounded"
        />

      </div>

      {/* Table */}
      <table className="w-full border">

        <thead>

          <tr className="bg-gray-200">

            <th className="p-2">Title</th>
            <th>Status</th>
            <th>Date</th>
            <th>City</th>
            <th>Venue</th>
            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {events.map(event => (

            <tr key={event._id} className="border">

              <td className="p-2">{event.title}</td>

              <td className="p-2 capitalize">
                {event.status}
              </td>

              <td className="p-2">
                {new Date(event.dateTime).toLocaleDateString()}
              </td>

              <td className="p-2">
                {event.city}
              </td>

              <td className="p-2">
                {event.venueName}
              </td>

              <td className="p-2">

                {event.status !== "imported" ? (

                  <button
                    onClick={() => importEvent(event._id)}
                    disabled={importingId === event._id}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    {importingId === event._id
                      ? "Importing..."
                      : "Import"}
                  </button>

                ) : (

                  <span className="text-green-600">
                    Imported
                  </span>

                )}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default Dashboard;