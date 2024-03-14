import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import List from './Components/List';
import CreateUser from './Components/CreateUser';
import EditUser from './Components/EditUser';
import Login from './Components/Login';
import Exceldata from './Components/Exceldata';
import Front from './Components/Front';
import { MantineProvider } from '@mantine/core';

function App() {
  return (
    <div className="App">
      <MantineProvider defaultColorScheme="dark">
      <BrowserRouter>
        
        <Routes>
          <Route index element={<Front></Front>}></Route>
          <Route path="List" element={<List/>}></Route>
          <Route path="user/create" element={<CreateUser/>}></Route>
          <Route path="user/login" element={<Login/>}></Route>
          <Route path="user/:id/edit" element={<EditUser/>}></Route>
          <Route path="add/data" element={<Exceldata/>}></Route>
         
        </Routes>
      </BrowserRouter>
      </MantineProvider>
    </div>


  );
}

export default App;
