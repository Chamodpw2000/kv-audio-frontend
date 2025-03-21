import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import HomePage from './pages/home/homePage'
import AdminDashboard from './pages/admin/adminDashboard'
import Testing from './components/testing'
import LoginPage from './login/login'
import ItemsCard from './components/itemsCard'
import AddItem from './components/addItem'
import RegisterPage from './assets/register/RegisterPage'
import NotFound from './pages/home/notFound'
import BookingsPage from './pages/home/bookingPage'
import { GoogleOAuthProvider } from "@react-oauth/google";
import VerifyEmail from './pages/verifyEmail/verifyEmail'


function App() {
    return (

        <GoogleOAuthProvider clientId="143085653371-a7mme4pqh6d964ctj6rsshbtn7i9siqg.apps.googleusercontent.com">
        <BrowserRouter>
            <Toaster position="top-right" />

            <Routes>
                <Route path="/admin/*" element={<AdminDashboard />} />
                <Route path="/home/*" element={<HomePage />} />
                <Route path="/test" element={<Testing />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/verify-email" element={<VerifyEmail />} />


                <Route path="/" element={<HomePage />} />
                <Route path="*" element={<NotFound/>} />
            </Routes>
        </BrowserRouter>

        </GoogleOAuthProvider>

    )
}

export default App
