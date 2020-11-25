import './App.css';
import IncrementButton from './Button'
import DisplayValue from './Display'
import React, { useState}  from 'react'

function App() {
    const [counter,setCounter] =  useState(0);
    const incrementCounter = (incrementValue)=> {
        setCounter(counter+incrementValue)
    }

  return (
    <div className="App">
      <IncrementButton onClickHandler={incrementCounter} increment={1}></IncrementButton>
      <IncrementButton onClickHandler={incrementCounter} increment={5}></IncrementButton>
      <IncrementButton onClickHandler={incrementCounter} increment={10}></IncrementButton>
      <IncrementButton onClickHandler={incrementCounter} increment={100}></IncrementButton>
      <DisplayValue value={counter}></DisplayValue>
    </div>
  );
}

export default App;
