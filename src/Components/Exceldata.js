import { TextInput, Grid,  Divider, Text, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
export default function Exceldata(){
    
  const form = useForm({
    initialValues: { "Document No": '',"App Serial Number": '',"Granted Patent Number": '', "Priority Date": '' ,"File Date":'',"Agent":'',"CPC Class (First)":'',"Title":'', "Assignee Ultimate":''},
   
  });
  async function handleSubmit() {
    
    const value = form.values
    console.log(value);
    axios.post("http://localhost:3001/add-data",{
      value
    }).then((response)=>{
      console.log(response)
    })
    
    console.log(value);
  }
    return (
        <div>
            <Box maxWidth={340} mx="auto">
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))} className="formdata">
      
      <Text variant="gradient" gradient={{ from: 'teal', to: 'red', deg: 2 }} ta="center" fz="xl" fw={900}>
          Data
        </Text>
        
        <Divider my="md" />
      <br></br>
        <Grid></Grid>
        <div className='forminside'>
      <Grid>
      <Grid.Col span={5}>
      <TextInput
          
          label="Document No."
          placeholder="Enter Document No"
          {...form.getInputProps('Document No')}
          error={form.errors.DocumentNo}
        />
        <TextInput
          
          label="App Serial Number"
          placeholder="Enter App Serial Number"
          {...form.getInputProps('App Serial Number')}
          error={form.errors.appserialnumber}
        />
        <TextInput
          
          label="Granted Patent Number"
          placeholder="Enter Granted Patent Number"
          {...form.getInputProps('Granted Patent Number')}
          error={form.errors.grantedpatentnumber}
        />
        <TextInput
          
          label="Priority Date"
          placeholder="Enter Priority Date"
          {...form.getInputProps('Priority Date')}
          error={form.errors.prioritydate}
        />
       
      </Grid.Col>
      <Grid.Col span={2}></Grid.Col>
      <Grid.Col span={5}>
      <TextInput
          
          label="File Date"
          placeholder="Enter File Date"
          {...form.getInputProps('File Date')}
          error={form.errors.filedate}
        />
      <TextInput
          
          label="Agent"
          placeholder="Enter Agent"
          {...form.getInputProps('Agent')}
          error={form.errors.agent}
        />
        <TextInput
          
          label="CPC Class (First)"
          placeholder="CPC Class (First)"
          {...form.getInputProps('CPC Class (First)')}
          error={form.errors.cpc}
        />
        <TextInput
          
          label="Title"
          placeholder="Enter Title"
          {...form.getInputProps('Title')}
          error={form.errors.title}
        />
        
      </Grid.Col>
      
    </Grid>
    <TextInput
          
          label="Assignee Ultimate"
          placeholder="Enter Assignee Ultimate"
          {...form.getInputProps('Assignee Ultimate')}
          error={form.errors.AssigneeUltimate}
        />
        
        
        
        
        
       
        </div>
        <Group justify="center" mt="md">
  <Button type="submit" variant="gradient" gradient={{ from: 'teal', to: 'red', deg: 105 }} loaderPosition="center" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
    Submit
  </Button>
</Group>

  
      </form>
      <ToastContainer />
    </Box>

        </div>
    )
}
