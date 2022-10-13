import React from 'react'
import  "../css/patient_login1.css"
import Footer from './footer';
import Headerr from './header';
import {Link} from 'react-router-dom';
import logo1 from "../images/ez_logo.png"
import logo2 from "../images/ez_logo.png"
import {Button} from 'react-bootstrap/Button';
import imgleft from '../images/loginleftdesign1.png';
import imgright from '../images/loginrightdesign2.png';
import { useFormik } from 'formik';
import * as yup from 'yup';

export default function Loginpatient() {

  const formik=useFormik({
    initialValues:{
      fName:'',
      lName:'',
      dob:'',
      location:''
    },

    validationSchema: yup.object({
      fName: yup.string()
        .max(20, 'Name should not exceed 20 Characters')
        .matches(/^[A-Za-z\s]*$/, 'First Name should not contain numbers or any special characters')
        .required('Please Enter First Name'),

      lName: yup.string()
        .required('Please Enter Last Name')
        .matches(/^[A-Za-z\s]*$/, 'First Name should not contain numbers or any special characters'),
      
      dob: yup.date()
        .required("Date of Birth cannot be Empty"),
      
      location: yup.string()
        .required('Please select location from dropdown')

    }),

    onSubmit:values=>{
      alert(JSON.stringify(values));

    }

  });

  return (
<div >
<h1>

<div className='body1'>

<div >
<img className='ezppaylogo' src={logo2} alt="ezppaybigbodylogo"/>
</div>
{/* <div className='form-group'></div> */}
<div className='rightbody'>
<div class="btn-group" style={{width: '100%',padding: '5px'}} >
<Link to="/login_user" style={{width:'100%'}}><button className='userloginn1'>User</button></Link>
<Link to="/login_patient" style={{width:'100%'}}><button className='patientloginn1'>Patient</button>
</Link>
</div>
  
<div className='form-group'>
<p className='linetab1'></p>
</div>
<div className='designleft1'>
<img src={imgleft} className='designleft1'/>
</div>

<div className='signintotext1'>
<p className='signintotext1'>Access Your Ezppay<br></br>Account Details</p>
</div>
<div className='designright1'>
<img src={imgright}  className='designright1'></img>
</div>
 
  <form className='formPatient' onSubmit={formik.handleSubmit}>

    {/* First Name TextBox */}
    <div class="form-group">
    <label className='labelpassword'>First Name</label>
    <input  type="text" class="form-control" placeholder='Ex. Abc' 
    name="fName" {...formik.getFieldProps("fName")}></input>
     {formik.touched.fName && formik.errors.fName ? <span className='span1'>{formik.errors.fName}</span> : null}
    </div>

 {/* Last Name TextBox */}
    <div class="form-group">
    <label className='labelpassword'>Last Name</label>
    <input type="text" class="form-control"  placeholder='Ex. yz' 
    name="lName" {...formik.getFieldProps("lName")}></input>
    {formik.touched.lName && formik.errors.lName ? <span className='span1'>{formik.errors.lName}</span> : null}
    </div>
    
     {/* Date of Birth */}
    <div class="form-group">
    <label className='labelpassword'>DOB</label>
    <input type="date" class="form-control"  
    name="dob" {...formik.getFieldProps("dob")}></input>
    {formik.touched.dob && formik.errors.dob ? <span className='span1'>{formik.errors.dob}</span> : null}
    </div>

 {/* Location Drop Downs*/}
    <div class="form-group">
<label className='labelpassword'>Location</label>
<select class="form-select"  name="location" id="location" {...formik.getFieldProps("location")} >  
  <option value="Radiology">Radiology </option>
  <option value="Gastroenterology">Gastroenterology</option>
  <option value="OB/GYN">OB/GYN</option>
  <option value="Endocrinology">Endocrinology</option>                      
 </select>
 {formik.touched.location && formik.errors.location ? <span className='span1'>{formik.errors.location}</span> : null}
</div>

<div class="form-group">
<button class='signinbutton2'>
View My Details
</button>
</div>

  </form>
  </div>
</div>

</h1>
</div>

  )
}
