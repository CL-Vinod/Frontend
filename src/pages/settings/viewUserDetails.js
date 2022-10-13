import React,{useEffect, useState} from "react";
import '../../css/viewUserDetails.css'
import {Link} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import { useFormik } from "formik";
import * as yup from 'yup';
import CurrentDateTime from '../../navigation/currentDateTime';
import {useLocation} from 'react-router-dom';
import Axios from 'axios';


export default function ViewUserDetails(props) {


    // let navigate = useNavigate();
    // const delay = ms => new Promise(
    //     resolve => setTimeout(resolve, ms)
    //   );
        const handleChange1 = () => {
        setChecked(!checked);
        if(!checked){
          window.local=1;
      }
      else{
          window.local=0;
      }

        }
    const initialValues = {login_id:"", first_name: "",middle_name:"", last_name: "", email: "", phone: "", location: "", role: "", status:""};
    const location = useLocation();
    const [checked, setChecked] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [login_id, setLoginId] = useState("");
    // const [email, setEmail] = useState("");
    const [practiceLocation, setPracticeLocation] = useState("");
    const [role, setRole] = useState("");
    const [phone, setPhone] = useState("");
    useEffect(() => {
        // setUserEmail(location.state.userEmail);
        // setFirstName(location.state.firstName);
        // setLastName(location.state.lastName);
        // setMiddleName(location.state.middleName);
        // setChecked(location.state.status === "active" ? true : false);
        // setLoginId(location.state.LoginId);
        // setPracticeLocation(location.state.practiceLocation);
        // setPhone(location.state.phone);
        // setRole(location.state.role)
       const userData= {login_id:location.state.loginId, first_name:location.state.firstName ,middle_name:location.state.middleName, last_name: location.state.lastName, email: location.state.userEmail, phone: parseInt(location.state.phone)
        , location: location.state.practiceLocation, role: location.state.role, status:location.state.status}
setFormValues(userData);
//console.log(location.state.loginId);
setChecked(location.state.status==="Active"? true:false)
    }, [location.state.userEmail,location.state.middleName, location.state.firstName, location.state.lastName, location.state.status, location.state.loginId, location.state.practiceLocation, location.state.phone, location.state.role])
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);

  };
  useEffect(() => {
   // console.log({...formValues})
   console.log(location.state.loginId);
   var status="Suspended";
        if(window.local === 1){
            console.log(window.local)
             status="Active";
             console.log(status)
        }

    const userUpdatedData ={fname:formValues.first_name, lname:formValues.last_name,midname:formValues.middle_name, emai:formValues.email, loginid:location.state.loginId, phone:formValues.phone, location:formValues.location, role:formValues.role,status:status}
    if (Object.keys(formErrors).length === 0 && isSubmit) {
        console.log(userUpdatedData)
        
        Axios.post('http://localhost:3001/update/user', {...userUpdatedData}).then((Response)=>{
                if(Response){
                    console.log("succes")
                    
 
                }
                console.log("error")
            })
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.first_name) {
      errors.first_name = "First Name is required!";
    }
    if (!values.last_name) {
        errors.last_name = "Last Name is required!";
      }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.phone) {
        errors.phone = "Phone Number is required!";
      }
      else if(values.phone.toString().length !==10){
        errors.phone="enter 10 digit number"
      }

      if (!values.location) {
          errors.location = "Location is required!";
        }
        if (!values.role) {
            errors.role = "Role is required!";
          }
    return errors;
  };
    return (
        <>
            {/* <Header /> */}

{/* {Object.keys(formErrors).length === 0 && isSubmit  (
        <div className="ui message success">Saved successfully</div>
      ) } */}
                <form onSubmit={handleSubmit} className="New_User_Add1">
                <div>
                <div className='user_heading1'>
                    User Management-Edit
                </div>
                <div>
                <button className='save_button1'>Save</button>
                <Link to=""  ><button className='reset_pass_btn'>Reset Password</button>
                </Link>
                    <Link to="/unlockuser" ><button className='userlist_button1'>User List</button>
                </Link>
                </div>
                </div>
                <div className='editpersonaldetails1'>
                    <div className="container1b">
                       <h1 className='personal_details1'>Personal Details</h1>
                    </div>
                    <div className="usermanagementedituser">
                            <div className='edituser_fields'>
                                <label className='edituserLabel'>First Name *</label>
                                <input className='edituserInput' type="text" name="first_name" value={formValues.first_name}
              onChange={handleChange} />
               <span className='spann1'>{formErrors.first_name}</span>
                            </div>
                            <div className='edituser_fields'>
                                <label  className='edituserLabel' >Middle Name</label>
                                <input className='edituserInput' type="text" name="middle_name" value={formValues.middle_name}  onChange={handleChange}/>
                            </div>
                            {/* <span className='spann1'>{formErrors.password}</span> */}
                            <div className='edituser_fields'>
                                <label  className='edituserLabel' >Last Name *</label>
                                <input className='edituserInput' type="text" name="last_name" value={formValues.last_name}
              onChange={handleChange}/>
               <span className='spann1'>{formErrors.last_name}</span>
                            </div>
                        </div>
                </div>
                <div className='editcontactdetails'>
                    <div className="container1b">
                       <h1 className='personal_details1'>Contact&Login Details</h1>
                    </div>
                    <div>
                    <div className="usermanagementedituser">
                            <div className='edituser_fields'>
                                <label className='edituserLabel'>Email *</label>
                                <input className='edituserInput' type="email" name="email" value={formValues.email}
              onChange={handleChange}/><span className='spann1'>{formErrors.email}</span>
              </div>
                            <div className='edituser_fields'>
                                <label  className='edituserLabel' >Phone</label>
                                <input className='edituserInput' type="number" name="phone" value={formValues.phone}
              onChange={handleChange}/>
                               <span className='spann1'>{formErrors.phone}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='editcontactdetails1'>
                    <div className="container1b">
                       <h1 className='personal_details1'>Other Details</h1>
                    </div>
                    <div>
                    <div className="usermanagementedituser">
                            <div className='edituser_fields'>
                                <label className='edituserLabel'>Location *</label>
                                <select className='edituserInput' name="location" value={formValues.location}
              onChange={handleChange}>
                                <option >Select your option  </option>
                                <option value="Radiology">Radiology </option>
                                 <option value="Gastroenterology">Gastroenterology</option>
                                    <option value="OB/GYN">OB/GYN</option>
                                    <option value="Endocrinology">Endocrinology</option>
                                </select>
                                 <span className='spann1'>{formErrors.location}</span>
                                 </div>
                            <div className='edituser_fields'>
                                <label  className='edituserLabel' >Role *</label>
                                <select className='edituserInput' name="role" value={formValues.role}
              onChange={handleChange}>
                                <option >Select your option  </option>
                                <option value="ROLE_NURSE">ROLE_NURSE </option>
                                 <option value="ROLE_PROVIDER">ROLE_PROVIDER</option>
                                    <option value="ROLE_FRONT_OFFICE">ROLE_FRONT_OFFICE</option>
                                    <option value="ROLE_BACK_OFFICE">ROLE_BACK_OFFICE</option>
                                    <option value="ROLE_PATIENT">ROLE_PATIENT</option>
                                </select>
                                <span className='spann1'>{formErrors.role}</span>
                                </div>
                            <div className='edituser_fields'>
                            <label className='edituserLabel'>Status :
                            <input type='checkbox' className="active_user1b" checked={checked}onChange={handleChange1}></input>
                            <p className="active_user11b"> {checked ? 'Active' : 'Suspended'} </p>
                            <p className="chk1"> {checked ? 'Uncheck to Suspend' : 'Check to activate'} </p>
                            </label>
                            </div>
                        </div>
                    </div>
                </div>
                </form>
            {/* <Footer /> */}
        </>
    )
}