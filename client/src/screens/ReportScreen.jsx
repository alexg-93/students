import React,{useEffect,useState} from 'react';
import NavBar from '../components/Navbar'
import {DataGrid, GridToolbarContainer, GridToolbarExport,GridToolbar} from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import axios from 'axios'
import Button from "@mui/material/Button";

const columns = [
  //{ field: '_id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'שם פרטי',
    width: 150,
    editable:false,
  },
  {
    field: 'lastName',
    headerName: 'שם משפחה',
    width: 150,
    editable: true,
  },
  {
    field: 'gender',
    headerName: 'מין',
    type: 'string',
    width: 110,
    editable: true,
  },
  {
    field: 'homeTelNumber',
    headerName: 'טלפון בית',
    sortable: false,
    width: 160,
    
  },
  {
    field: 'mobileNumber',
    headerName: 'פלאפון נייד',
    sortable: false,
    width: 160,
    
  },
  {
    field: 'nation',
    headerName: 'לאום',
    sortable: false,
    width: 160,
    
  },
  {
    field: 'country',
    headerName: 'מדינה',
    sortable: false,
    width: 160,
    
  },
  {
    field: 'idNumber',
    headerName: 'תעודת זהות',
    sortable: false,
    width: 160,
    
  },
  {
    field: 'email',
    headerName: 'מייל',
    sortable: false,
    width: 220 ,
    
  },
  {
    field: 'bornDate',
    headerName: 'תאריך לידה',
    sortable: false,
    width: 160,
    valueFormatter: ({ value }) => `${new Date(value).toLocaleDateString()}`,
    
  },
  {
    field: 'aliyahDate',
    headerName: 'תאריך עלייה',
    sortable: false,
    width: 160,
    valueFormatter: ({ value }) => `${new Date(value).toLocaleDateString()}`,
    
  },
  {
    field: 'isExported',
    headerName: 'סטטוס יצוא ',
    sortable: false,
    width: 160,
    type:'boolean'
    
  },
 
];



function CustomToolbar() {
  
  return (
    <GridToolbarContainer>
  
     <GridToolbarExport />
   
   
    </GridToolbarContainer>
  );
}

const ReportScreen = () => {



  const [rows,setRows]=useState([])

  const api = axios.create({
    baseURL: 'http://localhost:8000/api',
})

  useEffect(() => {
    const fetchMyAPI=async()=>{
      const {data} = await api.get('/reports')
      const {studentsData} = data;
      if(studentsData.length>0){
        setRows(studentsData)
      }
     
    }

    fetchMyAPI()
   
  }, [])



 

  return(
   <>
    <NavBar/>

  
      <Box sx={{display:'grid',width:'100%',height:500}} mt={20} pr={2} pl={2}
       
        >
       <DataGrid
        rows={rows}
        columns={columns}
        pageSize={15}
        rowsPerPageOptions={[15]}
        checkboxSelection
        disableSelectionOnClick
        components={{ Toolbar: CustomToolbar}}
        getRowId={(row) => row._id}
        // initialState={{
        //   filter: {
        //     filterModel: {
        //       items: [
        //         { columnField: 'isExported', operatorValue:'is', value:'true' },
        //       ],
        //     },
        //   },
        // }}
        sx={{
          boxShadow: 10,
          border: 2,
          borderColor: 'primary.light',
          '& .MuiDataGrid-cell:hover': {
            color: 'primary.main',
          },
        }}
        isRowSelectable={(params) => params.row.isExported === false}

      />
      </Box>
  
  
    
  </>
  );
};

export default ReportScreen;
