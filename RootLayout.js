
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
function RootLayout() {
  return (
    <div >
        <Navbar />
        <div style={{minHeight:'100vh'}}>
            <Outlet />
        </div>
        <Footer />
    </div>
  )
}

export default RootLayout