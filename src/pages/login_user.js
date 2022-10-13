import React,{useEffect,useState} from "react";
import logo1 from "../images/ez_logo.png"
import logo2 from "../images/ez_logo.png"
import "../css/login.css"
import {Link,useNavigate} from 'react-router-dom';
import imgleft from '../images/loginleftdesign1.png';
import imgright from '../images/loginrightdesign2.png';
import "@fontsource/montserrat";
import Button from 'react-bootstrap/Button';
import { MDBCheckbox } from 'mdb-react-ui-kit';
import Footer from './footer';
import Headerr from './header';
import { setNestedObjectValues, useFormik } from 'formik';
import * as yup from 'yup';
import usePasswordToggle from "../hooks/pass_toggle_recovery";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye} from '@fortawesome/free-solid-svg-icons'
import Axios from 'axios';
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



import RecoveryPagePopup from '../Modals/RecoveryPagePopup';

import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import MetaTags from 'react-meta-tags';

export default function UserLogin() {
  //sneha 
 var Status=0;
  //sneha
  let navigate = useNavigate();


  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

function errortoast(){
  toast.error('Account Has been blocked! Contact Administrator for further details.', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  
    });
    
}



  const login1 = async event => {

    toast.success("Logging you in now", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true, 
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      icon: {faTriangleExclamation},
    
    }
  
  ); 
  
  await delay(3000);

console.log('after');

navigate("/appointment")
  }

  const login2 = async event => {

    toast.success("Logging you in now", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true, 
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      icon: {faTriangleExclamation},
    
    }
  
  ); 
  
  await delay(3000);

console.log('after');

navigate("/reset_password")
  }

  
  const [PasswordInputType, ToggleIcon] =  usePasswordToggle();
  const [isModalActive, setIsModalActive] = useState(false);
  const [messageType, setMessageType] = useState("failurePopup");
  const [popupText,setPopupText] =useState("User ID is successfully sent to your registered Email-ID");



  function handleClick() {

toast.warning("Logging U IN", {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true, 
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  icon: {faTriangleExclamation},

});

  }

  const[uusername, setusername]= useState('');
  const[upassword, setpassword]= useState('');
  const[ulocation, setlocation]= useState('');
  
  const[loginstatus,setLoginStatus] = useState(""); 

  const[fulldata,setfulldata] = useState([]);


  const [count, setcount] = useState(0);
 
  // function errortoast(){
  //   toast.error("Account Has been blocked! Contact Administrator for further details.", { 
  //     position: "top-right",   
  //        autoClose: 2000,     
  //        hideProgressBar: false,    
  //       closeOnClick: true,      
  //        pauseOnHover: true,    
  //         draggable: true,    
  //       progress: undefined,
    
  //     }); 
  // }

  function errorlogin(){
    toast.error("Incorrect Username/Password", { 
      position: "top-right",   
         autoClose: 2000,     
         hideProgressBar: false,    
        closeOnClick: true,      
         pauseOnHover: true,    
          draggable: true,    
        progress: undefined,
    
      }); 
  }

  function errorlogin1(){
    toast.error("You have only 2 attempts", {
     position: "top-right",
     autoClose: 2000,
     hideProgressBar: false,
    closeOnClick: true,
     pauseOnHover: true,
      draggable: true,
    progress: undefined,
     } );
  }

  function login4(){
    toast.error("Not Registered User", {    
     position: "top-right",   
     autoClose: 2000,     
     hideProgressBar: false,    
    closeOnClick: true,      
     pauseOnHover: true,    
      draggable: true,    
    progress: undefined,        
     } );    
}

  function errorlogin2(){
    toast.error("You have only 1 attempts", {
     position: "top-right",
     autoClose: 2000,
     hideProgressBar: false,
    closeOnClick: true,
     pauseOnHover: true,
      draggable: true,
    progress: undefined,
     } );
    }
    function login4(){
      toast.error("UserId not registered", {    
       position: "top-right",   
       autoClose: 2000,     
       hideProgressBar: false,    
      closeOnClick: true,      
       pauseOnHover: true,    
        draggable: true,    
      progress: undefined,        
       } );    
  }

  useEffect(()=>{ if(count>=3) { errortoast();
    print(Status=1);
  } }, [count]);
  useEffect(()=>{ if(count==2) { errorlogin2(); } }, [count]);
  useEffect(()=>{ if(count==1) { errorlogin1(); } }, [count]);
  function print(data) {
    console.log(data);
    console.log(window.local);
    const log=window.local;
    
    if(data===1){
      Axios.post('http://localhost:3001/updatestatus', {log}).then((response3)=>
  {
    if(response3.data.message == "Blocked"){
         console.log("success");
    }
  });
    }
  }
  

const validate=()=>{
  if(count>=3){
   return true;
  }
  else{
    return false;
  }
  }
 

  

  const formik=useFormik({
    initialValues:{
      username:'',
      password:'',
      location:'',
    },

    validationSchema: yup.object({
      username: yup.string()
        .min(6, 'User Id must be minimum 6 characters')
        .matches(/^[a-zA-Z0-9.]*$/, 'Username Name should not contain numbers or any special characters')
        .required('Please Enter Username'),

        password: yup.string()
        .required('Please Enter Password')
        .min(8, 'User Id must be minimum 8 characters')
        .max(16, 'User Id cannot be more than 16 characters'),
        // .matches(/^(?=.*[^a-zA-Z]).{8,40}$/, 'First Name should not contain numbers or any special characters')
      
      location: yup.string()
        .required('Please select location from dropdown')

    }),

    onSubmit:values=>{
      const a= {...formik.getFieldProps("username")}
      const b={...formik.getFieldProps("password")}
      const c={...formik.getFieldProps("location")}
      const loginid = a.value;
      const password = b.value;
      const location = c.value;
     
     window.local=loginid;
      
      // alert(a.value+b.value)
      console.log(loginid+password)
      // alert(uusername+upassword+ulocation)
      Axios.post('http://localhost:3001/userlogin', {loginid}).then((response)=>{  //a post axios request to send the info into the backend (we are sending it to the api having url 3001)
      if(response.data.message === "Old")
      {     
        
          Axios.post('http://localhost:3001/userlogin/old', {loginid,password,location}).then((response1)=>{
  //a post axios request to send the info into the backend (we are sending it to the api having url 3001)
          if(response1.data.message){
            
            setLoginStatus(response1.data.message);
            setcount(setcount=> setcount+1);
            //alert("Wrong Username/Password/Loacation");
            errorlogin();
            
          }else{
            // alert("Successfully login");
            setcount( 0);
            login1();

            // navigate("/appointment");
          }
        });
      }


      if(response.data.message === "New")
      {
        
        Axios.post('http://localhost:3001/userlogin/new', {loginid,password,location}).then((response2)=>{  //a post axios request to send the info into the backend (we are sending it to the api having url 3001)
          if(response2.data.message){
            setLoginStatus(response2.data.message);
            
          }else{
            // alert("Successfully login");
            login2();
            // navigate("/reset_password");
          }
        });

      }
      if(response.data.message === "UserId Is wrong"){
       
        login4();
      }
      
      

    });
      // navigate("/appointment");
      
      
      //sneha doing 
    
      
      
   
    }   

  });


  
  return (
<>
    <h1>



    <MetaTags>
            <title>Page 1</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          </MetaTags>

<Headerr/>
<ToastContainer 

position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
{/* <RecoveryPagePopup messageType={messageType} isModalActive={isModalActive} popupText={popupText} handleClick={handleClick} /> */}

<div className='body1'>

<div className='logoleft' >
<img className='ezppaylogo' src={logo2} alt="ezppaybigbodylogo"/>
</div>
{/* <div className='form-group'></div> */}
<div className='rightbody'>
<div class="btn-group" style={{width: '100%',padding: '5px'}} >
<Link to="/login_user" style={{width:'100%'}}><button className='userloginn'>User</button></Link>
<Link to="/login_patient" style={{width:'100%'}}><button className='patientloginn'>Patient</button>

</Link>
</div>
<div className='form-group'>
<p className='linetab'></p></div>
<div className='form-group'>
<div className='designleft'>
<img src={imgleft} className='designleft'/>
</div>

<div className='signintotext'>
<p className='signintotext'>Sign-In To Your Ezppay Account</p>
</div>
<div className='designright'>

<img src={imgright}  className='designright'></img>
</div>
</div>

<form className='formPatient' onSubmit={formik.handleSubmit}>

{/* UserName TextBox */}
<div class="form-group">
<label className='labelpassword'>User ID</label>
<input type="text"  class="form-control"placeholder="Eg. abc" name="username" {...formik.getFieldProps("username")} disabled={validate()}></input>
     {formik.touched.username && formik.errors.username ? <span className='span1'>{formik.errors.username}</span> : null}
</div>

{/* Password TextBox */}
<div class="form-group">
<label className='labelpassword'>Password</label>
<input type={PasswordInputType}   class="form-control"placeholder="Eg. 123xyz" name="password" {...formik.getFieldProps("password")} disabled={validate()}></input>
<span className='password-toggle-icon'>{ToggleIcon}</span>
     {formik.touched.password && formik.errors.password ? <span className='span1'>{formik.errors.password}</span> : null}
</div>

{/* Location DropDown */}
<div class="form-group">
<label className='labelpassword'>Location</label>


<select class="form-select"  name="location" id="location" {...formik.getFieldProps("location")} disabled={validate()}>  
<option >Select your option  </option>
  <option value="Radiology">Radiology </option>
  <option value="Gastroenterology">Gastroenterology</option>
  <option value="OB/GYN">OB/GYN</option>
  <option value="Endocrinology">Endocrinology</option>
                        
 </select>




{formik.touched.location && formik.errors.location ? <span className='span1'>{formik.errors.location}</span> : null}
</div>

{/* Remember Me Checkbox */}

<div class="form-group" style={{fontSize: '14px', paddingTop: '3%'}}>


<input class="redinput"  type="checkbox" /> <label className='labelpassword123'>Remember Me?</label>
 </div>
 <div class="form-group1">
<button class='signinbutton1' disabled={validate()}>
Sign In
</button>
</div>

{/* Forgot Username / Password  */}

 <div class="form-group1">


 <label className='signuplink'> Forgot <a href='/UserNameRecovery' className='usernameblue' > Username</a>  or <a href='/passwordrecoveryold' className='usernameblue' > Password </a>  ? </label>                          

     </div>             
</form>
</div>

</div>
<div>

</div>

   <Footer/>

 
    </h1>

</>

    
  )
}