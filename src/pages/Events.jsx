import { useEffect, useState } from "react";
import API from "../api/axios";
import EventCard from "../components/EventCard";

function Events() {

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    // pagination state
    const [pagination, setPagination] = useState({
        page: 1,
        pages: 1,
        total: 0,
        limit: 9
    });



    useEffect(() => {

        fetchEvents(1);

    }, []);



    const fetchEvents = async (page = 1) => {

        try {

            setLoading(true);

            const res = await API.get(
                `/events?page=${page}&limit=${pagination.limit}`
            );

            setEvents(res.data.data);

            setPagination(res.data.pagination);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };



    const changePage = (newPage) => {

        if (newPage < 1 || newPage > pagination.pages)
            return;

        fetchEvents(newPage);

    };



    if (loading) {

        return (
            <div className="text-center mt-10">
                Loading events...
            </div>
        );

    }



    return (

        <div className="p-10">

            <h1 className="text-3xl font-bold mb-2">
                Sydney Events
            </h1>

            <div className="text-gray-600 mb-6">
                Showing page {pagination.page} of {pagination.pages}
                ({pagination.total} total events)
            </div>



            {/* Event Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                {events.map(event => (

                    <EventCard
                        key={event._id}
                        event={event}
                    />

                ))}

            </div>



            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-8">

                <button
                    onClick={() => changePage(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                >
                    Previous
                </button>



                {[...Array(pagination.pages)].map((_, index) => {

                    const pageNum = index + 1;

                    return (

                        <button
                            key={pageNum}
                            onClick={() => changePage(pageNum)}
                            className={`px-4 py-2 rounded ${pagination.page === pageNum
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200"
                                }`}
                        >
                            {pageNum}
                        </button>

                    );

                })}



                <button
                    onClick={() => changePage(pagination.page + 1)}
                    disabled={pagination.page === pagination.pages}
                    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                >
                    Next
                </button>

            </div>



        </div>

    );

}

export default Events;