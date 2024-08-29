import ErrorElement from "@/components/Shared/ErrorElement";
import DashboardLayout from "@/layouts/DashboardLayout";
import MainLayout from "@/layouts/MainLayout";
import Protected from "@/layouts/Protected";
import About from "@/pages/About/About";
import AvailableBikes from "@/pages/AvailableBikes/AvailableBikes";
import Bikes from "@/pages/Bikes/Bikes";
import DeleteBike from "@/pages/Dashboard/DeleteBike/DeleteBike";
import MyRentals from "@/pages/Dashboard/MyRentals/MyRentals";
import Profile from "@/pages/Dashboard/Profile/Profile";
import UserManagement from "@/pages/Dashboard/UserManagement/UserManagement";
import Home from "@/pages/Home/Home";
import Login from "@/pages/Login/Login";
import SignUp from "@/pages/Signup/Signup";
import SingleBike from "@/pages/SingleBike/SingleBike";
import UpdateProfile from "@/pages/UpdateProfile/UpdateProfile";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorElement />,
    children: [
      { path: '/', element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'all-bikes', element: <Bikes /> },
      { path: '/bikes/:id', element: <SingleBike /> },
      { path: 'signup', element: <SignUp /> },
      { path: 'login', element: <Login /> },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <Protected>
        <DashboardLayout />
      </Protected>
    ),
    children: [
      { path: 'available-bikes', element: <AvailableBikes /> },
      { path: 'profile', element: <Profile /> },
      { path: 'update-profile', element: <UpdateProfile /> },
      { path: 'my-rentals', element: <MyRentals /> },
      { path: 'user-management', element: <UserManagement /> },
      { path: 'delete-bike', element: <DeleteBike /> },
    ],
  },
]);

const AppRoutes = () => <RouterProvider router={router} />;

export default AppRoutes;
