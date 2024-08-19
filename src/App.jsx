import ChatUI from "./components/ChatUI2";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<ChatUI />} />
      </Routes>
    </Router>
  );
}

export default App;
