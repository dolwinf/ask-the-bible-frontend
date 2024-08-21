import ChatUI from "./components/ChatUI2";
import Home from "./pages/Home";
import Disclaimer from "./pages/Disclaimer";
import { Route, Routes, useLocation } from "react-router-dom";
import BackArrow from "./components/BackButton";

function App() {
  const location = useLocation();

  const showBackArrow =
    location.pathname === "/chat" || location.pathname === "/disclaimer";

  return (
    <div className="font-poppins">
      {showBackArrow && <BackArrow />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<ChatUI />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
      </Routes>
    </div>
  );
}

export default App;
