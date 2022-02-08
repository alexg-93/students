import React,{useEffect,useState} from 'react';
import NavBar from '../components/Navbar'
import {DataGrid, GridToolbarContainer, GridToolbarExport,GridToolbar} from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import axios from 'axios'
import CsvDownload from 'react-json-to-csv'

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
    baseURL: 'https://ortsudents.herokuapp.com/api/reports',
})

  useEffect(() => {
    const fetchMyAPI=async()=>{
      const {data} = await api.get('/reports')
      let {studentsData} = data;
     
      if(studentsData.length>0){
        setRows(
          studentsData.map(item => {
            const obj = Object.assign({}, item);
            obj["bornDate"] = new Date(item.bornDate).toLocaleDateString();
            obj["aliyahDate"] = new Date(item.aliyahDate).toLocaleDateString();
            return obj;
          })
        )
      }
     
    }

    fetchMyAPI()

  }, [])

  const handleUpdateExported = async()=>{
    
    await api.put('/reports');
    
  }


 

  return(
   <>
    <NavBar/>
    <Box sx={{width:'200px'}} mt={20} ml={2} onClick={handleUpdateExported}>
     
    <CsvDownload 
    data={rows.filter((item)=>{
      return item.isExported===false
    })}
    filename="students.csv"
   
  >
    Download latest students CSV 
    
    <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="SaveAltIcon"><path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z"></path></svg>
  </CsvDownload>
 </Box>
   
      <Box sx={{display:'grid',width:'100%',height:500}} mt={10} pr={2} pl={2}
       
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
