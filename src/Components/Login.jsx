import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login() {
  // const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("hello", name, value, formData);
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      // No errors, proceed with form submission
      navigate("/home-page");
    } else {
      // Set errors to display in UI
      setErrors(validationErrors);
    }
  };

  const validate = () => {
    const errors = {};

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    return errors;
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("new list", formData)
  //   const errors = validate();

  //     navigate("/home-page")

  // };

  // const validate = () => {
  //   const errors = {};
  //   if (!formData.email) {
  //     errors.email = "Email is required";
  //   } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
  //     errors.email = "Email is invalid";
  //   } else {
  //     errors.email = "";
  //   }

  //   if (!formData.password) {
  //     errors.password = "Password is required";
  //   } else if (formData.password.length < 8) {
  //     errors.password = "Password is invalid";
  //   } else {
  //     errors.password = "";
  //   }
  // };

  return (
    <div className="max-w-80 mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold text-black mb-4">Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-left text-black">Email:</label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter Your Email"
            autoComplete="off"
            required
            className="w-full bg-custom-light-gray text-black text-base p-2 border rounded"
          />
          {errors.email && <p className="error text-red-500">{errors.email}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-left text-black">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter Password"
            autoComplete="off"
            required
            className="w-full bg-custom-light-gray text-black text-sm p-2 border rounded"
          />
          {errors.password && (
            <p className="error text-red-500">{errors.password}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Login
        </button>
      </form>
      <p className="w-full mt-4 text-black">
        Dont have an account?
        <Link to="/signup" className="pl-1">
          Sign Up
        </Link>
      </p>
    </div>
  );
}

export default Login;
