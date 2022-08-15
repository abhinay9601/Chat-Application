import "bootstrap/dist/css/bootstrap.min.css";
// import "./custome.scss";
import Login from "./components/Login";
// import } from "react-dom";
import {
  BrowserRouter as Router,
  
  Routes,
  Route,
} from "react-router-dom";
import Register from "./components/Register";
import ForgetPassword from "./components/ForgetPassword";
import React from "react";
import Dashboard from "./components/Dashboard";
function App() {
  return (
    <React.Fragment>
      {/* <Register></Register>
      <Login></Login> */}
      
      <Router>
        <Routes>
          <Route exact path="/" element={<Login/>}/>
          <Route exact path="/register" element={<Register />}/>
          <Route exact path="/forget-password" element={<ForgetPassword/>}/>
          <Route exact path="/dashboard" element={<Dashboard />}/>

          {/* <Route path="*" element={<NotFound/>}/> */}
        </Routes>
    </Router>
    </React.Fragment>
  );
}

export default App;
