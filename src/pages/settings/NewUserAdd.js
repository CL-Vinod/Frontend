import React,{useEffect, useState} from "react";
import Footer from '../../pages/footer'
import Header from '../../pages/header'
import NavMenu from "../../navigation/navMenu";
import '../../css/newuseradd.css';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from "formik";
import * as yup from 'yup';
import CurrentDateTime from "../../navigation/currentDateTime";
// import  Axios  from "axios";

import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function NewUserAdd() {

       //var Status;
        //window.local=0;
   
        const [checked, setChecked] = useState(false);
        
        // const handleChange = () => {
        // setChecked(!checked);
        // }
        const handleChange = () => {
        setChecked(!checked);
        if(!checked){
            window.local=1;
        }
        else{
            window.local=0;
        }
        }

        const login1 = async event => {

            toast.success("New User Added Successfully", {    
             position: "top-right",   
             autoClose: 2000,     
             hideProgressBar: false,    
            closeOnClick: true,      
             pauseOnHover: true,    
              draggable: true,    
            progress: undefined,       
             } );
            
        }
        console.log(window.local)
        
    const formik = useFormik({
        initialValues: {
        first_name:'',
        middle_name:'',
        last_name:'',
        email:'',
        phone:'',
        login_id:'',
        location:'',
        role:'',
        temp_pass:'',
          
        },
        validationSchema: yup.object({
            
            first_name: yup.string()
            .matches(/^[a-zA-Z]*$/, 'First Name should not contain numbers or any special characters')
             .required('Please Enter First Name'),
            
             last_name: yup.string()
             .matches(/^[a-zA-Z]*$/, 'Last Name should not contain numbers or any special characters')
             .required('Please Enter Last Name'),
            
             email: yup.string()
             .required("Please enter email"),
            
             login_id: yup.string()
             .min(6, 'User Id must be minimum 6 characters')
             .matches(/^[a-zA-Z.]*$/, 'Login ID should not contain numbers or any special characters')
             .required('Please Enter Login ID'),
            
             location: yup.string()
             .required('Please select location from dropdown'),
             
             role: yup.string()
             .required('Please select location from dropdown'),

             temp_pass: yup.string()
             .required('Please Enter Temporary Password')
                .min(8, 'password must be minimum 8 characters')
                .max(16, 'passsword cannot be more than 16 characters')
                .matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{7,})/, 'enter strong password'),
            
        }),
        onSubmit:values=>{
            const a={...formik.getFieldProps("first_name")}
            const fname=a.value;
            console.log(fname);
            const b={...formik.getFieldProps("middle_name")}
            const midname=b.value;
            console.log(midname);
            const c={...formik.getFieldProps("last_name")}
            const lname=c.value;
            console.log(lname);
            const d={...formik.getFieldProps("email")}
            console.log(d);
            const emai=d.value;
            console.log(emai);
            const e={...formik.getFieldProps("phone")}
            const phone=e.value;
            console.log(phone);
            const f={...formik.getFieldProps("login_id")}
            const loginid=f.value;
            console.log(loginid);
            const g={...formik.getFieldProps("location")}
            const location=g.value;
            console.log(location);
            const h={...formik.getFieldProps("role")}
            const role=h.value;
            console.log(role);
            const i={...formik.getFieldProps("temp_pass")}
            const temppass=i.value;
            console.log(temppass);
            console.log(window.local)
            var status="Suspended";
            if(window.local === 1){
                console.log(window.local)
                 status="Active";
                 console.log(status)
            }
            Axios.post('http://localhost:3001/newuseractive', {fname,midname,lname,emai,phone,loginid,location,role,status}).then((Response)=>{
                if(Response){
                    console.log("succes")
                    login1();
 
                }
                console.log("error")
            })
            


        }
    })

    return (
        <>
               <ToastContainer/>
               {/* <CurrentDateTime/> */}
                <form action="" onSubmit={formik.handleSubmit} className="New_User_Add">

                <div>
                <div className='user_heading'>
                    User Management-Adding New
                </div>
                <div>
                <button className='save_button' type="submit">Save</button>
                    <Link to="/unlockuser"  ><button className='userlist_button'>User List</button>
                </Link>
                </div>
                </div>
                <div className='personaldetails1'>
                    <div className="container1">
                       <h1 className='personal_details'>Personal Details</h1> 
                    </div>
                    <div className="usermanagementaddnewuser">
                            <div className='newuser_fields'>
                                <label className='newuserLabel'>First Name *</label>
                                <input className='newuserInput' type="text" name="first_name" {...formik.getFieldProps("first_name")} />
                                {formik.touched.first_name && formik.errors.first_name ? <span className='spann1'>{formik.errors.first_name}</span> : null}

                            </div>

                            <div className='newuser_fields'>
                                <label  className='newuserLabel' >Middle Name</label>
                                <input className='newuserInput' type="text" name="middle_name" {...formik.getFieldProps("middle_name")}/>
                            </div>
                            <div className='newuser_fields'>
                                <label  className='newuserLabel' >Last Name *</label>
                                <input className='newuserInput' type="text" name="last_name" {...formik.getFieldProps("last_name")}/>
                                {formik.touched.last_name && formik.errors.last_name ? <span className='spann1'>{formik.errors.last_name}</span> : null}

                            </div>
                        </div>
                    
                </div>
                <div className='contactdetails'>
                    <div className="container1">
                       <h1 className='personal_details'>Contact  Login Details</h1> 
                    </div>
                    <div>
                    <div className="usermanagementaddnewuser">
                            <div className='newuser_fields'>
                                <label className='newuserLabel'>Email *</label>
                                <input className='newuserInput' type="email" name="email" {...formik.getFieldProps("email")}/>
                                {formik.touched.email && formik.errors.email ? <span className='spann1'>{formik.errors.email}</span> : null}

                            </div>

                            <div className='newuser_fields'>
                                <label  className='newuserLabel' >Phone</label>
                                <input className='newuserInput' type="number" name="phone" {...formik.getFieldProps("phone")}/>
                                {/* {formik.touched.phone && formik.errors.phone ? <span className='spann1'>{formik.errors.phone}</span> : null} */}
                               
                            </div>
                            <div className='newuser_fields'>
                                <label className='newuserLabel' >Login ID *</label>
                                <input className='newuserInput' type="text" name="login_id" {...formik.getFieldProps("login_id")}/>
                                {formik.touched.login_id && formik.errors.login_id ? <span className='spann1'>{formik.errors.login_id}</span> : null}

                            </div>
                        </div>
                    </div>
                </div>
                <div className='contactdetails1'>
                    <div className="container1">
                       <h1 className='personal_details'>Other Details</h1> 
                    </div>
                    <div>
                    <div className="usermanagementaddnewuser">
                            <div className='newuser_fields'>
                                <label className='newuserLabel'>Location *</label>
                                <select className='newuserInput' name="location" {...formik.getFieldProps("location")}>
                                <option >Select your option  </option>
                                <option value="Radiology">Radiology </option>
                                 <option value="Gastroenterology">Gastroenterology</option>
                                    <option value="OB/GYN">OB/GYN</option>
                                    <option value="Endocrinology">Endocrinology</option>
                                </select>
                                {formik.touched.location && formik.errors.location ? <span className='spann1'>{formik.errors.location}</span> : null}
                            </div>

                            <div className='newuser_fields'>
                                <label  className='newuserLabel' >Role *</label>
                                <select className='newuserInput' name="role" {...formik.getFieldProps("role")}>
                                <option >Select your option  </option>
                                <option value="ROLE_NURSE">ROLE_NURSE </option>
                                 <option value="ROLE_PROVIDER">ROLE_PROVIDER</option>
                                    <option value="ROLE_FRONT_OFFICE">ROLE_FRONT_OFFICE</option>
                                    <option value="ROLE_BACK_OFFICE">ROLE_BACK_OFFICE</option>
                                    <option value="ROLE_PATIENT">ROLE_PATIENT</option>
                                </select>
                                {formik.touched.role && formik.errors.role ? <span className='spann1'>{formik.errors.role}</span> : null}
                            </div>
                            <div className='newuser_fields'>
                                <label className='newuserLabel' >Temporary Password *</label>
                                <input className='newuserInput' type="text" name="temp_pass" {...formik.getFieldProps("temp_pass")}/>
                                {formik.touched.temp_pass && formik.errors.temp_pass ? <span className='spann1'>{formik.errors.temp_pass}</span> : null}

                            </div>
                           
                
                        </div><br/>
                        <div className="usermanagementaddnewuser">
                        <div className='newuser_fields'>
                            <label className='newuserLabel'>Status :  
                            <input type='checkbox' className="active_user" onChange={handleChange}></input>
                            <p className="active_user1"> {checked ? 'Active' : 'Suspended'} </p>
                            <p className="chk"> {checked ? 'Uncheck to Suspend' : 'Check to activate'} </p>
                            </label>
                            </div>
                            </div>
                    </div>
                </div>
                </form>
        </>
    )
}
