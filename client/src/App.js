import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './Componants/Pages/Home/Home';
import Navbar from './Componants/Navbar/Navbar';
import Footer from './Componants/Footer/Footer';


function App() {
  return (
    <div className="App" style={{maxWidth : "1536px" , margin : "0 auto" , backgroundColor : "#0F172A"}}>
    <Router> 
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </Router>
  </div>
  );
}

export default App;
