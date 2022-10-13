import * as React from 'react';
import { useState } from 'react';
// import users from "../sampledata/users.json";
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
// import OutlinedCard from "../components/tb2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from "react-router-dom";
import "../css/unlockuser.css";
import ViewUserDetails from '../pages/settings/viewUserDetails';
// import CurrentDateTime from '../navigation/currentDateTime';


// import ViewUserDetails from '../pages/settings/viewUserDetails';
import Axios from 'axios';
import { number } from 'yup';
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
export default function Unlockuser() {

  const [users, setUsers] =useState([]);
  const [count,setCount] = useState(['0'])
  const tableRef1 = React.useRef();
  const navigate = useNavigate();
  //   const element = <FontAwesomeIcon icon={faCoffee} />
  function handleClick() {
    navigate("/NewUserAdd")
  }
  // console.log({ users });
  React.useEffect(()=>{
    Axios.get('http://localhost:3001/display/table').then((response)=>{
      console.log(response.data);
      setUsers(response.data)
    }).catch((error)=>{
      console.log(error)
    })
  },[])
          // FirstName,MiddleName,LastName,LoginID,Location,Status,Email,PhoneNo,Role
  return (
    <>
    {/* <CurrentDateTime/> */}

      <div className='userlist'>User Management-List</div>
      <button className='btnuser' onClick={handleClick}>New User</button>
      <MaterialTable classname='tableshdw'
        onRowClick={(event, rowData) => {

          var userEmail = rowData.email;
          

          navigate('/ViewUserDetails', { state: {"userEmail": rowData.Email,"loginId":rowData.LoginID,"firstName" : rowData.FirstName,"middleName":rowData.MiddleName, "lastName":rowData.LastName,"practiceLocation":rowData.Location,"status":rowData.Status,"role": rowData.Role, "phone": rowData.PhoneNo }});
          // <ViewUserDetails userEmail={userEmail} />
        }}

        tableRef={tableRef1}
          onSearchChange={() => {
            // console.log(tableRef1.current.state.data.length);
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
             left:'-14px'
          },
          searchFieldAlignment: 'left',
          cellStyle: {
            borderRight: '1px solid rgba(47, 49, 52, 0.2)',

          },
          headerStyle: {
            background: 'rgba(32, 160, 216, 0.3)',
            border: '1px solid #2F3134',
            fontWeight: '500',
            fontFamily: 'Montserrat',
            color: 'rgba(47, 49, 52, 0.9)',
          }
        }}
        icons={tableIcons}
        // columns={[
        //   { title: 'Login ID', field: 'id' },
        //   { title: 'First Name', field: 'first_name' },
        //   {title:'Middle Name', field: 'middle_name' ,hidden:'true'},
        //   { title: 'Last Name', field: 'last_name' },
        //   { title: 'Practice Location(s)', field: 'practice_location' },
        //   { title: 'Status', field: 'status' },
        //   { title: 'Email Address', field: 'email' },
        //   { title: 'Phone Number', field: 'phone' },
        //   {title:'role',field:'role', hidden:'true'}
        // ]}
        columns={[
          { title: 'Login ID', field: 'LoginID' },
          { title: 'First Name', field: 'FirstName' },
          {title:'Middle Name', field: 'MiddleName' ,hidden:'true'},
          { title: 'Last Name', field: 'LastName' },
          { title: 'Practice Location(s)', field: 'Location' },
          { title: 'Status', field: 'Status', render: rowData =>{                                         
                                         
            return(
                rowData.Status == "Active" ? <div><span style={{color: '#20A0D8', fontWeight:700}}> Active</span></div> :
                
                <div><span style={{color: '#BB2124' ,fontWeight:700}}> Suspended</span></div> 
                
                //  <span>{rowData.status}</span>
            )}},
          { title: 'Email Address', field: 'Email' },
          { title: 'Phone Number', field: 'PhoneNo' },
          {title:'role',field:'Role', hidden:'true'}
        ]}
        // FirstName,MiddleName,LastName,LoginID,Location,Status,Email,PhoneNo,Role
        data={users}
      />
      <div style={{ position: "relative", top: "-30px", left: "10px" }}>
        Total items : {users.length}
      </div>
    </>
  )
}