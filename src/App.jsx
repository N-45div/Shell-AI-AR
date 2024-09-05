import RingSizer from './components/RingSizer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomHandRing from './components/CustomHandRing';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>AR Ring Sizer and Custom Ring App</h1>
      </header>
      <main>
        <Router>
      <Routes>
        <Route path="/" element={<RingSizer />} />
        <Route path="/CustomRing" element={<CustomHandRing />} />
      </Routes>
    </Router>
      </main>
      <footer>
        <p>&copy; 2024 AR Ring Sizer</p>
      </footer>
    </div>
  );
}

export default App;
