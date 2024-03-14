import { TextInput, PasswordInput, Text, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { Link } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import {  ToastContainer } from 'react-toastify';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
export default function CreateUser(){
    const [{ toggle }] = useDisclosure(false);
    const navigate = useNavigate()
   
    const form = useForm({
        initialValues: {  email: '', password: '' },
        validate: {
          
          email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
          password: (value) => (value.length < 6 ? 'Password must have at least 6 characters' : null),
          
        },
              
    
       
      });
  async function handleSubmit() {
    const value = form.values
    console.log(value);
    axios.post("http://localhost:3001/login",{
      value
    }).then((response)=>{
      console.log("res",response)
      navigate("/List")
    })
  }
    return (
        <div>
            <Box maw={340} mx="auto">
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))} className='form'>
      <Text
      variant="gradient"
      gradient={{ from: 'teal', to: 'red', deg: 2 }}
      sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
      ta="center"
      fz="xl"
      fw={700}
    >
      Login
    </Text>
        <TextInput 
        className='email'
          withAsterisk 
          label="Email" 
          placeholder="your@email.com" 
          {...form.getInputProps('email')}
          required
        />
        <PasswordInput
        label="Password"
        // visible={visible}
        {...form.getInputProps('password')}
        onVisibilityChange={toggle}
      />
  
   <Group justify="center" mt="md">
  <Button type="submit" variant="gradient" gradient={{ from: 'teal', to: 'red', deg: 105 }} loaderPosition="center" style={{ marginLeft: 'auto', marginRight: 'auto' }} onClick={((values) => handleSubmit(values))}>
    Submit
  </Button>
</Group>
<Text fz="xs">
          Don't have an account?{' '}
          <Link to="/user/create">Sign Up</Link>
        </Text>
      </form>
      <ToastContainer />
    </Box>

        </div>
    )
}
