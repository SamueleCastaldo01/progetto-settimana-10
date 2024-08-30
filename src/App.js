
import './App.css';
import HomePage from "./pages/HomePage";
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
     
     <Router>
        <NavBar />
        <Routes>
        <Route path="/" element={<HomePage />} />


        </Routes>
      </Router>

    </div>
  );
}

export default App;
