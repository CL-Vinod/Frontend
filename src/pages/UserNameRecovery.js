import React, { useRef, useState } from 'react'
import { useNavigate } from "react-router-dom";
import '../css/Recovery.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { faSquare, faXmark } from '@fortawesome/free-solid-svg-icons';
import { } from '@fortawesome/free-regular-svg-icons';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Axios from 'axios';
import Footer from './footer';
import Headerr from './header';
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


// import {faRegular} from '@fortawesome/free-regular-svg-icons';

//import logo1 from "../images/ez_logo.png"
//import logo2 from "../images/ez_logo.png"
import Swal from 'sweetalert2'

function UserNameRecovery() {
    // const modalRef = useRef()
    const navigate = useNavigate();

    const delay = ms => new Promise(    resolve => setTimeout(resolve, ms)  );

    const login1 = async event => {

        toast.success("Email sent successfully", {    
         position: "top-right",   
         autoClose: 2000,     
         hideProgressBar: false,    
        closeOnClick: true,      
         pauseOnHover: true,    
          draggable: true,    
        progress: undefined,       
         } ); 

         await delay(3000);
         navigate('/login_user') 
    }

    function login2(){
        toast.error("Email not registered", {    
         position: "top-right",   
         autoClose: 2000,     
         hideProgressBar: false,    
        closeOnClick: true,      
         pauseOnHover: true,    
          draggable: true,    
        progress: undefined,        
         } );    
    }


    const formik=useFormik({
        initialValues:{
            email:'',
        },

        validationSchema: yup.object({
            email: yup.string()
            .required("Registered email required")
            .email("Enter correct email"),
        }),

        onSubmit: values=>{
            const email1={...formik.getFieldProps("email")}
            const email=email1.value;

            Axios.post("http://localhost:3001/check", {email: email}).then( (response) => {
            
                if(response.data.message){              
                    login2();
                  }
                  
                else{
                    login1(); 
                  }   
        })
       
        }
    })
    return (
        <>
     
            <ToastContainer/>        
            <form className="username_recovery_form" onSubmit={formik.handleSubmit}>
                <div className='username_recovery_heading'>User ID Recovery</div>
                <div className="username_recovery_subheading">Please enter the registered Email-Id</div>
                <div className='partition_line'></div>
                <div className="username_recovery_form_field">
                    <label className="username_recovery_label" >Email</label>
                    <input className="username_recovery_input" type="email" placeholder="Email"  name="email" {...formik.getFieldProps("email")}/>
                    {formik.touched.email && formik.errors.email ? <span className='spann'>{formik.errors.email}</span> : null}

                </div>
                <button className="btnemail">Submit</button>
            </form>
   
        </>
    )
}

export default UserNameRecovery;
