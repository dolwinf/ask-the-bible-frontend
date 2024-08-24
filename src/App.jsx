import ChatUI from "./components/ChatUI2";
import Home from "./pages/Home";
import Disclaimer from "./pages/Disclaimer";
import Faq from "./pages/Faq";
import NotFound from "./pages/NotFound";
import { Route, Routes, useLocation } from "react-router-dom";
import BackArrow from "./components/BackButton";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const location = useLocation();

  const showBackArrow =
    location.pathname === "/chat" ||
    location.pathname === "/disclaimer" ||
    location.pathname === "/faq";

  return (
    <div className="font-poppins">
      <ToastContainer />
      {showBackArrow && <BackArrow />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<ChatUI />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
