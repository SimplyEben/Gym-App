import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [userCount, setUserCount] = useState(0);
   const [expiredUserCount, setExpiredUserCount] = useState(0);
  const [adminCount, setAdminCount] = useState(0);


  const checkExpiry = (subscriptionDate) => {
    const subscription = new Date(subscriptionDate);
    const today = new Date();
    const differenceInTime = today - subscription;
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    return differenceInDays >= 30;
  };

  useEffect(() => {
    
    axios
      .get("http://localhost:8899/users/")
      .then((response) => {
        const users = response.data;
        setUserCount(users.length);

        
        const expiredUsers = users.filter((user) =>
          checkExpiry(user.subscriptionDate)
        );
        setExpiredUserCount(expiredUsers.length);
      })
      .catch((error) => console.error(error));

    // Fetch admins data
    axios
      .get("http://localhost:8989/admins/")
      .then((response) => {
        const admins = response.data;
        setAdminCount(admins.length);
      })
      .catch((error) => console.error(error));
  }, []);

  
  
  return (
    <div className="dashboard-container p-4">
      <h1 className="text-xl md:text-2xl font-semibold text-black mb-4">
        Dashboard
      </h1>
      <div
      
        className="flex flex-col md:flex-row gap-10 justify-center items-center"
      >
        <div className="bg-blue-500 w-48 md:w-60 shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold text-white">Total Users</h2>
          <p className="text-2xl text-white">{userCount}</p>
        </div>
        <div className="bg-red-400 w-48 md:w-60 shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold text-white">Expired Users</h2>
          <p className="text-2xl text-white">{expiredUserCount}</p>
        </div>
        <div className="bg-orange-500 w-48 md:w-60 shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold text-white">Total Admins</h2>
          <p className="text-2xl text-white">{adminCount}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
