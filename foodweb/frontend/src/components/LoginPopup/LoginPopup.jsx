import React, { useContext, useEffect, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios  from 'axios';

const LoginPopup = ({ setShowLogin }) => {

  const {url,setToken} = useContext(StoreContext)

  const [currState, setCurrState] = useState("Login");
  const [data,setData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const handleOnChange = (e) =>{
    const name = e.target.name
    const value = e.target.value
    setData(data =>({
      ...data,
      [name]: value
    }))
  }

  const onLogin = async(e) =>{
    e.preventDefault()
    let newUrl = url;
    if(currState==="Login"){
      newUrl+= "/api/user/login"
    }
    else{
      newUrl +="/api/user/register"
    }

    const response = await axios.post(newUrl,data)

    if(response.data.success){
      setToken(response.data.token)
      localStorage.setItem("token",response.data.token)
      setShowLogin(false)
    }
    else{
      alert(response.data.message)
    }
  }


  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} />
        </div>
        <div className="login-popup-input">
          {currState === "Login" ? (
            <></>
          ) : (
            <input name="name" onChange={handleOnChange} value={data.name} type="text" placeholder="Your name" required />
          )}
          <input name="email" onChange={handleOnChange} value={data.email} type="email" placeholder="Your email" required />
          <input name="password" onChange={handleOnChange} value={data.password} type="password" placeholder="Password" required />
        </div>
        <button type="submit">{currState === "Sign Up" ? "Create account" : "Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p> By countinuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account? <span onClick={()=> setCurrState("Sign Up")}>Sign Up</span>
          </p>
        ) : (
          <p>
            Already have an account? <span onClick={()=> setCurrState("Login")}>Sign In</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
