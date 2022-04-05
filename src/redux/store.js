import {configureStore} from "@reduxjs/toolkit";
import PostReducer from '../reducers/index';

//creat store and configure it in the store.js

export default configureStore({
    reducer:{
        app:PostReducer,
    },
});