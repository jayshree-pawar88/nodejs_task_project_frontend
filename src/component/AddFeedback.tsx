import React, { useState } from 'react'
import Navbar from './Navbar'
import { Link, useNavigate } from 'react-router-dom'

const AddFeedback = () => {
    const feedbackData = {
        feedback_desc: "",
        user_id: "",
        rating: "",
      };

      const[feedback, setFeedback] = useState(feedbackData);

      const navigate = useNavigate();

      const inputHandler = (e:any) =>{
        const{name,value} = e.target;
        setFeedback((prevfeedback)=>({
            ...prevfeedback,[name]:value,
        }));
      }

      const onSubmitHandler = async(e:any) =>{
        e.preventDefault();
        try{

            const token = sessionStorage.getItem('token');
            console.log("token",token);
            const response = await fetch("http://localhost:3099/api/feedback/feedback",{
                method : 'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Autorization':`${token}`,
                },
                body:JSON.stringify(feedback)
            });
            const json = await response.json();
            console.log(json);
            setFeedback(feedbackData);
            navigate('/feedback')

        }catch(error){
            console.log(error);
        }
      }
  return (
    <>
   <div>
   <Navbar/>
   </div>
            <div className='p-2'>
              <Link to='/feedback'><i className="fa-regular fa-user"></i></Link> <strong>Add Feedback</strong>
           </div>
         
         <div className='d-flex p-2 container flexSection'>
          
            <div className='p-2'>
              <label>Feddback_desc</label><br></br>
              <input type='text' name='feedback_desc' value={feedback.feedback_desc} onChange={inputHandler}></input>
           </div>
    
           <div className='p-2'>
           <label>user_id</label><br></br>
              <input type='number' name='user_id' value={feedback.user_id} onChange={inputHandler}></input>
           </div> 
           <div className='p-2'>
           <label>Rating</label><br></br>
              <input type='number' name='rating' value={feedback.rating} onChange={inputHandler}></input>
           </div> 
           </div>


           <div className='buttonWrapper'>
         <button className='cancleButton'>
         <Link to="/">Cancle</Link>
         </button>
         <button className='saveButton' onClick={onSubmitHandler}>Save</button>
        </div>
   </>
  )
}

export default AddFeedback;