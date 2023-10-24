import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout/Layout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/About'
import ContactPage from './pages/Contact'
import PolicyPage from './pages/Policy'
import PageNotFound from './pages/PageNotFound'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/policy' element={<PolicyPage />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App
