import { useState } from "react";
// import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
// import { users} from './UserList';
//  import axios from "axios";

function AddUser() {

  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    subscriptionDate: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("first",users)
  //   users.push(formData);
  //   console.log("second",users);
  //   // addUser(formData);
  //   // setFormData({
  //   //   firstname: "",
  //   //   lastname: "",
  //   //   phone: "",
  //   //   email: "",
  //   //   subscriptionDate: "",
  //   // });

  // };

  const handleSubmit = (event) => {
    event.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(formData);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:8899/users", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("User added:", result);
        // On successful submission, update the users array
        setUsers([...users, result]);
        // Clear the form fields after submission
        setFormData({
          firstname: "",
          lastname: "",
          phone: "",
          email: "",
          subscriptionDate: "",
        });
      })
      .catch((error) => console.error("Error adding user:", error));
  // axios
      //  .post("http://localhost:8899/users/posts")
      //  .then((response) => response.json())
  //      .then((response) => {
  //       console.log("User added:", response);
  //      // On successful submission, update the users array
  //      setUsers([...users, response]);
  //      // Clear the form fields after submission
  //       setFormData({
  //         firstname: "",
  //        lastname: "",
  //        phone: "",
  //        email: "",
  //         subscriptionDate: "",
  //      })
  //      .catch((err) => console.log(err));
  //  });
  };

  const navigate = useNavigate();

  const checkUserList = () => {
    navigate("/home-page/user-list");
  };

  return (
    <div className="max-w-80 mx-auto p-4 mt-10 bg-white shadow-md rounded-lg">
      {/* <h1 className="text-2xl font-semibold text-black mb-4">Add User</h1> */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-black">Firstname:</label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
            className="w-full bg-custom-light-gray text-black p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-black">Lastname:</label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            required
            className="w-full bg-custom-light-gray text-black p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-black">Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full bg-custom-light-gray text-black p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-black">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-custom-light-gray text-black p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-black">Subscription Date:</label>
          <input
            type="date"
            name="subscriptionDate"
            value={formData.subscriptionDate}
            onChange={handleChange}
            required
            className="w-full bg-custom-light-gray text-black p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded"
        >
          Add User
        </button>
      </form>
     

      <button
        className="bg-blue-600 text-white px-3 py-2 my-5 rounded"
        onClick={checkUserList}
      >
        Check Users List
      </button>
    </div>
  );
}

export default AddUser;
