import React,{useEffect, useState} from "react";
import mockdata from "../sampledata/MOCK_DATA.json";
import MaterialTable from "material-table";
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import "../css/tableapp.css"
import OutlinedCard from "../components/tb2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Axios from 'axios';
import { useContext } from 'react';
import { DateContext } from '../contexts/dateContext';
import {Link,useNavigate} from 'react-router-dom';
import DateComponent from './dateComponent';
import { format } from 'date-fns' // 21K (gzipped: 5.8K)
import moment from 'moment' // 292.3K (gzipped: 71.6K)

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <FontAwesomeIcon icon={faChevronDown} {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };
export default function Appointments() {
  const [appointmentsData, setAppointmentsData] = React.useState([]);
  // const [fulldata,setfulldata]= useState([]);
  const { date, setDate } = useContext(DateContext);
  const tableRef1 = React.useRef();
  const [count,setCount] = useState(['0'])
  const [hidden, setHidden] = useState(true);
  var test1= 'nurse';
  var test2= 'doctor';
  const refreshAppointments =  () => {
      const formattedDate = moment(date).format('YYYY-MM-DD');
      console.log(formattedDate)
   Axios.get(`http://localhost:3001/getdate/${formattedDate}`).then((response)=>{

    setAppointmentsData(response.data)
    console.log(response.data)
    setCount(response.data.length)
  })
  }


  useEffect(() => {
    
  if (test2==='doctor'){
  
    setHidden(true);
  }
  else{
    setHidden(false);
  }
    refreshAppointments();
   },[date]);
    return (
      <>
 <DateComponent /> 
       {/* <button onClick={() => setHidden(s => !s)}>
        react show hide component
      </button> */}
        <MaterialTable classname='tableshdw'
         tableRef={tableRef1}
         onSearchChange={() => {

          setCount(tableRef1.current.state.data.length)
         }}
          options={{
            showTitle: false,
            detailPanelColumnAlignment: "right",
            border: '0px',
            rowStyle: x => {
              if (x.tableData.id % 2) {
                return { backgroundColor: "#F2F2F2" }
              }
            },
            emptyRowsWhenPaging: false,
            searchFieldStyle: {
              fontWeight: 450,
              disableUnderline: true,
              background: 'rgba(32, 160, 216, 0.1)',
              border: '1.33333px solid #20A0D8',
              borderRadius: '5px',
              padding: '5px 10px 5px 15px',
            },
            searchFieldAlignment: 'left',
            cellStyle: {
              borderRight: '1px solid rgba(47, 49, 52, 0.2)',
            },
            headerStyle: {
              background: 'rgba(32, 160, 216, 0.3)',
              border: '1px solid #2F3134',
              fontWeight: '500',
              fontSize: 18  ,
              fontFamily: 'Montserrat',
              color: 'rgba(47, 49, 52, 0.9)',
            }
          }}
          icons={tableIcons}
          columns={[
            { title: 'Scheduled', field: 'startTime', type:'time' ,
            
           render: rowData =>{                                         
                                         
              return(
                moment(date).format('hh:mm A')
                
              )}},
              { title:  'Patient Name', field: 'pname'},
            { title: 'Doctor Name', field: 'dname' },
            { title: 'Mail-ID', field: 'patientEmailId' },
            { title: 'Location', field: 'Location' },
          ]}
          data={appointmentsData}
          title="Appointments List"
          detailPanel={
            rowData => {
              let num = rowData.tableData.id
              return (
                <>
                  <OutlinedCard var11={rowData} count={num + 1} rowD />
                </>
              )
            }}
          onRowClick={(event, rowData, togglePanel) => togglePanel()}
        />
            <div style={{ position: "relative", top: "-30px", left: "10px", width:'12%' }}>

          Total Items : {count}
        </div>
      </>
    )
  }