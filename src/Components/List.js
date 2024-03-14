import {  Button } from "@mantine/core";
import { useEffect,useState } from "react";
import { MantineReactTable } from "mantine-react-table";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function List() {
  const [tableData, seTableData] = useState([]);
  const [DocumentNo, setDocumetNo] = useState("");
  const navigate =useNavigate()
  
 
  const columns = [
      {
        accessorKey: "Document_No",
        header:"Document No"
      },
      {
        accessorKey: "App_Serial_Number",
        header:"App Serial Number"
      },
      {
        accessorKey: "Granted_Patent_Number",
        header:"Granted Patent Number",
      },
      {
        accessorKey: "Priority_Date",
        header:"Priority Date",
      },
      {
        accessorKey: "File_Date",
        header:"File Date",
      },
      {
        accessorKey: "Agent",
        header:"Agent"
      },
      {
        accessorKey: "CPC_Class_First",
        header:"CPC Class (First)",
      },
      {
        accessorKey: "Title",
        header:"Title"
      },
      {
        accessorKey: "Assignee_Ultimate",
        header:"Assignee Ultimate",
      },
    ]


  function fetchData() {
    axios
      .get("http://localhost:3001/all-users")
      .then((data) => seTableData(data.data))
      .catch((err) => console.log(err));
      setDocumetNo("")
  }
  function handleSearch() {
    axios.post("http://localhost:3001/search", {
      DocumentNo
      
    }).then((data) => seTableData(data.data))
    .catch((err) => console.log(err));
    
      
  }
  useEffect(() => {
    fetchData()
  }, []);

  const navigateToAnotherPage=()=>{
     navigate('/add/data')
  }
  return (
    <>
    
        <div style={{padding:"1rem", display:"flex",flexDirection:"column",backgroundColor:"#242f37"}}>
          <div style={{float:"right",display:"flex",alignItems:"flex-end",justifyContent:"end"}}>
       <Button  size={"md"} className="Btn" onClick={navigateToAnotherPage}
      variant="gradient" gradient={{ from: '#242f37', to: 'red', deg: 2 }}
      radius="md">
          Add
        </Button>
        </div>
<div className="table" style={{marginTop:"1rem"}}>

        {tableData?.length && columns && <MantineReactTable data={tableData} columns={columns} renderTopToolbarCustomActions={({ table }) => {
          return (
            <div style={{ width: "80%" }}>
              <input value={DocumentNo} onChange={(e)=> setDocumetNo(e.target.value)}></input>
              <button onClick={handleSearch}>Search</button>
              <button onClick={fetchData}>clear</button>
            </div>
          );
        }}
 enableSorting={true} >
          
          </MantineReactTable>}
        
      </div>
      </div>
    </>
  );
}
