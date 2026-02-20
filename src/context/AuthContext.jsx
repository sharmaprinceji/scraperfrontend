// import { createContext, useContext, useEffect, useState } from "react";
// import API from "../api/axios";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {

//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {

//         checkAuth();

//         // listen when user returns from Google login
//         window.addEventListener("focus", checkAuth);

//         return () => {
//             window.removeEventListener("focus", checkAuth);
//         };

//     }, []);

//     const checkAuth = async () => {

//         try {

//             const res = await API.get("/auth/me");

//             setUser(res.data.user);

//         } catch {

//             setUser(null);

//         } finally {

//             setLoading(false);

//         }

//     };

//     const login = () => {

//         const popup = window.open(
//             "http://localhost:5000/api/auth/google",
//             "_blank",
//             "width=500,height=600"
//         );

//         const timer = setInterval(async () => {

//             if (popup.closed) {

//                 clearInterval(timer);

//                 await checkAuth(); // refresh user state

//             }

//         }, 500);

//     };

//     const logout = async () => {

//         try {

//             await API.get("/auth/logout");

//         } catch { }

//         setUser(null);

//         window.location.href = "/";

//     };

//     return (

//         <AuthContext.Provider value={{
//             user,
//             loading,
//             login,
//             logout,
//             checkAuth
//         }}>

//             {children}

//         </AuthContext.Provider>

//     );

// };

// export const useAuth = () => useContext(AuthContext);

import { createContext, useContext, useEffect, useState } from "react";
import API from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        checkAuth();

    }, []);

    const checkAuth = async () => {

        try {

            const res = await API.get("/auth/me");

            setUser(res.data.user);

        } catch (error) {

            // THIS IS NORMAL when user is not logged in
            if (error.response?.status !== 401) {

                console.error("Auth error:", error);

            }

            setUser(null);

        } finally {

            setLoading(false);

        }

    };

    const login = () => {

        window.location.href =
            "http://localhost:5000/api/auth/google";

    };

    const logout = async () => {

        try {

            await API.get("/auth/logout");

        } catch { }

        setUser(null);

        window.location.href = "/";

    };

    return (

        <AuthContext.Provider value={{
            user,
            loading,
            login,
            logout,
            checkAuth
        }}>

            {children}

        </AuthContext.Provider>

    );

};

export const useAuth = () => useContext(AuthContext);