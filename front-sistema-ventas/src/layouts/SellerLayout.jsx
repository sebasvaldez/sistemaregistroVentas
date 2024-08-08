import { Routes, Route } from "react-router-dom"
import { DashboardSellerPage } from "../pages/DashboardSellerPage"
import { ProfilePage } from "../pages/ProfilePage"

export const SellerLayout = () => {
  return (
    <Routes>
         <Route path="/" element={<DashboardSellerPage/>} />
          <Route path="/profile" element={<ProfilePage/>} />
    </Routes>
  )
}
