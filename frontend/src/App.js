import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import UserProvider from './UserProvider'

function App() {
  return (
    <div className="App">
      <UserProvider />
    </div>
  );
}

export default App;
