import {  Text, } from '@mantine/core';
import { Link } from 'react-router-dom';
export default function Front(){
    return(
        <>
        <div className="split left">
  <div className="centered">
    <span className="text1">Welcome</span>
    <Text className="text2">To Our Page</Text> 
  </div>
  
</div>

<div className="split right">
  <div className="centered">
    
    <div className='rightBox'>
    <img src="https://www.freeiconspng.com/uploads/computer-user-icon-31.png" alt="Avatar man" />
    
    <h2><Text fz="xs">
          Already have an account? <Link to="user/login">Login</Link>
        </Text></h2>
    <p><Text fz="xs">
          Don't have an account?{' '}
          <Link to="/user/create">Sign Up</Link>
        </Text></p>
    
    </div>
    
  </div>
</div>

        
        </>
    )
}