import React, { useEffect, useState } from 'react'
import axios from 'axios';

const AllUser = () => {
    const[mydata,setMyData] = useState([]);

    useEffect( () =>{
        axios
        .get("http://localhost:3099/api/user/viewAllUser")
        .then((res) =>{
            console.log(res)
            setMyData(res.data)})
             },[]);  
             
  return (
    <div>
        <h1>Show All User</h1>
        {/* {useData.map(data)=>{
            return(
                <div>{data.name}</div>
            )
        }} */}
    </div>
  )
}

export default AllUser