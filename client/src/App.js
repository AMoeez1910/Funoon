import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import EmailVerify from "./pages/EmailVerify.jsx";
import Login from "./pages/Login.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import NotFound from "./pages/NotFound.jsx";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "./context/userContext.jsx";
import { ValidationFailure } from "./pages/ValidationFailure.jsx";
import Profile from "./pages/Profile.jsx";
axios.defaults.baseURL = `http://localhost:8000`;
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/verify/:id/:expirationTimestamp"
            element={<EmailVerify />}
          />
          <Route path="/ResetPassword" element={<ResetPassword />} />
          <Route
            path="/ForgotPassword/:id/:token"
            element={<ForgotPassword />}
          />
          <Route
            path="/google/auth/ValidationFailure"
            element={<ValidationFailure />}
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserContextProvider>
    </>
  );
}
export default App;
