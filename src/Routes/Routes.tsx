import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/Home";
import HomePage from "../Pages/Home/Home";
import LoginPage from "../Pages/Home/Forms/Login";
import RegisterPage from "../Pages/Home/Forms/Register";

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
            {
                path: "login",
                Component: LoginPage
            },
            {
                path: "register",
                Component: RegisterPage
            },
        ]
    },
])