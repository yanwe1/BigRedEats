import { MantineProvider } from "@mantine/core";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/Error";
import RootLayout from "./layouts/RootLayout";
import { PATHS } from "./constants/Navigation";
import { AuthUserProvider } from './components/auth/AuthUserProvider'; // Import AuthUserProvider
import SignInPage from './pages/SignInPage'; // Import SignInPage
import Home from './pages/Home'
import MorrisonDining from './pages/MorrisonDining'; // Import MorrisonDining page
import NorthStar from './pages/NorthStar'; // Import NorthStar page


import "./index.css";

// Define router with routes for HomePage, MorrisonDining, and NorthStar
const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            // Add the HomePage route
            {
                path: "/",
                element: <SignInPage />,
            },
            // New Home Page route after successful sign-in
            {   
                path: "/home",
                element: <Home />,  // Redirected home page
            },
            // Add the Morrison Dining route
            {
                path: "/morrison-dining",
                element: <MorrisonDining />,
            },
            // Add the NorthStar Dining route
            {
                path: "/northstar-dining",
                element: <NorthStar />,
            },
            // Spread other paths from PATHS (if you have them)
            ...PATHS.map((item) => ({
                path: item.link,
                element: item.element,
            })),
        ],
    },
]);

export default function App() {
    return (
        <MantineProvider withGlobalStyles withNormalizeCSS>
            <AuthUserProvider>
                <RouterProvider router={router} />
            </AuthUserProvider>
        </MantineProvider>
    );
}
