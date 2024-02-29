import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

//   لوگین کو سائین اپ کرنے کے بعد وہ نظر نہ ائے اس کے لئے یہ کوڈ ہے
  useEffect(()=>{
    const auth =localStorage.getItem('user');
    if(auth)
    {
      navigate('/')
    }
  })
  

  const  handleLogin = async () => {
    console.log("email, password", email, password);
    let result = await fetch('http://localhost:5000/login', {
      method: "POST",
      body: JSON.stringify({ email,password }),
      headers: {
        "Content-Type": "application/json"
      },
    });

    result = await result.json();
    console.log(result);
    
    //if(result.name){ after token we changed by auth
    if(result.name){
        localStorage.setItem("user", JSON.stringify(result));
        // localStorage.setItem("token", JSON.stringify(result.auth));
        navigate('/')
    } else{
        alert(" Plese Enter connet detiels ")
    }
    
  }

  return (
    <div>
      <input
        className="inputBox"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Email"
      />
      <input
        className="inputBox"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter Password"
      />
      <button onClick={handleLogin} type="button" className="sign-button">
        Login
      </button>
    </div>
  );
};

export default Login;
