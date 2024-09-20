import { useEffect, useState } from "react";
// import { users } from "./UserList";
// import { admins } from "./AdminList";

function Dashboard() {
  const [userCount, setUserCount] = useState(0);
  const [expiredUserCount, setExpiredUserCount] = useState(0);
  const [adminCount, setAdminCount] = useState(0);

  useEffect(() => {
    setUserCount(2);

    setAdminCount(2);

    // const expiredUsers = users.filter((user) => {
    //   const subscriptionDate = new Date(user.subscriptionDate);
    //   const today = new Date();
    //   const differenceInTime = today - subscriptionDate;
    //   const differenceInDays = differenceInTime / (1000 * 3600 * 24);

    //   return differenceInDays >= 30;
    // });

    setExpiredUserCount(5);
  }, []);

  return (
    <div className="dashboard-container p-4">
      <h1 className="text-3xl font-semibold text-black mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-blue-500 shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold text-white">Total Users</h2>
          <p className="text-2xl text-white">{userCount}</p>
        </div>
        <div className="bg-red-400 shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold text-white">Expired Users</h2>
          <p className="text-2xl text-white">{expiredUserCount}</p>
        </div>
        <div className="bg-orange-500 shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold text-white">Total Admins</h2>
          <p className="text-2xl text-white">{adminCount}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
