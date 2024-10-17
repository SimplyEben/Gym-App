import { Link } from "react-router-dom";
import { useState } from "react";

function SignUp() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10 px-3 py-6 bg-white shadow-md rounded-lg sm:max-w-lg md:max-w-xl lg:max-w-2xl">
      <h1 className="text-2xl font-semibold mb-4 text-black">Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="bg-violet-700 w-full p-2 border rounded text-center text-white">
          Continue With Google
        </div>

        <div className="container my-2 flex gap-2 items-center">
          <div className="flex-grow h-[1px] bg-slate-400"></div>
          <div className="Or text-black">OR</div>
          <div className="flex-grow h-[1px] bg-slate-400"></div>
        </div>

        <label className="block text-left text-gray-700">Name:</label>
        <div className="mb-4 gap-2 flex flex-col sm:flex-row">
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            placeholder="First name"
            required
            className="w-full sm:w-1/2 h-8 bg-custom-light-gray text-black text-base p-2 border rounded"
          />
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            placeholder="Last name"
            required
            className="w-full sm:w-1/2 h-8 bg-custom-light-gray text-black text-base p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-left text-gray-700">
            Email Address:
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter Your Email"
            className="w-full h-8 bg-custom-light-gray text-black text-base p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-left text-gray-700">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter Password"
            className="w-full h-8 bg-custom-light-gray text-black text-base p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors duration-200"
        >
          Continue
        </button>
        <p className="w-full mt-4 text-black text-center">
          Already have an account?
          <Link to="/" className="pl-1 text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
