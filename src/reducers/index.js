import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';

export const fetchPost=createAsyncThunk(
     "post/fetchPost",
     async({id})=>{
    return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then((response) => response.json())   
    }
);
export const editPost=createAsyncThunk(
    "post/updatePost",
    async({id,title})=>{
     return   fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
              title,
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
            .then((response) => response.json())
            .then((json) => console.log('body',json));
        }
    )


export const addPost=createAsyncThunk(
    "post/addPost",
    async({obj})=>{
   return fetch(`https://jsonplaceholder.typicode.com/posts/1`, {
    method: 'PATCH',
    body: JSON.stringify({
    id:obj.id,
      title: obj.title,
      userId:obj.userId
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    // .then((json) => console.log(json));
    }
)

export const deletePost=createAsyncThunk(
    "post/deletePost",
    async({title,id,number})=>{
        // console.log('number',number)
   return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
       title,
       number:number
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    //  .then((number) => console.log(number));
    }
)



export const postSlice = createSlice({
    name:"post",
    initialState:{
        post:[],
        error:null,
       
    },
    extraReducers:{
        [fetchPost.fulfilled]:(state, action)=>{
            console.log('action',action.payload)
         state.post=[...state.post,action.payload];
        },
        [fetchPost.rejected]:(state, action) => {
            state.error = action.payload;
        },
        [addPost.fulfilled]:(state, action)=>{
            // console.log('actionadd',action.payload)
            state.post=[...state.post,action.payload];
           },
           [addPost.rejected]:(state, action) => {
               state.error = action.payload;
           },
           [editPost.fulfilled]:(state, action)=>{
             
            // let result=action.payload;
            // console.log('result',result.title)
            console.log('action',action.payload)
            let newpost=[]
           newpost = state.post.map((item)=>{
                if(action.payload===item){
                  item=action.payload;
                  console.log('item',action.payload)
                 return newpost.push(item)
                }
                else
                  return newpost.push(item);
            })
            //    state.post=newpost;
                console.log('new',state.post);
           },
           [editPost.rejected]:(state, action) => {
               state.error = action.payload;
           },

           [deletePost.fulfilled]:(state, action)=>{
        
            let result=action.payload;
            console.log('result',result.title)
            let newpost=[]
            state.post.filter((item)=>{
                if(action.payload.title!=item.title)
                 return newpost.push(item)
            })
            state.post=newpost;
            console.log('post',state.post)
            
           },
           [deletePost.rejected]:(state, action) => {
               state.error = action.payload;
           },
        
    }
});


// export const addSlice = createSlice({
//     name:"post",
//     initialState:{
//         post:[]
      
//     },
//     extraReducers:{
//         [fetchPost.fulfilled]:(state, action)=>{
//          state.post=[...state.post,action.payload];
//         },
//         [fetchPost.rejected]:(state, action) => {
//             state.error = action.payload;
//         }
//     }
// });
// export const {setEdit} = postSlice.actions;
export default postSlice.reducer;

