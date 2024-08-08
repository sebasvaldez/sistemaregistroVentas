import { AdminProfile } from "../components/auth/AdminProfile"
import { SellerProfile } from "../components/auth/SellerProfile"
import { useContext } from "react"
import { AuthContext } from "../contexts/Authcontext";

export const ProfilePage = () => {
    const { state } = useContext(AuthContext);
    const rol = state.user.rol;
    return (
        <div>
            {rol.includes("admin") && <AdminProfile />}
            {rol.includes("seller") && <SellerProfile />}
        </div>
    )
}
