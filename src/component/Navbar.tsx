import { Link ,useNavigate} from 'react-router-dom';
import '../assets/navbar.css'


const Navbar = () => {
    
        // let history = useHistory();
        const navigate = useNavigate();
        const handleLogout = () => {
           
           localStorage.removeItem('token');
             navigate('/')
        //   history.push('/login'); // Assuming '/login' is your login route
        };
    
  
  return (
    <>
<nav className="navbar navabr-background">

  <div className="container-fluid">
    <Link  to='/homepage' className="navbar-brand" style={{color: 'white'}}>Navbar</Link>
     
    <form className="d-flex" role="search">
        <div className='p-2 navnar-route'>
            <Link to='/home' style={{textDecoration:"none",color:"white"}}>User</Link>
        </div>

        <div className='p-2 navnar-route'>
            <Link to='/feedback'  style={{textDecoration:"none",color:"white"}}>Feedback</Link>
        </div>
      <button  onClick={handleLogout}>LogOut</button>
    </form>
  </div>
</nav>

    </>
  )
}

export default Navbar