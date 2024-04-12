import React, { useState, ChangeEvent, FormEvent } from "react";
//import axios from "axios";
import { useNavigate } from 'react-router-dom';
import '../assets/login.css';


const MyLogin: React.FC = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try{
    const response = await fetch("http://localhost:3099/api/user/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
  
   if(!response.ok) {
    throw new Error("Login failed");
   }
   const data = await response.json();
   const token = data.data;

   sessionStorage.setItem("token",token);
   navigate("/home");
  } catch(error){
    console.log('Login error',error);
  }
    // if (json.status===200) {
    //   localStorage.setItem('userEmail', credentials.email);
    //  // localStorage.setItem('token', json.authToken);
    //   navigate("/home");
    // } else {
    //   alert("Enter Valid Credentials");
    // }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prevState => ({ ...prevState, [name]: value }));
  };
  

  return (
    <div>
      <form className="login-form" onSubmit={onSubmitHandler}>
        <h3 className="p-2">Login</h3>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={credentials.email}
            onChange={onChange}
            name="email"
          />
          <div id="emailHelp" className="form-text text-white">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={credentials.password}
            onChange={onChange}
            name="password"
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default MyLogin;
