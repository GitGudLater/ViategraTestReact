import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { Input } from './components/Input/Input';
import { Output } from './components/Output/Output';

function App() {
  return (
    <div className="App app__container">
      <Input/>
      <Output/>
    </div>
  );
}

export default App;
