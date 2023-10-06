import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './Componants/Pages/Home/Home';
import Navbar from './Componants/Navbar/Navbar';
import Footer from './Componants/Footer/Footer';
import Login from './Componants/Pages/Login/Login'
import Signup from './Componants/Pages/Login/SIgnup'


function App() {
  return (
    <div className="App" style={{maxWidth : "1536px" , margin : "0 auto" , backgroundColor : "#0F172A"}}>
    <Router> 
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<Signup />} />
      </Routes>
      <Footer />
    </Router>
  </div>
  );
}

export default App;
