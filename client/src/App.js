import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Componants/Pages/Home/Home";
import Navbar from "./Componants/Navbar/Navbar";
import Footer from "./Componants/Footer/Footer";
import Login from "./Componants/Pages/Login/Login";
import Signup from "./Componants/Pages/Login/SIgnup";
import CreateNewpost from "./Componants/Pages/CreatePost/CreateNewpost";
import PostDetails from "./Componants/Pages/Postdetails/PostDetails";
import Editinfo from "./Componants/Pages/Profile/Editinfo/Editinfo";
import Profile from "./Componants/Pages/Profile/Profile";

function App() {
  return (
    <div
      className="App"
      style={{
        maxWidth: "1536px",
        margin: "0 auto",
        backgroundColor: "#0F172A",
      }}
    >
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<Signup />} />
          {/* <Route path="/forgotpass" element={<Profile/>} /> */}
          {/* <Route path="/category/:id" element={<Profile/>} /> */}
          <Route path="/postDetails/:id" element={<PostDetails />} />
          <Route path="/Createnewpost" element={<CreateNewpost />} />
          <Route path="/editpost/:id" element={<CreateNewpost />} />
          <Route path="/Profile/:id" element={<Profile />} />
          <Route path="/editprofile/:id" element={<Editinfo />} />
          {/* <Route path="/search" element={<Profile/>} /> */}

          {/* make recommended section with random number */}
          {/* make forgot pass */}
          {/* make edit posts  */}
          {/* make category page */}
          {/* make search page */}
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
