import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function RenewPage() {
  const { id } = useParams();
  const [info, setInfo] = useState({
    id: id,
    name: "",
    phone: "",
    subscriptionDate: "",
    newSubscriptionDate: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state.user;
  console.log("gotten user", user);

  

  useEffect(() => {
    axios
      .get("http://localhost:8899/users/" + id)
      .then((res) => {
        setInfo({
          ...info,
          name: res.data.name,
          phone: res.data.phone,
          subscriptionDate: res.data.subscriptionDate,
          newSubscriptionDate: "",
        });
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleInput = (event) => {
    setInfo({
      ...info,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("id", user.id, "info", user);
    axios
      .put("http://localhost:8899/users/" + user.id, {
        ...user,
        subscriptionDate: info.newSubscriptionDate,
      })
      .then((response) => {
        console.log("My data", response);
        setInfo({
          ...user,
          subscriptionDate: response.data.newSubscriptionDate,
        });
        navigate("/home-page/user-list");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-semibold text-black mb-4 text-center">
        Renew Subscription
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="max-w-md mx-auto mt-10 p-6 gap-y-5 bg-white shadow-md rounded-lg">
          <div className="mb-4 flex flex-col gap-y-2">
            <label className="text-left font-semibold">Name:</label>
            <input
              type="text"
              name="name"
              value={user.name}
              placeholder="Name"
              className="bg-custom-light-gray text-black text-base p-2 border rounded w-full"
              readOnly
            />
          </div>
          <div className="mb-4 flex flex-col gap-y-2">
            <label className="text-left font-semibold">Phone:</label>
            <input
              type="number"
              name="phone"
              value={user.phone}
              placeholder="Phone"
              className="bg-custom-light-gray text-black text-base p-2 border rounded w-full"
              readOnly
            />
          </div>
          <div className="mb-4 flex flex-col gap-y-2">
            <label className="text-left font-semibold">
              Last Subscription Date:
            </label>
            <input
              type="date"
              name="subscription"
              value={user.subscriptionDate}
              className="bg-custom-light-gray text-black text-base p-2 border rounded w-full"
              readOnly
            />
          </div>
          <div className="mb-4 flex flex-col gap-y-2">
            <label className="text-left font-semibold">
              New Subscription Date:
            </label>
            <input
              type="date"
              name="newSubscriptionDate"
              value={info.newSubscriptionDate}
              onChange={handleInput}
              placeholder="New Subscription Date"
              className="bg-custom-light-gray text-black text-base p-2 border rounded w-full"
              required
            />
          </div>
          {/* <div className="mb-4">
            <input
              type="number"
              name="amount"
              value={info.amount}
              onChange={handleInput}
              placeholder="Amount"
              className="bg-custom-light-gray text-black text-base p-2 border rounded w-full"
              required
            />
          </div> */}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Renew
          </button>
        </div>
      </form>
    </div>
  );
}

export default RenewPage;
