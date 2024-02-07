import "./App.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import SignupPage from "./pages/Signup"
import LoginPage from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import PrivateRoute from "./components/PrivateRoute"
import { useEffect, useState } from "react"
import useLocalStorage from "./hooks/useLocalStorage"
import { localStorageKeys } from "./constants/global"

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const { get } = useLocalStorage()

    useEffect(() => {
        const user = get(localStorageKeys.TOKEN)

        if (user) {
            setIsAuthenticated(true)
        }
    }, [isAuthenticated])

    const router = createBrowserRouter([
        { path: "/", element: <LoginPage /> },
        { path: "/signup", element: <SignupPage /> },
        {
            path: "/dashboard",
            element: (
                <PrivateRoute
                    component={Dashboard}
                    authenticated={isAuthenticated}
                />
            )
        }
    ])

    return (
        <div className='min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-md w-full space-y-8'>
                <RouterProvider router={router} />
            </div>
        </div>
    )
}

export default App
