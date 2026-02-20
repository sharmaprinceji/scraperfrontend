import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {

    const { user, login, logout, loading } = useAuth();

    if (loading) return null;

    return (

        <div className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center">

            <Link to="/events" className="font-bold text-lg">
                Event Platform
            </Link>

            <div className="flex gap-3">

                <Link to="/events">
                    <button className="bg-gray-700 px-4 py-1 rounded">
                        Events
                    </button>
                </Link>

                {/* {user && (

                    <Link to="/dashboard">
                        <button className="bg-green-600 px-4 py-1 rounded">
                            Dashboard
                        </button>
                    </Link>

                )} */}

                {user ? (

                    <button
                        onClick={logout}
                        className="bg-red-500 px-4 py-1 rounded"
                    >
                        Logout
                    </button>

                ) : (

                    <button
                        onClick={login}
                        className="bg-blue-500 px-4 py-1 rounded"
                    >
                        Login
                    </button>

                )}

            </div>

        </div>

    );

}

export default Navbar;