import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserLogin from "./pages/login_user";
import Loginpatient from "./pages/login_patient";
import PasswordRecovery from './pages/passwordRecovery';
import NewUserAdd from './pages/settings/NewUserAdd';
import ViewUserDetails from './pages/settings/viewUserDetails';
import PasswordRecoveryOld from './pages/PasswordRecoveryOld';
import {  BrowserRouter,  Routes,  Route} from "react-router-dom";
import UserNameRecovery from './pages/UserNameRecovery';
import Resetpassword from './pages/reset_password';
import Appointments from './pages/appointments';
import Headerr from './pages/header';
import Headernew from "./components/loginheader";
import Footer from './pages/footer';
import "@fontsource/montserrat";
import Unlockuser from './pages/unlockuser';
import CurrentDateTime from './navigation/currentDateTime';
import NavMenu from './navigation/navMenu';
import React,{useEffect,useState} from "react";
import Userlist from './components/userlist';

  /* FOR BACKEND TEAM
  
  There are two types of alert messages, success and alert.

  When the server gives a positive response , please use setMessageType('successPopup') as a prop

  else use setMessageType('failurePopup'); above for ur alert box colours to change.
  

  Also to send custom text, use setPopupText state variable with text attached.


  */

  /* REACT TOASTIFY CODE USAGE

  
export const showToast = ( type = "success", msg, autoClose = 2000, className = "primaryColor", position = defaultPosition ) => {
  if (type === "success") {
    toast.success(msg, {
      autoClose: autoClose === null ? 2000 : autoClose,
      className: className === null ? "primaryColor" : className,
      position: position,
    });
  } else if (type === "error") {
    toast.error(msg, {
      autoClose: autoClose === null ? 2000 : autoClose,
      className: className === null ? "dangerColor" : className,
      position: position,
    });
  }
};


// How to use react-toastify
showToast('success', 'Product add to cart successfully !');

showToast('error', 'Please fill the inputs properly.');


  */







window.u_id = 'sss';
var role='nurse';

function App() {
  function Userlogin1() {
    return (
      <>
      <Headerr/>
        <UserLogin />
        <Footer />
      </>
    )
  }

  function Patientlogin1() {
    return (
      <>
      <Headerr/>
       <Loginpatient/>
        <Footer />
      </>
    )
  }
  function UserList1(){
    return(
      <>
       <NavMenu role1={role}/>
      <div class="totalmargin"><Userlist/></div>
      </>
    )
  }

  function Appointments1(){
    return(
      <>
       <NavMenu role1={role}/>
      <Appointments/>
      </>
    )
  }

  function NewUserAdd1(){
    return(
      <>
       <NavMenu role1={role}/>
      <NewUserAdd/>
      </>
    )
  }

  function ViewUserDetails1(){
    return(
      <>
       <NavMenu role1={role}/>
      <ViewUserDetails/>
      </>
    )
  }

  return (<>
<div >
 <Headernew/>
</div>
    <div >
     
    <BrowserRouter>
    <Routes>
      {
       role=== 'nurse'? <>
    <Route path="/appointments" element={<Appointments1/>} />
    <Route path="/login_user" element={<Userlogin1/>} />
    <Route path="/login_patient" element={<Patientlogin1/>} />
    <Route path="/passwordrecoveryold" element={<PasswordRecoveryOld/>} />
    <Route path="/passwordrecovery" element={<PasswordRecovery/>} />
    <Route path="/reset_password" element={<Resetpassword/>}/>
    <Route path ="/UserNameRecovery" element={<UserNameRecovery/>}/>

        </> :
         <Route path="/login_user" element={<Userlogin1/>} />
      }
       {
       role=== 'admin'? <>
    <Route path="/appointments" element={<Appointments1/>} />
    <Route path="/unlockuser" element={<UserList1/>} />
    <Route path ="/NewUserAdd" element={<NewUserAdd1/>}/>
    <Route path ="/viewUserDetails" element={<ViewUserDetails1/>}/>
    <Route path="/login_user" element={<Userlogin1/>} />
    <Route path="/login_patient" element={<Patientlogin1/>} />
    <Route path="/passwordrecoveryold" element={<PasswordRecoveryOld/>} />
    <Route path="/passwordrecovery" element={<PasswordRecovery/>} />
    <Route path="/reset_password" element={<Resetpassword/>}/>
    <Route path ="/UserNameRecovery" element={<UserNameRecovery/>}/>

        </> :
         <Route path="/login_user" element={<Userlogin1/>} />
      }
       {
       role=== 'front.office'? <>
    <Route path="/appointments" element={<Appointments1/>} />
    <Route path="/login_user" element={<Userlogin1/>} />
    <Route path="/login_patient" element={<Patientlogin1/>} />
    <Route path="/passwordrecoveryold" element={<PasswordRecoveryOld/>} />
    <Route path="/passwordrecovery" element={<PasswordRecovery/>} />
    <Route path="/reset_password" element={<Resetpassword/>}/>
    <Route path ="/UserNameRecovery" element={<UserNameRecovery/>}/>

        </> :
         <Route path="/login_user" element={<Userlogin1/>} />
      }
       {
       role=== 'back.office'? <>
    <Route path="/appointments" element={<Appointments1/>} />
    <Route path="/login_user" element={<Userlogin1/>} />
    <Route path="/login_patient" element={<Patientlogin1/>} />
    <Route path="/passwordrecoveryold" element={<PasswordRecoveryOld/>} />
    <Route path="/passwordrecovery" element={<PasswordRecovery/>} />
    <Route path="/reset_password" element={<Resetpassword/>}/>
    <Route path ="/UserNameRecovery" element={<UserNameRecovery/>}/>

        </> :
         <Route path="/login_user" element={<Userlogin1/>} />
      }

    {/* <Route path ="/navMenu" element={<NavMenu/>}/> */}
    
    </Routes>
    </BrowserRouter>
    </div>
    <div >
  <Footer/>
</div>
    </>
  );
}

export default App;
