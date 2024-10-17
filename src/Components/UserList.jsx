import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosPersonAdd } from "react-icons/io";
// import axios from "axios";

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
        console.log(result);
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
    console.log("going into renew", "id: ", user.id);
    navigate(`/renew-page/${user.id}`, { state: { user } });
  };

  return (
    <div className="container mx-auto mt-5 md:mt-10 p-4 bg-white shadow-md rounded-lg">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold text-black mb-6">Users</h1>
        <button
          className="bg-blue-600 text-white px-3 py-2 my-5 rounded"
          onClick={goToAddUser}
        >
          <IoIosPersonAdd />
        </button>
      </div>
      <table className="w-full text-black table-auto">
        <thead>
          <tr>
            {/* <th className="px-4 py-2 border">ID</th> */}
            <th className="px-4 py-2 text-sm md:text-xl border">Name</th>
            <th className="px-4 py-2 text-sm md:text-xl border hidden sm:table-cell">
              Address
            </th>
            <th className="px-4 py-2 text-sm md:text-xl border hidden sm:table-cell">
              Purpose
            </th>
            <th className="px-4 py-2 text-sm md:text-xl border">Number</th>
            <th className="px-4 py-2 text-sm md:text-xl border hidden sm:table-cell">
              Medical Condition
            </th>
            <th className="px-4 py-2 text-sm md:text-xl border hidden sm:table-cell">
              Subscription Date
            </th>
            <th className="px-4 py-2 text-sm md:text-xl border hidden sm:table-cell">
              Status
            </th>
            <th className="px-4 py-2 text-sm md:text-xl border">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="text-center">
              {/* <td className="px-4 py-2 border">{user.id}</td> */}
              <td className="px-4 py-2 text-sm md:text-xl border">
                {user.name}
              </td>
              <td className="px-4 py-2 border hidden sm:table-cell">
                {user.address}
              </td>
              <td className="px-4 py-2 border hidden sm:table-cell">
                {user.purpose}
              </td>
              <td className="px-4 py-2 border ">{user.phone}</td>
              <td className="px-4 py-2 border hidden sm:table-cell">
                {user.medicalCondition}
              </td>
              <td className="px-4 py-2 border hidden sm:table-cell">
                {user.subscriptionDate}
              </td>
              <td
                className={`px-4 py-2 text-sm md:text-xl border hidden sm:table-cell ${
                  checkExpiry(user.subscriptionDate)
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {checkExpiry(user.subscriptionDate) ? "Expired" : "Active"}
              </td>
              <td className="px-4 py-2 text-sm md:text-xl border">
                {checkExpiry(user.subscriptionDate) ? (
                  <button
                    onClick={() => handleRenew(user)}
                    className="bg-blue-500 text-white px-2 md:px-4 py-1 md:py-2 rounded-lg"
                  >
                    Renew
                  </button>
                ) : (
                  <span className="text-gray-500">Active</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
