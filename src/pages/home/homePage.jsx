import { Route, Routes } from 'react-router-dom'
import RegisterPage from '../../assets/register/RegisterPage'
import LoginPage from '../../login/login'
import Orders from '../admin/bookings'
import BookingsPage from './bookingPage'
import Gallery from './gallery'
import Items from './items'
import NotFound from './notFound'
import ProductOverview from './productOverview'
import Profile from './profile'
import ProfilePage from './profilePage'

const HomePage = ({ auth, setAuth }) => {

    return (
        <>


            <div className="h-full w-full ">

                <div className=' container mx-auto px-[5%]'>

                    <Routes>



                        <Route path="items" element={<Items />} />
                        <Route path="gallery" element={<Gallery />} />
                        <Route path="product/:id" element={<ProductOverview />} />
                        <Route path="booking" element={<BookingsPage />} />
                        <Route path="mybookings" element={<Orders />} />
                        <Route path="myprofile" element={<Profile />} />
                        <Route path="*" element={<NotFound />} />




                    </Routes>
                </div>
            </div>


        </>
    )
}

export default HomePage
