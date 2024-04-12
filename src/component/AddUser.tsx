import React, { useState, useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom';
import Navbar from './Navbar';
import '../assets/addUser.css'

const AddUser = () => {
  const userData = {
    name: "",
    role_id: "",
    email: "",
    password:"",
  };
  const [user, setUser] = useState(userData);

  const navigate = useNavigate();

  const inputHandler = (e:any) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  const onSubmitHandler = async(e:any) =>{
    e.preventDefault();
  try {

    const token = sessionStorage.getItem('token');
    console.log("token",token)
    const response = await fetch("http://localhost:3099/api/user/addUser", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`,
    }, 
    body: JSON.stringify(user)
  });
  const json = await response.json();
  console.log(json);
  setUser(userData);
navigate('/home')

  } catch (error) {
    console.log(error);
  }
    
  }
  return (
   <>
   <div>
   <Navbar/>
   </div>
            <div className='p-2'>
              <Link to='/product'><i className="fa-regular fa-user"></i></Link> <strong>Add User</strong>
           </div>
         
         <div className='d-flex p-2 container flexSection'>
          
            <div className='p-2'>
              <label>Name</label><br></br>
              <input type='text' name='name' value={user.name} onChange={inputHandler}></input>
           </div>
    
           <div className='p-2'>
           <label>Role_id</label><br></br>
              <input type='number' name='role_id'  value={user.role_id} onChange={inputHandler}></input>
           </div> 
           </div>

    
           <div className='d-flex p-2 container flexSection'>

           <div className='p-2'>
              <label>Email</label><br></br>
              <input type='email' name='email' placeholder='email' value={user.email} onChange={inputHandler}></input>
           </div>

           <div className='p-2'>
              <label>Password</label><br></br>
              <input type='password' name='password' value={user.password} placeholder='password' onChange={inputHandler}></input>
           </div>
          
           </div>

           <div className='buttonWrapper'>
         <button className='cancleButton'>
         <Link to="/home">Cancle</Link>
         </button>
         <button className='saveButton' onClick={onSubmitHandler}>Save</button>
        </div>
   </>
  )
}

export default AddUser