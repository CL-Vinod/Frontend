import React,{useEffect, useState} from "react";
import  "../css/passwordrec.css"
import Footer from './footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Headerr from './header';
import {Link,useNavigate} from 'react-router-dom';
import logo1 from "../images/ez_logo.png"
import logo2 from "../images/ez_logo.png"
import {Button} from 'react-bootstrap/Button';
import imgleft from '../images/loginleftdesign1.png';
import imgright from '../images/loginrightdesign2.png';
import { useFormik } from 'formik';
import * as yup from 'yup';
import usePasswordTogglerec from '../hooks/pass_toggle_recovery';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';


import Axios from 'axios';
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import  {faE, faEye,faEyeSlash,faCircleInfo} from '@fortawesome/free-solid-svg-icons';
function PasswordRecovery() {



  let navigate = useNavigate();


  const [PasswordInputType, ToggleIcon] =  usePasswordTogglerec();
  const [PasswordInputType1, ToggleIcon1] =  usePasswordTogglerec();

    var password='';


    const[secque,setsecque] = useState([]); 

    useEffect(() => {
      Axios.get('http://localhost:3001/passwordrecovery/retrivesecque/').then((response)=>{      //response is a variable which is going to check the values that has been sent to the nodejs
    // console.log(response)
    if(response.data.message){
      errortoast();
    }
    else{
      setsecque(response.data);
    }
      });
    },[]);
  
    const delay = ms => new Promise(
      resolve => setTimeout(resolve, ms)
    );

    function errortoast(){
      toast.error('Wrong security answer', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      
        }); 
    }
    const successtoast = async event => {
    toast.success("Successfully updated Password", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true, 
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      
    
    });
    await delay(3000);

    console.log('after');
    
    navigate("/login_user")
  }

    const formik=useFormik({
        initialValues:{
          answer:'',
          newpass:'',
         confirmpass:'',
        },
    
        validationSchema: yup.object({
            answer: yup.string()
          .min(3, 'Answer must be a minimum of 3 characters')
          .required('Please Enter Your Answer '),
    
          newpass: yup.string()
          .required('Please Enter Password')
          .min(8, 'Password must be minimum 8 characters')
          .max(16, 'Password cannot be more than 16 characters')
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,16})/,
            "Must Contain One Uppercase, One Lowercase, One Number and One Special Case Character"
          ),        
        confirmpass: yup.string()
        .required('Please confirm password')
        .when("newpass", {
            is: val => (val && val.length > 0 ? true : false),
            then: yup.string().oneOf(
              [yup.ref("newpass")],
              "Both password need to be the same"
            )
          }),
        }),

   onSubmit:values=>{
      
      const a = {...formik.getFieldProps("answer")}
      const b = {...formik.getFieldProps("confirmpass")}
      const secans = a.value;
      const confpass = b.value;


      // console.log(loginid+password)
      // alert(uusername+upassword+ulocation)
      
     
        Axios.post('http://localhost:3001/passwordrecovery/updateconfpass/', {secans,confpass}).then((response)=>{
          console.log("abcde")  //a post axios request to send the info into the backend (we are sending it to the api having url 3001)
          if(response.data.err){
            
           errortoast();
            
            console.log(response.data.result);
          }
          if(response.data.result){
            // alert("Successfully login");
            // navigate("/appointment");
            
            successtoast();
            
            console.log(confpass);
            // alert(JSON.stringify(values));

          }
          else{
            errortoast();
          }
        
        });

    }
      });
      password= {...formik.getFieldProps("newpass")};

      var newpass= password.value;

      console.log("Password is"+newpass);

return (
    
<div >
<ToastContainer/>
<h1>

<Headerr/>


<div className='body2'>


{/* <div className='form-group'></div> */}
<div className='rightbody1'>






 
  <form className='formPatient1' onSubmit={formik.handleSubmit}>
  <div class="form-group2">
  <p className='signintotext2'>Security Question<br></br></p>

<p className='signintotext3'>  {secque.map((val)=>{
        return <span>{val.QueRand}</span> 
      })}
</p>




  </div>
    <div class="form-group2">
    <label className='labelpassword3'>Answer</label>
    <input  type="text" class="form-control" placeholder='Ex. Abc' 
    name="answer" {...formik.getFieldProps("answer")}></input>
     {formik.touched.answer && formik.errors.answer ? <span className='span8'>{formik.errors.answer}</span> : null}
    </div>

    <div class="form-group2">
    <label className='labelpassword3'>New Password</label> 
    

    <input type={PasswordInputType} class="form-control"   placeholder='Ex. yz' 
    name="newpass" {...formik.getFieldProps("newpass")}></input>



    <span className='password-toggle-icon2'>{ToggleIcon}</span>
    
    {formik.touched.newpass && formik.errors.newpass ? <span className='span8'>{formik.errors.newpass}</span> : null}
    </div>
    {/* <PasswordStrengthMeter password={newpass} /> */}
    <p class="text1"><FontAwesomeIcon icon={faCircleInfo} /><span class="span3">"Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
</span></p>

    <div class="form-group2">
    <label className='labelpassword3'>Confirm Password</label>
    <input type={PasswordInputType1} class="form-control"  placeholder='Ex. yz' 
    name="confirmpass" {...formik.getFieldProps("confirmpass")}></input>
    <span className='password-toggle-icon2'>{ToggleIcon1}</span>
    {formik.touched.confirmpass && formik.errors.confirmpass ? <span className='span8'>{formik.errors.confirmpass}</span> : null}
    </div>

 
 


<div class="form-group2">
<button class='signinbutton3'>
Submit
</button>
</div>
  </form>
</div>
</div>
<Footer/>
</h1></div>
 )
}
export default PasswordRecovery;


