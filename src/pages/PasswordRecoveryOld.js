
import React,{useEffect, useState} from "react";
import {useNavigate}from "react-router-dom";
import '../css/Recovery.css';
import Footer from './footer';
import Headerr from './header';
import Axios from 'axios';
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faCoffee } from '@fortawesome/free-solid-svg-icons'
//import logo1 from "../images/ez_logo.png"
//import logo2 from "../images/ez_logo.png"
function PasswordRecoveryOld() {

  const[uid, setuid]= useState('');

  const navigate=useNavigate();

  function login2(){
    toast.error("User ID not exists", {    
     position: "top-right",   
     autoClose: 2000,     
     hideProgressBar: false,    
    closeOnClick: true,      
     pauseOnHover: true,    
      draggable: true,    
    progress: undefined,        
     } );    
}

  
//   const element = <FontAwesomeIcon icon={faCoffee} />
  function handleClick1(){
    Axios.post('http://localhost:3001/passwordrecovery/uid/', {uid:uid}).then((response)=>{  //a post axios request to send the info into the backend (we are sending it to the api having url 3001)
    if(response.data.message){
      login2();
    }
    else{
      navigate("/passwordrecovery")
    }
    
    });
   // navigate("/passwordrecovery")
    
}
return (
   <>
   <h1>
   <Headerr/>
 <ToastContainer/>
   <div className="username_recovery_form">
    
    <div className='username_recovery_heading'>Password Recovery</div>
    {/* <div className="username_recovery_subheading">Please enter the registered Email-Id</div> */}
    {/* <hr className='hr'></hr> */}
    <div className='partition_line'></div>
 
 <div className="username_recovery_form_field">
 <label className="username_recovery_label" >User ID</label>
    <input  className="username_recovery_input" type="text" placeholder="Eg.abc"   onChange={(e)=>{
        setuid(e.target.value)    
        //basically we are setting our state when ever we make changes to our input
      }}/>
 
 </div>
   
    <button className="btnemail"  onClick={handleClick1}>Next</button>
 
  </div>
  </h1>
  <Footer/>
   </>
 
 )
}
export default PasswordRecoveryOld;