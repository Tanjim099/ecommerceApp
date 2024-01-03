import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout/Layout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/About'
import ContactPage from './pages/Contact'
import PolicyPage from './pages/Policy'
import PageNotFound from './pages/PageNotFound'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import Dashboard from './pages/user/Dashboard'
import RequireAuth from './components/auth/RequireAuth'
import ForgotPassword from './pages/auth/ForgotPassword'
import AdminDashboard from './pages/admin/AdminDashboard'
import CreateCategory from './pages/admin/CreateCategory'
import CreateProduct from './pages/admin/CreateProduct'
import Users from './pages/admin/Users'
import Profile from './pages/user/Profile'
import Orders from './pages/user/Orders'
import AdminProducts from './pages/admin/AdminProducts'
import UpdateProduct from './pages/admin/UpdateProduct'
import Search from './pages/Search'
import ProductDetails from './pages/ProductDetails'
import Categories from './pages/Categories'
import CategoryProduct from './pages/CategoryProduct'
import CartPage from './pages/CartPage'
import AdminOrders from './pages/admin/AdminOrders'
import AdminUsers from './pages/admin/AdminUsers'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/product/:slug' element={<ProductDetails />} />
        <Route path='/category' element={<Categories />} />
        <Route path='/category/:slug' element={<CategoryProduct />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path="/search" element={<Search />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/policy' element={<PolicyPage />} />
        <Route path='*' element={<PageNotFound />} />


        <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]} />}>
          <Route path='/dashboard/user' element={<Dashboard />} />
          <Route path='/dashboard/user/profile' element={<Profile />} />
          <Route path='/dashboard/user/orders' element={<Orders />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
          <Route path='/dashboard/admin' element={<AdminDashboard />} />
          <Route path='/dashboard/admin/create-category' element={<CreateCategory />} />
          <Route path='/dashboard/admin/create-product' element={<CreateProduct />} />
          <Route path='/dashboard/admin/all-products' element={<AdminProducts />} />
          <Route path='/dashboard/admin/product/:pid' element={<UpdateProduct />} />
          <Route path='/dashboard/admin/users' element={<AdminUsers />} />
          <Route path='/dashboard/admin/orders' element={<AdminOrders />} />
        </Route>
      </Routes>
    </>
  )
}

export default App