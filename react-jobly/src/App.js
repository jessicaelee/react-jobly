import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import Routes from './Routes'
import Nav from './Nav'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
