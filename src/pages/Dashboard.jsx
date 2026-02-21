// 

import { useEffect, useState } from "react";
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



    const fetchEvents = async () => {

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

    };



    useEffect(() => {

        fetchEvents();

    }, [debouncedSearch, status, city, fromDate, toDate, page, user]);



    const importEvent = async (id) => {

        try {

            setImportingId(id);

            await API.post(`/events/import/${id}`);

            fetchEvents();

        }

        finally {

            setImportingId(null);

        }

    };



    return (

        <div className="p-10 max-w-7xl mx-auto">

            <h1 className="text-3xl font-bold mb-6">
                Events Dashboard
            </h1>



            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">

                <input
                    placeholder="Search events..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                    }}
                    className="border p-2 rounded"
                />

                <select
                    value={status}
                    onChange={(e) => {
                        setStatus(e.target.value);
                        setPage(1);
                    }}
                    className="border p-2 rounded"
                >
                    <option value="">All Status</option>
                    <option value="new">New</option>
                    <option value="imported">Imported</option>
                </select>

                <input
                    placeholder="City"
                    value={city}
                    onChange={(e) => {
                        setCity(e.target.value);
                        setPage(1);
                    }}
                    className="border p-2 rounded"
                />

                <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => {
                        setFromDate(e.target.value);
                        setPage(1);
                    }}
                    className="border p-2 rounded"
                />

                <input
                    type="date"
                    value={toDate}
                    onChange={(e) => {
                        setToDate(e.target.value);
                        setPage(1);
                    }}
                    className="border p-2 rounded"
                />

            </div>



            {/* Info */}
            <div className="mb-4 text-gray-600">
                Showing page {page} of {pages} ({total} events)
            </div>



            {/* Table */}
            {loading ? (

                <div className="text-center p-10">
                    Loading events...
                </div>

            ) : (

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

                            <tr key={event._id}>

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
                                            Import
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

            )}



            {/* Pagination */}
            <div className="flex justify-center gap-4 mt-6">

                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="bg-gray-300 px-4 py-2 rounded"
                >
                    Prev
                </button>

                <span>
                    {page} / {pages}
                </span>

                <button
                    disabled={page === pages}
                    onClick={() => setPage(page + 1)}
                    className="bg-gray-300 px-4 py-2 rounded"
                >
                    Next
                </button>

            </div>

        </div>

    );

}