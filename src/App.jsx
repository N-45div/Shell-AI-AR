import RingSizer from "./components/RingSizer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CustomHandRing from "./components/CustomHandRing";
import Navbar from "./components/Nav/Navbar";
import Homepage from "./components/Home/Homepage";
import Footer from "./components/Footer-Folder/Footer";
function App() {
  return (
    <div className="App">
      {/* Navbar for site navigation */}
      <Navbar />

      {/* Main content area */}
      <main>
        <Router>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/RingSizer" element={<RingSizer />} />
            <Route path="/CustomRing" element={<CustomHandRing />} />
          </Routes>
        </Router>
      </main>

      {/* Footer section */}

      <Footer />
    </div>
  );
}

export default App;
