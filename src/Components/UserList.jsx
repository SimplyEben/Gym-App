// import axios from "axios";
import { useState, useEffect } from "react";
//  import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

     fetch("http://localhost:8899/users", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        setUsers(result);
      })
      .catch((error) => console.error(error));
  }, []);

  const checkExpiry = (subscriptionDate) => {
    const subscription = new Date(subscriptionDate);
    const today = new Date();
    const differenceInTime = today - subscription;
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);

    return differenceInDays >= 30;
  };

  const navigate = useNavigate();

  const goToAddUser = () => {
    navigate("/home-page/add-user");
  };

  const handleRenew = (user) => {
    navigate(`/renew-page/${user.id}`, { state: { user } });
    // navigate(`/renew-page/:userId`, { state: { user } });
  };

  return (
    <div className="max-w-5xl ml-5 mt-5 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold text-black mb-6">User List</h1>
      <table className="w-full text-black table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">First Name</th>
            <th className="px-4 py-2 border">Last Name</th>
            <th className="px-4 py-2 border">Phone</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Subscription Date</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="text-center">
              <td className="px-4 py-2 border">{user.id}</td>
              <td className="px-4 py-2 border">{user.firstname}</td>
              <td className="px-4 py-2 border">{user.lastname}</td>
              <td className="px-4 py-2 border">{user.phone}</td>
              <td className="px-4 py-2 border">{user.email}</td>
              <td className="px-4 py-2 border">{user.subscriptionDate}</td>
              <td
                className={`px-4 py-2 border ${
                  checkExpiry(user.subscriptionDate)
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {checkExpiry(user.subscriptionDate) ? "Expired" : "Active"}
              </td>
              <td className="px-4 py-2 border">
                {checkExpiry(user.subscriptionDate) ? (
                  <button
                    onClick={() => handleRenew(user)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                  >
                    Renew
                  </button>
                ) : (
                  // <Link to={`/renew-page/${user.id}`}
                  //   className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                  // >
                  //   Renew
                  // </Link>
                  <span className="text-gray-500">Active</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="bg-blue-600 text-white px-3 py-2 my-5 rounded"
        onClick={goToAddUser}
      >
        Add New User
      </button>
    </div>
  );
}

export default UserList;
