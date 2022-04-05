import React,{useState, useEffect} from 'react'
import './App.css';
import { Button, ButtonGroup } from '@chakra-ui/react'
import {useSelector,useDispatch} from 'react-redux';
import {addPost,fetchPost,deletePost,setEdit, editPost} from './reducers/index';

import {
  Table,
  Thead,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  FormLabel,
  FormControl,
  Input
} from '@chakra-ui/react';
import { ContactSupportOutlined } from '@mui/icons-material';

function App() {
  const [title,setTitle] = useState(''); 
  let [id,setId]=useState();
  const dispatch = useDispatch();
 const [edit, setEdit] = useState(false);
  const[number,setNumber]=useState(5000);
 
 
  // const store=store.getState();



  //accessing post from state
  let {post} = useSelector((state)=>({
    ...state.app
  }))
  let array=post;
  console.log("array",array)

  // const st=store.getState();
  // console.log('store',st)
  // console.log(post)



 if(number!==5000){
   id=number
 }




 //submit function action editing
  const submitEdit=(e)=>{
    e.preventDefault();
    setEdit(false);
     setTitle('');
     setId('');
  }


  //editdetails function to edit the details
      const editDetails=(index,value)=>{
        console.log('index',index)
        handleChange(index,value)
        setEdit(true)
      }

      //onchange function to edit the id and title 
       const handleChange=(index,text)=>{  
          
          // setEdit(true);
          console.log('id',index);
          console.log('title',text)
          setId(index);
          setTitle(text);
    }
    // const finalEdit=(index,text)=>{
      
    //     dispatch(editPost({id:index,title:text}))
      
    // }

    // //hadnledelete function to delete the post from the album
    // const handleDel=(id)=>{
    //   console.log('opost',post);
    //   console.log('id',id)
    //   dispatch(deletePost({id}))
    // }

 const handleEdited=()=>{
   console.log('pp',post[id].title)
   console.log('id',id);
   setEdit(false);
   setId('');
   setTitle('')
    //  let newstore=[]
      post.map((item,index)=>{
        let array=[]
         if(index==id){
          console.log('item',item.title);
          let obj={
            id,
            title,
             userId:id
          }
          array[id]=obj;
          return [...array,obj];
         }
         console.log(index,item)
         console.log('newinde',array)
         return array=[...array,item]
      })
 }




 //dispatch function to create new post and add the post in the album
    const handleSubmit = (e)=>{
       e.preventDefault();
      let obj={
         id:id,
         title:title,
          userId:id
      }
       dispatch(addPost({obj}))
       setTitle('');
       setId('');
    }
    const handleId=(id)=>{
      setId(id)
    }

    //get post function to get the post with different ids
      const display = (id)=>{
       dispatch(fetchPost({id}));
      }
  return (
<>
<FormControl>
  <FormLabel htmlFor='email'>ID</FormLabel>
  <Input id='email' type='number' value={id}  onChange={(e)=>handleId(e.target.value)}/>
  <FormLabel htmlFor='email'>Title</FormLabel>
  <Input id='email' type='text' value={title} onChange={(e)=>handleChange(id,e.target.value)}></Input>
  <Button style={{backgroundColor:'magenta',marginTop:'10px'}} onClick={(e)=>handleSubmit(e)}>Create Post</Button>
</FormControl>
<ButtonGroup >
   
  {
    edit==true?<>
    {/* <Button style={{backgroundColor:'red',marginTop:'10px'}} value={id}  onClick={()=>dispatch(editPost({id:id,title:title}))}>
      Submit Edited
    </Button>  */}
    <Button style={{backgroundColor:'red',marginTop:'10px'}} value={id}  onClick={handleEdited}>
      Submit Edited
    </Button> 
    </>:
    <Button style={{backgroundColor:'red',marginTop:'10px'}} value={id} onClick={(e)=>display(e.target.value)}>
       Get Post
    </Button> 
  }
</ButtonGroup>
    
    <TableContainer>
  <Table variant='striped' colorScheme='teal'>
    <TableCaption></TableCaption>
    <Thead>
      <Tr>
        <Th>Id</Th>
        <Th>TItle</Th>
        <Th isNumeric>userId</Th>
        <Th>Delete</Th>
        <Th>Edit</Th>
      </Tr>
    </Thead>
    {
      array.length>0?
      post.map((item, index)=>{
    return(
      <Tr key={index}>
        <Td>{item.id}</Td>
        <Td>{item.title}</Td>
        <Td isNumeric>{item.userId}</Td>
    
        <Td><Button value={item.title} onClick={()=>dispatch(deletePost({
           id:post[index].id,
           title:post[index].title     
    }))}>Delete</Button></Td>
       <Td> 
       <Button value={item.id} onClick={(e)=>editDetails(index,item.title)}>Edit</Button>       
       </Td>
      </Tr>
      )})
      :
    ''
      } 
  </Table>
</TableContainer> 
</>
  );
}

export default App
