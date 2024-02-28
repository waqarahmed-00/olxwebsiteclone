import { createBrowserRouter, RouterProvider, Outlet, useNavigate } from "react-router-dom";
import { Dashboard } from "../view/Dashboard";
import Detail from "../view/Detail";
import { Register } from "../component/Register";
import { Signin } from "../component/Signin";
import { AddItem } from "../component/AddItem";
import { Profile } from "../view/Profile";
import { Cart } from "../view/Cart";
// import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase/firebase";


const router = createBrowserRouter([
    // {
    //     path: "/",
    //     element: <Layout />,
    //     children: [
            {
                path: "/",
                element: <Dashboard />,
            },

            {
                path: `/Detail/:id`,
                element: <Detail />,
            },

            {
                path: `/Register`,
                element: <Register />,
            },

            {
                path: `/Signin`,
                element: <Signin />,
            },

            {
                path: `/AddItem`,
                element: <AddItem />,
            },
            {
                path: `/Profile`,
                element: <Profile />,
            },
            {
                path: `/Cart`,
                element: <Cart />,
            },

    //     ]
    // }
]);


// function Layout() {
//     const navigate = useNavigate()
//     const [user, setUser] = useState()

//     useEffect(() => {
//         const auth = getAuth()
//         onAuthStateChanged(auth, (user) => {
//             setUser(user)
//         });
//     }, [])

//     useEffect(() => {
//         const { pathname } = window.location;
//         if (user) {
//             console.log(user)
//             if (pathname === "/Signin" || pathname === "/Register") {
//                 navigate("/")
//             } else {
//                 if (pathname === "/AddItem") {
//                     navigate("/Signin")
//                 }
//             }
//         }

//     }, [window.location.pathname, user])

//     return (
//         <div>
//             <Outlet/>
//         </div>
//     )

// }

function Router() {
    return <RouterProvider router={router} />
}
export default Router