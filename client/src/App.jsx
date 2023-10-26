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

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/policy' element={<PolicyPage />} />
        <Route path='*' element={<PageNotFound />} />


        <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]} />}>
          <Route path='/dashboard/user' element={<Dashboard />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
          <Route path='/dashboard/admin' element={<AdminDashboard />} />
          <Route path='/dashboard/admin/create-category' element={<CreateCategory />} />
          <Route path='/dashboard/admin/create-product' element={<CreateProduct />} />
          <Route path='/dashboard/admin/users' element={<Users />} />
        </Route>
      </Routes>
    </>
  )
}

export default App