import {
    createBrowserRouter,
} from "react-router-dom";
import Home from "../components/Pages/Home/Home";
import Root from "../components/Root";
import Surveys from "../components/Pages/Surveys/Surveys";
import Pricing from "../components/Pages/Pricing/Pricing";
import NotFound from "../components/Pages/NotFound/NotFound";
import SurveyDetails from "../components/shared/SurveyDetails";
import AboutUs from "../components/Pages/AboutUs/AboutUs";
import Register from "../components/Pages/Register/Register";
import Login from "../components/Pages/Login/Login";
import DashboardRoot from "../components/DashboardRoot";
import PrivateRoute from "./PrivateRoute";
import UserHome from "../components/Pages/Dashboard/UserHome/UserHome";
import AdminHome from "../components/Pages/Dashboard/AdminHome/AdminHome";

const router = createBrowserRouter([
    {
        path: "",
        element: <Root></Root>,
        errorElement: <NotFound></NotFound>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/surveys",
                element: <Surveys></Surveys>
            },
            {
                path: "/surveys/surveyDetails/:id",
                element: <SurveyDetails></SurveyDetails>,
                loader: ({ params }) => fetch(`http://localhost:5000/surveys/surveyDetails/${params.id}`)
            },
            {
                path: "/pricing",
                element: <Pricing></Pricing>
            },
            {
                path: "/aboutUs",
                element: <AboutUs></AboutUs>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
        ]
    },
    {
        path: "dashboard",
        element: <PrivateRoute><DashboardRoot></DashboardRoot></PrivateRoute>,
        errorElement: <NotFound></NotFound>,
        children: [
            // Normal User Route
            {
                path: "userHome",
                element: <UserHome></UserHome>
            },
            {
                path: "participatedSurveys",
                element: <UserHome></UserHome>
            },
            {
                path: "reports",
                element: <UserHome></UserHome>
            },
            {
                path: "comments",
                element: <UserHome></UserHome>
            },

            //Admin Routes
            {
                path: "adminHome",
                element: <AdminHome></AdminHome>
            },

        ]
    }
]);

export default router;