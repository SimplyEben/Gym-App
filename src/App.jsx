import './App.css'
import SignUp from "./Components/SignUp";
import Login from './Components/Login'
import AddUser from './Components/AddUser';
import UserList from './Components/UserList';
import { RouterProvider, createBrowserRouter} from "react-router-dom"
import HomePage from './Components/HomePage';
import Dashboard from './Components/Dashboard';
import AdminList from './Components/AdminList';
import RenewPage from './Components/RenewPage'


function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/renew-page/:userId",
      element: <RenewPage/>,
      children: [
        { 
          path: "user-list", 
          element: <UserList/> 
        }
      ]
    },
    {
      path: "/home-page",
      element: <HomePage />,
      children: [
        { 
          path: "user-list", 
          element: <UserList/> 
        },
        { 
          path: "", 
          element: <Dashboard/>
        },
        { 
          path: "admin-list", 
          element: <AdminList/>
        },
        { 
          path: "add-user", 
          element: <AddUser/>
         },
      ],
    },
  ]);

  return (
    <div className="App ">
        <RouterProvider router={routes} />
      
    </div>
  );
}

export default App;
