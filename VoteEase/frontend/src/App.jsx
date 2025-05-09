import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AdminHome from './Admin/AdminHome';
import AdminLoginPage from './Admin/AdminLoginPage';
import AdminSignup from './Admin/AdminSignup';
import CreateContestant from './Admin/CreateContestant';
import CreatePoll from './Admin/CreatePoll';
import Results from './Admin/Results';
import ViewPoll from './Admin/ViewPoll';
import Header from './Header';
import HomePage from './HomePage';
import { UserContextProvider } from './UserContext.jsx';
import VoterLoginPage from './Voter/VoterLoginPage';
import VoterSignup from './Voter/VoterSignup';
import Voterhome from './Voter/Voterhome';
import VotingPage from './Voter/VotingPage';
import ViewContestants from './Admin/ViewContestants.jsx';
import ProcessRequests from './Admin/ProcessRequests.jsx';
import RequestPoll from './Voter/RegisterPoll.jsx';
import RegisterPoll from './Voter/RegisterPoll.jsx';
import ViewIdProof from './Admin/ViewIdProof.jsx';
import EditVoterAccount from './Voter/EditVoterAccount.jsx'
import EditAdminAccount from './Admin/EditAdminAccount.jsx';
import VerifyFace from './Voter/VerifyFace.jsx';
function App() {
  return (
    <UserContextProvider>
      
       <Router>
       <Header/> 
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/voterlogin' element={<VoterLoginPage />} />
          <Route path='/adminlogin' element={<AdminLoginPage />} />
          <Route path='/adminsignup' element={<AdminSignup />} />
          <Route path='/votersignup' element={<VoterSignup />} />
          <Route path='/voterhome' element={<Voterhome />} />
          <Route path='/adminhome' element={<AdminHome />} />
          <Route path='/create-poll' element={<CreatePoll />} />
          <Route path='/create-contestant' element={<CreateContestant />} />
          <Route path='/adminhome/view-results' element={<Results />} />
          <Route path='/adminhome/view-poll' element={<ViewPoll />} />
          <Route path='/voter/votingpage' element={<VotingPage/>}/>
          <Route path='/adminhome/view-poll/viewcontestants' element={<ViewContestants/>}/>
          <Route path='/adminhome/process_requestes' element={<ProcessRequests/>}/>
          <Route path='voter/registerpoll' element={<RegisterPoll/>}/>
          <Route path="/adminhome/process_requests/view_file" element={<ViewIdProof />} />
          {/* <Route path="/voter/edit-account/:id/" element={<EditVoterAccount />} />
          <Route path="/admin/edit-account/:id/" element={<EditAdminAccount />} /> */}
          <Route path="/voter/edit-account/:id" element={<EditVoterAccount />} />
          <Route path="/admin/edit-account/:id" element={<EditAdminAccount />} />
          <Route path="/voter/verify_face" element={<VerifyFace/>}/>

          </Routes>
      </Router>
      </UserContextProvider>
     
  );
}

export default App;
