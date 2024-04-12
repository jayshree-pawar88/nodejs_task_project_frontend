import './App.css';
import MyLogin from './component/Login';
import Home from './component/Home';
import AllUser from './component/AllUser';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import EditUser from './component/EditUser';
import AddUser from './component/AddUser';
import Feedback from './component/Feedback';
import AddFeedback from './component/AddFeedback';
import MonitorFeedback from './component/MonitorFeedback';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
         <Route path='/addUser' element={<AddUser/>}/>
         <Route path="/" element={<MyLogin/>}/>
         <Route path="/home" element={<Home/>}/>
         <Route path='/editUser/:id' element={<EditUser/>}/>
         <Route path='/addUser' element={<AddUser/>}/>
         <Route path='/allUser' element={<AllUser/>}/>
         <Route path='/feedback' element={<Feedback/>}/>
         <Route path='/addfeedback' element={<AddFeedback/>}/>
         <Route path='/monitorFeedback/:id' element={<MonitorFeedback/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
