import React ,{useState} from 'react'
import {  createContext } from 'react'

export const DateContext = createContext();

const  DateState= (props)=> {

    const [date,setDate] = useState(new Date);

  return (
    <DateContext.Provider value={{date,setDate}}>
        {props.children}
    </DateContext.Provider>
  )
}

export default DateState;