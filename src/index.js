import React from "react";
// import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ChakraProvider } from '@chakra-ui/react';
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import store from './redux/store';
import {Provider} from 'react-redux';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <Provider store={store}>
    <ChakraProvider>
      <App/>
    </ChakraProvider>
    </Provider>
  </StrictMode>
  
);
