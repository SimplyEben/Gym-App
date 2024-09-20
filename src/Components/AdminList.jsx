import { useEffect, useState } from "react";
// import axios from "axios";

function AdminList() {
  // State to store the list of admins
  const [admins, setAdmins] = useState([]);

  // State for the form input values
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });

  useEffect(() => {
    fetch("http://localhost:8989/admins") 
      .then((response) => response.json())
      .then((data) => setAdmins(data))
      .catch((error) => console.error("Error fetching admins:", error));
  }, []);

  
  const handleInput = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:8989/admins", {
      
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((newAdmin) => {
        // Add the new admin to the current list
        setAdmins([...admins, newAdmin]);

        
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
        });
      })
      .catch((error) => console.error("Error adding admin:", error));
  };

  return (
    <div className="max-w-4xl flex gap-x-10 mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <div>
        <h1 className="text-2xl font-semibold text-black mb-6">Admin List</h1>
        <table className="w-full text-black table-auto mb-6">
          <thead>
            <tr>
              <th className="px-4 py-2 border">First Name</th>
              <th className="px-4 py-2 border">Last Name</th>
              <th className="px-4 py-2 border">Email</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin, index) => (
              <tr key={index} className="text-center">
                <td className="px-4 py-2 border">{admin.firstname}</td>
                <td className="px-4 py-2 border">{admin.lastname}</td>
                <td className="px-4 py-2 border">{admin.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-black mb-4">Add New Admin</h2>
        <form onSubmit={handleSubmit}>
          <div className="max-w-md mx-auto mt-10 p-6 gap-y-5 bg-white shadow-md rounded-lg">
            <div className="mb-4">
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleInput}
                placeholder="First Name"
                className="bg-custom-light-gray text-black text-base p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleInput}
                placeholder="Last Name"
                className="bg-custom-light-gray text-black text-base p-2 border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInput}
                placeholder="Email"
                className="bg-custom-light-gray text-black text-base p-2 border rounded"
                required
              />
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Add Admin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminList;
