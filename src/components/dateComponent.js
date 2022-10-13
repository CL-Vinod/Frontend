import React, {useState, useEffect, forwardRef,createRef, useContext } from 'react';
import "../css/dateComponent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons"
import { faSquareCaretLeft, faSquareCaretRight } from "@fortawesome/free-regular-svg-icons";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { DateContext } from '../contexts/dateContext';

function DateComponent() {



    // const reducer =(date, action) =>{
    //     switch(action.type){
    //         case "Increment":
    //             return new Date(parseInt(date.getFullYear()),parseInt(date.getMonth()),parseInt(date.getDay())+1);
    //         case "Decrement":
    //             return new Date(parseInt(date.getFullYear()),parseInt(date.getMonth()),parseInt(date.getDay())-1);
    //         default:
    //             return date

    //     }
    // }
    //     const [date,dispatch]=useReducer(reducer,new Date()) 

    const {date, setDate} = useContext(DateContext);
    const [date_day, setDate_day] = useState("Today");
    const ref = createRef()

    useEffect(() => {
        const currentDate = new Date();
        if (date.toDateString() === currentDate.toDateString()) {
            setDate_day("Today");
            return;
        }
        else if (date.getFullYear() === currentDate.getFullYear() && date.getMonth() === currentDate.getMonth() && date.getDay() === currentDate.getDay() - 1) {
            setDate_day("Yesterday");

        }
        else if (date.getFullYear() === currentDate.getFullYear() && date.getMonth() === currentDate.getMonth() && date.getDay() === currentDate.getDay() + 1) {
            setDate_day("Next Day")
        }
        else {
            setDate_day(date.toDateString().substring(0, 3))
        }
    }, [date])

    function decreaseDateByOne() {

        setDate(new Date(parseInt(date.getFullYear()), parseInt(date.getMonth()), parseInt(date.getDate()) - 1))

    }

    function IncreaseDateByOne() {

        setDate(new Date(parseInt(date.getFullYear()), parseInt(date.getMonth()), parseInt(date.getDate()) + 1))
    }

    const ExampleCustomInput = forwardRef(({ onClick }, ref) => (
        <FontAwesomeIcon icon={faCalendarDays}  ref={ref} onClick={onClick}  style={{ width: "100%", height: "100%", marginLeft: "10px", color: "#20A0D8"}}/>
    ));


    return (
        <>

            <div className='date_container'>


                <FontAwesomeIcon icon={faSquareCaretLeft} className="date_icon" onClick={decreaseDateByOne} />

                {/* <FontAwesomeIcon icon={faCalendarDays} style={{ width: "11%", height: "49.09%", marginLeft: "10px", color: "#20A0D8" }} onClick={() => setShowDatePicker(!showDatePicker)} /> */}
                <div id="date_picker" >
                <DatePicker selected={date} onChange={(date) => setDate(date)} ref={ref} customInput={<ExampleCustomInput/>} closeOnScroll={true}  />

                
                </div>
                <div className="date_text">
                    <p className="date_date">
                        {`${date.toDateString().slice(3, 7)} ${date.getDate()}  ${date.getFullYear()}`}
                    </p>
                    <p className="date_day"> {date_day}</p>
                </div>

                <FontAwesomeIcon icon={faSquareCaretRight} className="date_icon" onClick={IncreaseDateByOne} />

            </div>


        </>
    )
}

export default DateComponent