import React from 'react'
import logo1 from "../images/ez_logo.png"
import "../css/login.css"
import "../css/headernew.css"
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'

export default function Headernew() {
    
    var username= 'Keith';
    var serviceloc=" Gastroenterology"

  return (
    <div className='navbar'>

    <img className='ezppaylogotop' src={logo1}  alt="ezppaysmalllogo"/>
    <div className='headertext'>
    <label className='headerfont'>Welcome {username} <label className='footerline'> |</label></label>
    
    <label className='headerfont'>{serviceloc} <label className='footerline'> |</label></label>

    <label className='headerfont'> <FontAwesomeIcon icon={faArrowRightFromBracket}/> Logout <label className='footerline'></label></label>
</div>
    </div>
  )
}





