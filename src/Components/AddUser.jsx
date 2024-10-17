import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddUser() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    purpose: "",
    phone: "",
    medicalCondition: "",
    subscriptionDate: "",
  });

  const navigate = useNavigate();

  const checkUserList = () => {
    navigate("/home-page/user-list");
  };

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:8899/users", formData)
      .then((response) => {
        console.log("User added:", response.data);
        setFormData({
          name: "",
          address: "",
          purpose: "",
          phone: "",
          medicalCondition: "",
          subscriptionDate: "",
        });
      })
      .catch((error) => {
        console.error("Error adding user:", error);
      });
  };

  return (
    <div className="w-full max-w-md mx-auto my-5 p-4 bg-white shadow-md rounded-lg sm:max-w-lg md:max-w-xs lg:max-w-xs">
      <h1 className="text-2xl font-semibold text-black mb-4">Add New User</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Name"
            className="w-full bg-gray-200 text-black text-base p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Address"
            className="w-full bg-gray-200 text-black text-base p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <select
            name="purpose"
            value={formData.purpose}
            onChange={handleInputChange}
            className="w-full bg-gray-200 text-black text-base p-2 border rounded"
            required
          >
            <option value="" disabled>
              Select Purpose
            </option>
            <option value="Improved Physical Health">
              Improve Physical Health
            </option>
            <option value="Increase In Muscle Mass">
              Increase In Muscle Mass
            </option>
            <option value="Increase In Strength">Increase In Strength</option>
            <option value="Gain Weight">Gain Weight</option>
            <option value="Reduce Fat/ Loose Weight">
              Reduce Fat/ Loose Weight
            </option>
          </select>
        </div>
        <div className="mb-4">
          <input
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Number"
            className="w-full bg-gray-200 text-black text-base p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="medicalCondition"
            value={formData.medicalCondition}
            onChange={handleInputChange}
            placeholder="Medical Condition"
            className="w-full bg-gray-200 text-black text-base p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="date"
            name="subscriptionDate"
            value={formData.subscriptionDate}
            onChange={handleInputChange}
            className="w-full bg-gray-200 text-black text-base p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Add User
        </button>
      </form>

      <button
        className="w-full bg-blue-600 text-white py-2 my-5 rounded hover:bg-blue-700 transition duration-200"
        onClick={checkUserList}
      >
        Check Users List
      </button>
    </div>
  );
}

export default AddUser;
