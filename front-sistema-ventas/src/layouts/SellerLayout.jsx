import { Routes, Route } from "react-router-dom"
import { DashboardSellerPage } from "../pages/DashboardSellerPage"
export const SellerLayout = () => {
  return (
    <Routes>
         <Route path="/" element={<DashboardSellerPage/>} />
    </Routes>
  )
}
