import React from 'react';
import ReactDOM from 'react-dom';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './routes/App';
import ServicesPage from './routes/ServicesPage';
import ServiceForm from './routes/ServiceForm';
import UsersPage from './routes/UsersPage';
import UserForm from './routes/UserForm';
import Login from './routes/Login';
import Register from './routes/Register';
import Home from './routes/Home'; 
import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home /> 
      },
      {
        path: "services",
        element: <ServicesPage />
      },
      {
        path: "services/new",
        element: <ServiceForm />
      },
      {
        path: "services/:id",
        element: <ServiceForm />
      },
      {
        path: "users",
        element: <UsersPage />
      },
      {
        path: "users/new",
        element: <UserForm />
      },
      {
        path: "users/:id",
        element: <UserForm />
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  },  
  {
    path: "/register",
    element: <Register />
  },  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
