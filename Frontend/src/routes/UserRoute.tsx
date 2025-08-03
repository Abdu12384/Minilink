import { LoginPage } from "@/features/auth/components/Login"
import { SignupPage } from "@/features/auth/components/Signin"
import Home from "@/pages/HomePage"
import { Route, Routes } from "react-router-dom"
import PublicRoute from "@/utils/protected/PublicRoute"
import ProtectedRoute from "@/utils/protected/ProtectedRoute"
import { UrlShortenerForm } from "@/features/shortner/components/UrlShortenerForm"
import UserProfilePage from "@/pages/user/ProfilePage"
import DashboardContent from "@/pages/Dashboard"







export  const UserRoute= () =>{
  return (
     <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} >
            <Route path="" element={<DashboardContent />} />
            <Route path="profile" element={<UserProfilePage />} />
          </Route>
      </Route>
     </Routes>
  )
}