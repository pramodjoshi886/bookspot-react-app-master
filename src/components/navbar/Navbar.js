import React,{useState} from "react";
import "../../App";
import { Link } from "react-router-dom";
import { logout } from "../../service/auth.service";
import { useNavigate } from "react-router-dom";


const Navbar = () => {

  const navigate = useNavigate();

  const hanleLogout = ()=>{
    sessionStorage.removeItem("userId");
    navigate('/')
  };
  return (
    <div className="navbar">  
      <div>
        <Link to="/booklist">
        <h1 style={{color:'white'}}>Bookspot</h1>
        </Link>
      </div>
      <div style={{display:"flex"}}>
        <Link to="/favorites">
          <h3 style={{color:'white'}}>Your Favorites</h3>
        </Link>
        <Link to="/recommended">
          <h3 style={{color:'white', marginLeft:30}}>Recommended</h3>
        </Link>
        {/* <h3 style={{ color: "white" ,  marginLeft:30}}>Categories</h3> */}
      </div>
      <div>
        <button style={{right:0, width:80}}onClick={hanleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
