import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import {Link} from 'react-router-dom'
import '../assets/table.css'

const Feedback = () => {
    const[feedback,setFeedback] = useState([])
    
    const getAllFeedback = async() =>{
        try{
         const token = sessionStorage.getItem('token');
         console.log("token",token)
         const response = await fetch("http://localhost:3099/api/feedback/getAllFeedback",{
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'Authorization':`${token}`,
            },
         });
         if(!response.ok){
            throw new Error("Failed to fetch users");
         }
         const json = await response.json();
         console.log(json);
         setFeedback(json.data)
         
        }catch(error){
           console.log("Error Fetching users:", error) 
        }
    }

    useEffect(()=>{
       getAllFeedback();
    },[])
  return (
   <>
   <Navbar />

   <div className="right container mt-4">
     <div className="p-2">
       <div className="d-flex searchDisplay">
         <div>
           <i className="fa-solid fa-magnifying-glass"></i>
         </div>

         <div>
           <input
             type="text"
             className="inputfield"
           ></input>
         </div>
       </div>
     </div>

     <button className="btn add-new m-4">
      <Link to="/addfeedback" style={{ textDecoration: 'none', fontWeight: 'bold' }}>Add New</Link>
    </button>

     <table className="table table-bordered">
       <tr>
         <th>Feeback_id</th>
         <th>Feedback_desc</th>
         <th>User_id</th>
         <th>Rating</th>
         <th></th>
       </tr>
      
      {feedback.length
         ?feedback.map((data:any, i) => {
           return (
             <tr key={i}>
               <td>{i}</td>
               <td>{data.feedback_desc}</td>
               <td>{data.user_id}</td>
               <td>{data.rating}</td>
               <td><Link to={`/monitorFeedback/${data.feedback_id}`}>
                  <i className="fa-solid fa-pen-to-square"></i>
                  </Link></td>
             </tr>
           )
         }) : "no Feedback"} 
         
     </table>
   </div>
 </>
    
  )
}

export default Feedback