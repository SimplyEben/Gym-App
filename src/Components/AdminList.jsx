import { useEffect, useState } from "react";
import { IoMdPersonAdd } from "react-icons/io";

function AdminList() {
  // State to store the list of admins
  const [admins, setAdmins] = useState([]);

  // State for the form input values
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  // State to control modal visibility
  const [showModal, setShowModal] = useState(false);

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

        // Clear form data and close modal
        setFormData({
          name: "",
          phone: "",
          email: "",
        });
        setShowModal(false); // Close modal after adding
      })
      .catch((error) => console.error("Error adding admin:", error));
  };

  const handleModalOpen = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <div className="mb-10">
        <div className="flex justify-between mb-5">
          <h1 className="text-2xl font-semibold text-black mb-6">Admin</h1>
          <button
            className="bg-blue-500 text-white px-4 rounded hover:bg-green-600 transition duration-200"
            onClick={handleModalOpen}
          >
            <IoMdPersonAdd className="" />
          </button>
        </div>
        <table className="w-full text-black table-auto mb-6">
          <thead>
            <tr>
              <th className="px-4 py-2 border"> Name</th>
              <th className="px-4 py-2 border">Number</th>
              <th className="px-4 py-2 border">Email</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin, index) => (
              <tr key={index} className="text-center">
                <td className="px-4 py-2 border">{admin.name}</td>
                <td className="px-4 py-2 border">{admin.phone}</td>
                <td className="px-4 py-2 border">{admin.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-1/2 lg:w-1/3">
            <h2 className="text-xl font-semibold text-black mb-4">
              Add New Admin
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInput}
                  placeholder="Name"
                  className="w-full bg-gray-200 text-black p-2 border rounded"
                  required
                />
                <input
                  type="number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInput}
                  placeholder="Phone"
                  className="w-full bg-gray-200 text-black p-2 border rounded"
                  required
                />
              </div>

              <div className="w-full">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInput}
                  placeholder="Email"
                  className="w-full bg-gray-200 text-black p-2 border rounded"
                  required
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                >
                  Add Admin
                </button>
                <button
                  type="button"
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200"
                  onClick={handleModalClose}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminList;
