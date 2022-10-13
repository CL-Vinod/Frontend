import React, {useState, useEffect} from 'react';
import {NavLink, Link} from 'react-router-dom';
import moment from 'moment';
import '../css/navMenu.css';
import Clock from 'react-live-clock';

const NavMenu = (props) => {

    const [isMenu, setisMenu] = useState(false);
    const [hidden, setHidden] = useState(true);
    var test3='front.office.user';
    const [isResponsiveclose, setResponsiveclose] = useState(false);
    const toggleClass = () => {
      setisMenu(isMenu === false ? true : false);
      setResponsiveclose(isResponsiveclose === false ? true : false);
  };

    let boxClass = ["main-menu menu-right menuq1"];
    if(isMenu) {
        boxClass.push('menuq2');
    }else{
        boxClass.push('');
    }

    const [isMenuSubMenu, setMenuSubMenu] = useState(false);
      
    const toggleSubmenu = () => {
      setMenuSubMenu(isMenuSubMenu === false ? true : false);
    };
    
    let boxClassSubMenu = ["sub__menus"];
    if(isMenuSubMenu) {
        boxClassSubMenu.push('sub__menus__Active');
    }else {
        boxClassSubMenu.push('');
    }

    const [currentDate, setCurrentDate] = useState('');
 
  useEffect(() => {
    var date = moment()
                  .utcOffset('+05:30')
                  .format('dddd, MMMM DD, YYYY');
    setCurrentDate(date);
  }, []);

  console.log(props.role1);

//   useEffect(() => {
    
//     if (props.role1==='admin'){
    
//       setHidden(true);
//     }
//     else{
//       setHidden(false);
//     }
//      },[]);

    return (
    <>
    <div className="header__middle">
                    <nav className="main-nav " >

                    {/* Responsive Menu Button
                    {isResponsiveclose === true ? <> 
                        <span className="menubar__button"  onClick={toggleClass} >   </span>
                    </> : <> 
                        <span className="menubar__button" onClick={toggleClass} >  </span>
                    </>} */}

                    <ul className={boxClass.join(' ')}>
                   {props.role1==='nurse' | props.role1==='front.office' | props.role1==='back.office' | props.role1==='admin' ? <li  className="menu-item" >
                        <NavLink exact activeClassName='is-active' onClick={toggleClass} to={`/appointments`}> Appointments<label className='navsideline'> |</label> </NavLink> 
                    </li> : null}
                    {props.role1==='nurse' | props.role1==='front.office' | props.role1==='back.office' | props.role1==='admin' ? <li className="menu-item " ><NavLink onClick={toggleClass} activeClassName='is-active' to={`/`}> Patients<label className='navsideline' > |</label> </NavLink> </li> : null}
                    {props.role1==='front.office' | props.role1==='admin' ?  <li onClick={toggleSubmenu} className="menu-item sub__menus__arrows" > <Link to="#"> Eligibility<label className='navsideline'> |</label>  </Link>
                        <ul className={boxClassSubMenu.join(' ')} > 
                            <li> <NavLink onClick={toggleClass} activeClassName='is-active'  to={`/`}> Batch </NavLink> </li>
                            <li><NavLink onClick={toggleClass} activeClassName='is-active' to={`/`}> Individual </NavLink> </li>
                        </ul>
                    </li> : null}
                    {props.role1==='back.office' | props.role1==='admin' ? <li className="menu-item sub__menus__arrows" ><Link to="#"> Reports <label className='navsideline' > |</label> </Link> 
                    <ul className={boxClassSubMenu.join(' ')} > 
                            <li> <NavLink onClick={toggleClass} activeClassName='is-active' to={`/`}  > Eligibility Report </NavLink> </li>
                            <li><NavLink onClick={toggleClass} activeClassName='is-active' to={`/`} > Transaction Report  </NavLink> </li>
                            <li> <NavLink onClick={toggleClass} activeClassName='is-active' to={`/`} > Payment Distribution Report </NavLink> </li>
                            <li><NavLink onClick={toggleClass} activeClassName='is-active' to={`/`}> Encounter Report  </NavLink> </li>
                            <li><NavLink onClick={toggleClass} activeClassName='is-active' to={`/`}> Export Reports  </NavLink> </li>
                        </ul>
                    </li> : null}
                    {props.role1==='nurse' | props.role1==='front.office' | props.role1==='back.office' | props.role1==='admin' ? <li className="menu-item sub__menus__arrows" ><Link to="#"> Settings  </Link> 
                    <ul className={boxClassSubMenu.join(' ')} > 
                 {props.role1==='admin' ? <li> <NavLink onClick={toggleClass} activeClassName='is-active' to={`/`}  > Facility Management </NavLink> </li> : null}
                 {props.role1==='admin' ?   <li><NavLink onClick={toggleClass} activeClassName='is-active' to={`/unlockuser`} > User Management </NavLink> </li>: null}
                   {props.role1==='admin' ?  <li> <NavLink onClick={toggleClass} activeClassName='is-active' to={`/`} > Fee Schedule </NavLink> </li>: null}
                   {props.role1==='admin' ?   <li><NavLink onClick={toggleClass} activeClassName='is-active' to={`/`}> Application Configuration </NavLink> </li>: null}
                   {props.role1==='admin' ? <li><NavLink onClick={toggleClass} activeClassName='is-active' to={`/`}> Providers </NavLink> </li>: null}
                   {props.role1==='admin' ?   <li> <NavLink onClick={toggleClass} activeClassName='is-active' to={`/`} > Procdures </NavLink> </li>: null}
                        {props.role1==='nurse' | props.role1==='front.office' | props.role1==='back.office' | props.role1==='admin' ? <li><NavLink onClick={toggleClass} activeClassName='is-active' to={`/`}> Change Password </NavLink> </li>: null}
                        {props.role1==='admin' ?  <li><NavLink onClick={toggleClass} activeClassName='is-active' to={`/`}> Generate Password </NavLink> </li>: null}
                        </ul>
                    </li> : null }
                    <div className='date_time1'>
                    <p>  {currentDate}   <Clock format={'HH:mm'} ticking={true} timezone={'Asia/Kolkata'}/></p>
            </div>
                    </ul>
                    
                    <div><p className='navline1'></p></div>
                    </nav> 
                    
                 
                     
    </div>
   
    </>
    )
}

export default NavMenu;
