import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function Login() {

    const { login, user, loading } = useAuth();

    if (loading) return null;

    if (user) {
        return <Navigate to="/dashboard" />;
    }

    return (

        <div className="flex justify-center items-center h-screen bg-gray-100">

            <div className="bg-white shadow-lg p-8 rounded-lg text-center">

                <h2 className="text-2xl font-bold mb-4">
                    Admin Login
                </h2>

                <button
                    onClick={login}
                    className="bg-blue-500 text-white px-6 py-3 rounded"
                >
                    Login with Google
                </button>

            </div>

        </div>

    );

}

export default Login;