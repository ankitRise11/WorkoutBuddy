import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import UpdateData from "./pages/UpdateData";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/update-data/:id" element={<UpdateData />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
