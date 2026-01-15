import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/Home";
import HomePage from "../Pages/Home/Home";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: HomeLayout,
        // hydrateFallbackElement: <LoadingUi />,
        // errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                Component: HomePage
            },
        ]
    },
])