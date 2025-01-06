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
        </Routes>
      </Router>
      </UserContextProvider>
     
  );
}

export default App;
