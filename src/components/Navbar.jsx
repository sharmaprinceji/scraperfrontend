import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {

    const { user, login, logout } = useAuth();

    return (

        <nav
            className="
        fixed top-0 left-0 w-full
        bg-gray-900 text-white
        px-6 py-4
        flex justify-between items-center
        shadow-md
        z-50
      "
        >

            <Link
                to="/events"
                className="font-bold text-lg hover:text-blue-400 transition"
            >
                Event Platform
            </Link>

            <div className="flex items-center gap-4">

                <Link
                    to="/dashboard"
                    className="hover:text-blue-400 transition"
                >
                    Events
                </Link>

                {user ? (
                    <button
                        onClick={logout}
                        className="bg-red-500 px-4 py-1 rounded hover:bg-red-600 transition"
                    >
                        Logout
                    </button>
                ) : (
                    <button
                        onClick={login}
                        className="bg-blue-500 px-4 py-1 rounded hover:bg-blue-600 transition"
                    >
                        Login
                    </button>
                )}

            </div>

        </nav>

    );

}

export default Navbar;