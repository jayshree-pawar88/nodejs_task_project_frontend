import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import { Link } from "react-router-dom";
import '../assets/table.css'


const Home = () => {
  const [input, setInput]= useState("");
  const [deleteId, setDeleteId] = useState("");
  const [user, setUsers] = useState([]);



  const getAllUsers = async () => {
    try {
      const token = sessionStorage.getItem('token');
      console.log("Token", token)
      const response = await fetch("http://localhost:3099/api/user/viewAllUser", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const json = await response.json();
      console.log("json", json);
      setUsers(json.data);
    } catch (error) {
      console.log('Error fetching users:', error);
      
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  // const onChange = (e:any) =>{
  //    setInput(e.target.value)
  // }

  // const onSearch = (searchTerm:any)=>{
  //   getAllUsers();
  //   console.log("serach", searchTerm)
  // }

 
  const deleteHandler = async (deleteId:any) => {
   
    console.log(typeof deleteId)
    try {
      
      const token = sessionStorage.getItem('token');
      console.log("Token", token)
      const response = await fetch(`http://localhost:3099/api/user/deleteUser?user_id=${deleteId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
      });
      const json = await response.json();
      if (!response.ok) {
        console.error('Error deleting User:', json);
      } else {
        setUsers((prevUsers) => prevUsers.filter((user_id) => json.data.user_id !== deleteId));
        getAllUsers();
        console.log('User deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting User:', error);
    }
  };

  const handleDeleteId = (deleteId:any) => {
    console.log(deleteId)
    setDeleteId(deleteId);
    deleteHandler(deleteId); 
  };

  

  return (
    <>
      <Navbar />

      <div className="right container mt-4">
        <div className="p-2">
          <div className="d-flex searchDisplay">
            
            <div>
              <input
                type="text"
                className="inputfield" value={input}
              ></input>
            </div>
            <div>
              <button><i className="fa-solid fa-magnifying-glass"></i></button>
            </div>
          </div>

          <button className="btn add-new m-4">
            <Link to="/addUser" style={{ textDecoration: 'none', fontWeight: 'bold' }}>Add New</Link>
          </button>
        </div>

        <table className="table table-bordered">
          <tr>
            <th>User Id</th>
            <th>Name</th>
            <th>Role Id</th>
            <th>Email</th>
            <th></th>
            <th></th>
          </tr>
          {/* <br></br> */}

          {user.length
            ? user.map((data: any, i) => {
              return (
                <tr key={i}>
                  <td>{i}</td>
                  <td>{data.name}</td>
                  <td>{data.role_id}</td>
                  <td>{data.email}</td>
                  <td><Link to={`/editUser/${data.user_id}`}>
                  <i className="fa-solid fa-pen-to-square"></i>
                  </Link></td>

                  <td>
                  <span style={{ backgroundColor: "rgb(233, 200, 233)" }}>

                     <button  onClick={() =>{
                     handleDeleteId(data.user_id)
                     }}><i
                        className="fa-solid fa-trash-can"
                        style={{ color: "black" }}
                      ></i>
                    </button>
                  </span>
                  </td>
                </tr>
              )
            }) : "no user"}
            
        </table>
      </div>
    </>
  )
}

export default Home