import SideNavbar from "@/components/Navbar/SideNavbar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex flex-col  min-h-screen">
      <aside className=" md:w-[20%]">
        <SideNavbar />
      </aside>
      <main className="md:w[80%] mb-10 lg:ml-64 ">
        <Outlet />
      </main>

    </div>
  );
};

export default DashboardLayout;
