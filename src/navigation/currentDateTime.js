import React, {useState, useEffect} from 'react';
// import Moment from 'react-moment';
import moment from 'moment';
import '../css/navMenu.css';
import Clock from 'react-live-clock';

export default function CurrentDateTime(){

    const [currentDate, setCurrentDate] = useState('');
    
 
  useEffect(() => {
    var date = moment()
                  .utcOffset('+05:30')
                  .format('dddd, MMMM DD, YYYY   ');
    setCurrentDate(date);
  }, []);
  
    return(
        <>
        <div className='date_time'>
            <p>  {currentDate}       <Clock format={'HH:mm'} ticking={true} timezone={'Asia/Kolkata'} />
</p>
            </div>
        </>
    )
}