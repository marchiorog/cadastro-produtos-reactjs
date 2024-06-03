import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ProductTable from './routes/ProductTable.jsx'
import LoginPage from './routes/LoginPage.jsx'
import ProductForm from './routes/ProductForm.jsx'
import RegisterUser from './routes/RegisterUser.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage/>
  },
  {
    path: "/tabela",
    element: <ProductTable/>
  },
  {
    path: "/cadastroprodutos",
    element: <ProductForm/>
  },
  {
    path: "/cadastrousuarios",
    element: <RegisterUser/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={ router }/>
  </React.StrictMode>,
)
