import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { textAlign } from "@mui/system";
import  person1 from "../images/person.png";
import PersonIcon from '@mui/icons-material/Person';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../css/tableapp.css"
import "@fontsource/montserrat";
import { faHouseMedical, faUser, faUserDoctor, faIdCard} from '@fortawesome/free-solid-svg-icons';
import Moment from 'react-moment';





const bull = (
  <Box
    component="span"
    sx={{ mx: "2px", transform: "scale(0.8)" }}
    style={{ display: "inline-block" }}
  ></Box>
);

export default function OutlinedCard(props) {


  var newarr = props.var11;
  console.log(newarr.date)
  

  
const state = new Date();
  return (
    <Box className="boxdesign">
      {/* <label>{props.var11}</label> */}
           <Card 
        style={{ backgroundColor:'#F5F5F5',width: "99.9%", display: "inline-flex", fontSize:"18px", height: "24rem" }}
        variant="outlined"
      >

        {/* {card} */}
        <React.Fragment>
   
   <div className="card11"
   >                    <label className="labelcount">{props.count}</label>
   <CardContent className="card11content">

   <img alt="processor" className="card11image"  src={"https://source.unsplash.com/random/200x200?sig=1"}
width="93%" height="93%"/>
   <label className="labelcard11" > <AttachEmailIcon style={{ color: '#0dcaf0'}}/> {props.var11.patientEmailId} </label>
 </CardContent> 
 </div>
   <div className="card22">
     <CardContent className="card22content">
     <div className="disp2">
<label>Scheduled</label>
<label className="datetime1">

<Moment format="YYYY/MM/DD hh:mm A">{state}</Moment>

</label>

</div>
     <div className="displaylist" >
     <FontAwesomeIcon className="iconprop" icon={faUser}/> <label className="labeldetails">{props.var11.pname}</label><br/>
     </div>
     <div className="displaylist" >
    <FontAwesomeIcon className="iconprop"  icon={ faUserDoctor}/>  <label className="labeldetails">{props.var11.dname}</label>
     </div>
     <div className="displaylist" >  
     <FontAwesomeIcon style={{maxWidth: '29px'}} className="iconprop"  icon={faHouseMedical}/>  <label className="labeldetails">{props.var11.Location}</label>
     </div>
     <div className="displaylist" >  
     <FontAwesomeIcon style={{maxWidth: '29px'}} className="iconprop"  icon={faIdCard}/>  <label className="labeldetails">{props.var11.Location}</label>
     </div>
 
<div className="btn112">
     <Button className="button23">
      <label className="buttonlabel"> Eligibility and Estimate </label>
     </Button>
     <Button className="button23">
     <label className="buttonlabel"> Check-in Process</label> 
     </Button>
     </div>
   </CardContent>
     </div>
   
   <div className="card33"><CardContent style={{ display: "inline-block" }}>
   {/* <input type="checkbox" /> */}
   <label className="buttonlabel1">
     
     I agree to all the terms and conditions
   </label>
 </CardContent>
 </div>
 <div className="card44">

   <CardContent className="card44content" >
     <div className="section1">
       <label style={{ paddingRight: "3rem" }}>Prior patient balance</label>
       <label className="patientlabelbalance">:$400 </label>
     </div>
     <div className="section1">
       <label>Today's Co-Pay</label>
       <label className="patientlabelbalance">:$500 </label>
     </div>
     <div className="section1">
       <label>Today's estimated charges</label>
       <label className="patientlabelbalance">:$1800 </label>
     </div>
     <div className="section1">
     <div className="card55"/>
       <label>Total Balance </label>
       <label className="totbal">:$1200 </label>
     </div>
   </CardContent>
   </div>
 </React.Fragment>
      </Card>
    </Box>
  );
}
