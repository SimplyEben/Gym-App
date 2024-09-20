import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function RenewPage() {
  const { id } = useParams();
  const [info, setInfo] = useState({
    id: id,
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    subscriptionDate: "",
    newSubscriptionDate: "",
    amount: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:8899/users/" + id)
      .then((res) => {
        setInfo({
          ...info,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          phone: res.data.phone,
          email: res.data.email,
          subscriptionDate: res.data.subscriptionDate,
        });
      })
      .catch((err) => console.log(err));
  }, [id]);

  const navigate = useNavigate();

  const location = useLocation();
  console.log("user details", location.state.user);
  const user = location.state.user;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:8899/users/" + id, info)
      .then((response) => {
        setInfo({
          ...info,
          newSubscriptionDate: response.data.newSubscriptionDate,
          amount: response.data.amount,
        });
        navigate("/user-list");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-black mb-4">
        Renew Subscription
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="max-w-md mx-auto mt-10 p-6 gap-y-5 bg-white shadow-md rounded-lg">
          <div className="mb-4">
            <input
              type="text"
              name="firstName"
              value={`${user.firstname} ${user.lastname}`}
              placeholder="First Name"
              className="bg-custom-light-gray text-black text-base p-2 border rounded"
              readOnly
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              name="phone"
              value={user.phone}
              placeholder="Phone"
              className="bg-custom-light-gray text-black text-base p-2 border rounded"
              readOnly
            />
          </div>

          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={user.email}
              placeholder="Phone"
              className="bg-custom-light-gray text-black text-base p-2 border rounded"
              readOnly
            />
          </div>
          <div className="mb-4">
            <input
              type="date"
              name="subscription"
              value={user.subscriptionDate}
              placeholder="Email"
              className="bg-custom-light-gray text-black text-base p-2 border rounded"
              readOnly
            />
          </div>
          <div className="mb-4">
            <input
              type="date"
              name="newSubscriptionDate"
              value={info.newSubscriptionDate}
              onChange={(e) =>
                setInfo({ ...info, newSubscriptionDate: e.target.value })
              }
              placeholder="Subscription Date"
              className="bg-custom-light-gray text-black text-base p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              name="amount"
              value={info.amount}
              onChange={(e) => setInfo({ ...info, amount: e.target.value })}
              placeholder="Amount"
              className="bg-custom-light-gray text-black text-base p-2 border rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Renew
          </button>
        </div>
      </form>
    </div>
  );
}

export default RenewPage;
