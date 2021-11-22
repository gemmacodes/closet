import React from "react";
import Navbar from "./components/NavBar";

function App(){

  return (
    <div>
      <div className="mb-5"><Navbar/></div>
      <br/><br/>
      <h1 className="display-2 text-center">Welcome!</h1> 
      <br/><br/>
      <p className="h4 text-center">Register and/or log in to see your closet</p> 
    </div>
  );
}

export default App;
