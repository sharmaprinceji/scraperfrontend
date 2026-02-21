import { useEffect, useState, useCallback } from "react";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import useDebounce from "../hooks/useDebounce";

export default function Dashboard() {

    const { user } = useAuth();

    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 500);
    const [status, setStatus] = useState("");
    const [city, setCity] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [total, setTotal] = useState(0);

    const [loading, setLoading] = useState(false);
    const [importingId, setImportingId] = useState(null);


    const fetchEvents = useCallback(async () => {

        if (!user) return;

        setLoading(true);

        try {

            const res = await API.get("/events", {
                params: {
                    keyword: debouncedSearch,
                    status,
                    city,
                    startDate: fromDate,
                    endDate: toDate,
                    page,
                    limit: 10
                }
            });

            setEvents(res.data.data);
            setPages(res.data.pagination.pages);
            setTotal(res.data.pagination.total);

        }

        catch (err) {

            console.error(err);

        }

        finally {

            setLoading(false);

        }

    }, [debouncedSearch, status, city, fromDate, toDate, page, user]);


    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);


    const importEvent = async (id) => {
        try {
            setImportingId(id);
            await API.post(`/events/import/${id}`);
            fetchEvents();

        }

        catch (err) {
            console.error(err);
        }

        finally {
            setImportingId(null);
        }

    };


    const resetFilters = () => {

        setSearch("");
        setStatus("");
        setCity("");
        setFromDate("");
        setToDate("");
        setPage(1);

    };



    return (

        <div className="p-10 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">

                <h1 className="text-3xl font-bold">
                    Events Dashboard
                </h1>

                <button
                    onClick={resetFilters}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                    Reset Filters
                </button>

            </div>


            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                <div className="flex flex-col">
                    <label className="text-sm text-gray-600 mb-1">
                        Search
                    </label>
                    <input
                        placeholder="Search events..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm text-gray-600 mb-1">
                        Status
                    </label>
                    <select
                        value={status}
                        onChange={(e) => {
                            setStatus(e.target.value);
                            setPage(1);
                        }}
                        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">All Status</option>
                        <option value="new">New</option>
                        <option value="imported">Imported</option>
                    </select>
                </div>

                <div className="flex flex-col">
                    <label className="text-sm text-gray-600 mb-1">
                        From Date
                    </label>
                    <input
                        type="date"
                        value={fromDate}
                        onChange={(e) => {
                            setFromDate(e.target.value);
                            setPage(1);
                        }}
                        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>


                <div className="flex flex-col">
                    <label className="text-sm text-gray-600 mb-1">
                        To Date
                    </label>
                    <input
                        type="date"
                        value={toDate}
                        onChange={(e) => {
                            setToDate(e.target.value);
                            setPage(1);
                        }}
                        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

            </div>

            <div className="mb-4 text-gray-600">

                Showing page <strong>{page}</strong> of <strong>{pages}</strong>
                ({total} events)

            </div>


            {loading ? (

                <div className="text-center p-10">
                    Loading events...
                </div>

            ) : (

                <table className="w-full border rounded">

                    <thead>

                        <tr className="bg-gray-200">

                            <th className="p-3 text-left">Title</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>City</th>
                            <th>Venue</th>
                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {events.map(event => (

                            <tr key={event._id} className="border-t">

                                <td className="p-3">
                                    {event.title}
                                </td>

                                <td className="capitalize">
                                    {event.status}
                                </td>

                                <td>
                                    {new Date(event.dateTime).toLocaleDateString()}
                                </td>

                                <td>
                                    {event.city}
                                </td>

                                <td>
                                    {event.venueName}
                                </td>

                                <td>

                                    {event.status !== "imported" ? (

                                        <button
                                            onClick={() => importEvent(event._id)}
                                            disabled={importingId === event._id}
                                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                                        >
                                            {importingId === event._id
                                                ? "Importing..."
                                                : "Import"}
                                        </button>

                                    ) : (

                                        <span className="text-green-600 font-medium">
                                            Imported
                                        </span>

                                    )}

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            )}


            <div className="flex justify-center items-center gap-4 mt-6">

                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 disabled:opacity-50"
                >
                    Prev
                </button>

                <span className="font-medium">
                    {page} / {pages}
                </span>

                <button
                    disabled={page === pages}
                    onClick={() => setPage(page + 1)}
                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 disabled:opacity-50"
                >
                    Next
                </button>

            </div>

        </div>

    );

}