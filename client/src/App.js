import React from "react";
import Navbar from "./components/NavBar";
import "./App.css"

function App(){

  return (
    <div id="welcome">
      <div className="mb-5"><Navbar/></div>
      <br/><br/><br/>
      <h1 className="display-2 text-light text-center">Welcome!</h1> 
      <br/><br/>
      <p className="h4 text-light text-center">Register and/or log in to see your closet</p> 
      <br/><br/><br/><br/>
    </div>
  );
}

export default App;
