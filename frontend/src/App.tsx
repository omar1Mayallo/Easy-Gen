import { Routes, Route } from "react-router-dom";
import Header from "./layout/Header";
import Login from "./pages/Auth/Login";
import Home from "./pages/Home";
import Register from "./pages/Auth/Register";
import NotFound from "./pages/NotFound";
import Footer from "./layout/Footer";
import Profile from "./pages/Auth/Profile";
import { PrivateRoute, PublicRoute } from "./routes";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
