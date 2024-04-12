import React, { useState,useEffect } from 'react'
import {Link,useLocation,useNavigate } from 'react-router-dom';
import '../assets/addUser.css';
import Navbar from './Navbar';
const MonitorFeedback = () => {
    const[feedback,setFeedback] = useState({ feedback_desc: "",
   user_id:"",
  rating: "",});

  const location = useLocation();
  const navigate = useNavigate();
  const inputHandler = (e:any) => {
    const { name, value } = e.target;
    setFeedback((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  const feedback_id = location.pathname.substring( location.pathname.lastIndexOf('/') + 1 )
 
 useEffect(() => {
    
    async function feedbackByIdFun(feedback_id:any) {
     
      try {
       
        const token = sessionStorage.getItem('token');
       
        let response = await fetch(`http://localhost:3099/api/feedback/getSingleFeedback?feedback_id=${feedback_id}`,{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `${token}`,
          }
          
        });

        let json = await response.json();
        console.log(json.data);
       
        setFeedback(json.data[0])
        
      } catch (error) {
        console.log(error);
      }
    }
    feedbackByIdFun(feedback_id);
  }, [feedback_id]);

  

  const onSubmitHandler = async(e:any) =>{
    try {
      const token = sessionStorage.getItem('token');
      console.log("Token", token)
      const response = await fetch(`http://localhost:3099/api/feedback/monitorFeedback/${feedback_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `${token}`,
        },
        body: JSON.stringify(feedback),
      });
      const json = await response.json();
      console.log(json);
      navigate("/feedback");
    } catch (error) {
     
      console.log(error);
    }
  };
  

  return (
    <>
    <Navbar/>
            <div className='right'>

            <div className='p-2'>
              <Link to='/home'><i className="fa-solid fa-arrow-left"></i></Link> <strong>Edit Feedback</strong>
           </div>
         
         <div className='d-flex p-2 container flexSection'>
         <div className='p-2'>
              <label>Feedback_description</label><br></br>
              <input type='text' name='feedack_desc'  defaultValue={feedback.feedback_desc} onChange={inputHandler}></input>
           </div>
          
            <div className='p-2'>
              <label>User_id</label><br></br>
              <input type='number' name='user_id' defaultValue={feedback.user_id} onChange={inputHandler}></input>
           </div>
    
           <div className='p-2'>
           <label>Rating</label><br></br>
              <input type='number' name='rating' defaultValue={feedback.rating} onChange={inputHandler}></input>
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

export default MonitorFeedback