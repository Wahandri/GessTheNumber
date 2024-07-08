import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Start from "./components/Start/Start.js";


function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Start />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
