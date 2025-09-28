import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ArthubLanding } from "./components/ArthubLanding";
import ArtPage from "./pages/ArtPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ArthubLanding />} />
        <Route path="/art" element={<ArtPage />} />
      </Routes>
    </Router>
  );
}