import { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import { FaBars } from "react-icons/fa6";
import { Link } from "react-router-dom";

function HomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col lg:flex-row w-screen min-h-screen ">

      
      <div className="lg:hidden bg-blue-500 p-4 text-white flex justify-between items-center">
        <h1 className="text-xl font-semibold">Home</h1>
        <FaBars
          className="text-white focus:outline-none"
          onClick={toggleSidebar}
        />
      </div>

      
      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } lg:hidden bg-green-100 w-44 mr-4 p-4 absolute top-16 right-0 z-50 shadow-lg rounded-lg`}
      >
        <ul>
          <li className="mb-2 hover:text-blue-500">
            <Link to="" onClick={toggleSidebar}>
              Dashboard
            </Link>
          </li>
          <li className="mb-2 hover:text-blue-500">
            <Link to="admin-list" onClick={toggleSidebar}>
              Admin
            </Link>
          </li>
          <li className="mb-2 hover:text-blue-500">
            <Link to="user-list" onClick={toggleSidebar}>
              Users
            </Link>
          </li>
          <li className="mb-2 hover:text-blue-500">
            <Link to="add-user" onClick={toggleSidebar}>
              Add User
            </Link>
          </li>
        </ul>
      </div>

      
      <div className={`${isSidebarOpen ? "block" : "hidden"} lg:block h-full`}>
        <SideBar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>

      
      <div className="flex-grow w-full lg:w-3/4 px-4 bg-gray-200 h-full">
        <Outlet />
      </div>
    </div>
  );
}

export default HomePage;
