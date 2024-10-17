import { Link } from "react-router-dom";

function SideBar() {
  return (
    <div className="container w-52 h-screen bg-gray-800 text-white hidden lg:flex flex-col items-center">
      <div className="mx-auto p-4 text-2xl font-bold">My Gym App</div>
      <nav className="mt-4">
        <ul>
          <li className="mb-2 hover:text-blue-500">
            {/* <span>
              <RiAdminFill />
            </span> */}
            <Link to="">
              {/* <FaTachometerAlt/> */}
              Dashboard
            </Link>{" "}
          </li>
          <li className="mb-2 hover:text-blue-500">
            <Link to="admin-list">Admin</Link>
          </li>
          <li className="mb-2 hover:text-blue-500">
            <Link to="user-list">Users</Link>
          </li>
          <li className="mb-2 hover:text-blue-500">
            <Link to="add-user">Add User</Link>
          </li>
          {/* <li className="mb-2 hover:text-blue-500">
            <Link to="renew-page">Renew</Link>
          </li> */}
        </ul>
      </nav>
    </div>
  );
}

export default SideBar;
