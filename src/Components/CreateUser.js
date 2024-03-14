import { TextInput, PasswordInput, Text, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { Link } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function CreateUser(){
    const [{ toggle }] = useDisclosure(false);
    const navigate = useNavigate()
  const form = useForm({
    initialValues: { name: '', email: '', password: '', confirmPassword: ''},
    validate: {
      name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length < 6 ? 'Password must have at least 6 characters' : null),
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords did not match' : null,
    },
  });
  async function handleSubmit() {
    
    const value = form.values
    console.log(value)
    axios.post("http://localhost:3001/add-user",{
      value
    }).then((response)=>{
      console.log(response)
      navigate("/user/login")
    })
    
    console.log(value);
  }
    return (
        <div>
            <Box maxWidth={340} mx="auto">
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))} className="form">
        <Text variant="gradient" gradient={{ from: 'teal', to: 'red', deg: 2 }} ta="center" fz="xl" fw={700}>
          Sign Up
        </Text>
        <div className='forminside'>
        <TextInput
          withAsterisk
          label="Name"
          placeholder="Enter your name"
          {...form.getInputProps('name')}
          error={form.errors.name}
        />
        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps('email')}
          error={form.errors.email}
        />
        <PasswordInput
          label="Password"
          placeholder="Password"
          onVisibilityChange={toggle}
          {...form.getInputProps('password')}
          error={form.errors.password}
        />
        <PasswordInput
          mt="sm"
          label="Confirm password"
          placeholder="Confirm password"
          onVisibilityChange={toggle}
          {...form.getInputProps('confirmPassword')}
          error={form.errors.confirmPassword}
        />
        </div>
        <Group justify="center" mt="md">
  <Button type="submit" variant="gradient" gradient={{ from: 'teal', to: 'red', deg: 105 }} loaderPosition="center" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
    Submit
  </Button>
</Group>

        <Text fz="xs">
          Already have an account? <Link to="/user/login">Login</Link>
        </Text>
      </form>
      <ToastContainer />
    </Box>

        </div>
    )
}
