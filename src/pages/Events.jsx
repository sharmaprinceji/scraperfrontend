import { useEffect, useState } from "react";
import API from "../api/axios";
import EventCard from "../components/EventCard";
import { motion, AnimatePresence } from "framer-motion";

function Events() {

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

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

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };



    const changePage = (newPage) => {

        if (newPage < 1 || newPage > pagination.pages)
            return;

        fetchEvents(newPage);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };



    // Animation variants
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08
            }
        }
    };



    const card = {
        hidden: {
            opacity: 0,
            y: 40,
            scale: 0.95
        },
        show: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        }
    };



    if (loading) {

        return (

            <div className="flex justify-center items-center h-screen">

                <motion.div
                    animate={{
                        rotate: 360
                    }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
                />

            </div>

        );

    }



    return (

        <motion.div
            className="p-10 max-w-7xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >

            {/* Header */}
            <motion.h1
                className="text-4xl font-bold mb-2"
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
            >
                Sydney Events
            </motion.h1>



            <motion.div
                className="text-gray-600 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                Showing page {pagination.page} of {pagination.pages}
                ({pagination.total} events)
            </motion.div>



            {/* Event Grid */}
            <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
                variants={container}
                initial="hidden"
                animate="show"
            >

                <AnimatePresence>

                    {events.map(event => (

                        <motion.div
                            key={event._id}
                            variants={card}
                            whileHover={{
                                y: -8,
                                scale: 1.02
                            }}
                            whileTap={{
                                scale: 0.97
                            }}
                            layout
                        >

                            <EventCard event={event} />

                        </motion.div>

                    ))}

                </AnimatePresence>

            </motion.div>



            {/* Pagination */}
            <motion.div
                className="flex justify-center items-center gap-3 mt-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >

                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => changePage(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    className="px-5 py-2 bg-gray-300 rounded-lg disabled:opacity-40"
                >
                    Prev
                </motion.button>



                {[...Array(pagination.pages)].map((_, index) => {

                    const pageNum = index + 1;

                    return (

                        <motion.button
                            key={pageNum}
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => changePage(pageNum)}
                            className={`px-5 py-2 rounded-lg font-medium ${pagination.page === pageNum
                                    ? "bg-blue-500 text-white shadow-lg"
                                    : "bg-gray-200"
                                }`}
                        >
                            {pageNum}
                        </motion.button>

                    );

                })}



                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => changePage(pagination.page + 1)}
                    disabled={pagination.page === pagination.pages}
                    className="px-5 py-2 bg-gray-300 rounded-lg disabled:opacity-40"
                >
                    Next
                </motion.button>

            </motion.div>

        </motion.div>

    );

}

export default Events;