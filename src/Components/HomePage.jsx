import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

function HomePage() {
  return (
    <div className="flex w-screen home box-border">
      <div>
        <SideBar />
      </div>
      <div className="flex-grow w-3/4 px-4 bg-gray-200 h-full">
        <Outlet />
      </div>
    </div>
  );
}

export default HomePage;
