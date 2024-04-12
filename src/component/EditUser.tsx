import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import {Link,useNavigate, useLocation } from 'react-router-dom';
import '../assets/addUser.css';

const EditUser = () => {

  const[user,setUser] = useState({ name: "",
  role_id:"",
  email: "",
  password: "",});

  const location = useLocation();
 
  const inputHandler = (e:any) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  const user_id = location.pathname.substring( location.pathname.lastIndexOf('/') + 1 )
 
 useEffect(() => {
    
    async function userByIdFun(user_id:any) {
     
      try {
       
        const token = sessionStorage.getItem('token');
       
        let response = await fetch(`http://localhost:3099/api/user/getUser?user_id=${user_id}`,{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `${token}`,
          }
          
        });

        let json = await response.json();
        console.log(json.data);
       
        setUser(json.data[0])
        // setUser({
        //   name: userById.name || "",
        //   role_id: userById.role_id || "",
        //   email: userById.email || "",
        //   password: userById.password || ""
        // })
      } catch (error) {
        console.log(error);
      }
    }
    userByIdFun(user_id);
  }, [user_id]);

  const navigate = useNavigate();

  const onSubmitHandler = async(e:any) =>{
    try {
      const token = sessionStorage.getItem('token');
      console.log("Token", token)
      const response = await fetch(`http://localhost:3099/api/user/editUser/${user_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `${token}`,
        },
        body: JSON.stringify(user),
      });
      const json = await response.json();
      setUser(json.data)
      console.log(json);
      navigate("/home");
    } catch (error) {
     
      console.log(error);
    }
  };
  

  return (
    <>
    <Navbar/>
    
            <div className='right'>

            <div className='p-2'>
              <Link to="/home"><i className="fa-solid fa-arrow-left"></i></Link><strong>Edit User</strong>
           </div>
         
         <div className='d-flex p-2 container flexSection'>
        
            <div className='p-2'>
              <label>Name</label><br></br>
              <input type='text' name='name' defaultValue={user.name} onChange={inputHandler}></input>
           </div>
    
           <div className='p-2'>
           <label>Role id</label><br></br>
              <input type='number' name='role-id' defaultValue={user.role_id} onChange={inputHandler}></input>
           </div> 
           </div>

    
           <div className='d-flex p-2 container flexSection'>
           <div className='p-2'>
           <label>Email</label><br></br>
              <input type='email' name='email' defaultValue={user.email} onChange={inputHandler}></input>
           </div>

           <div className='p-2'>
              <label>Password</label><br></br>
              <input type='password' name='password' defaultValue={user.password} placeholder='password' onChange={inputHandler}></input>
           </div>
           </div>

           <div className='buttonWrapper'>
         <button className='cancleButton'>
         <Link to="/home">Cancle</Link>
         </button>
         <button className='saveButton' onClick={onSubmitHandler}>Save</button>
        </div>

        </div>
    </>
  )
}

export default EditUser