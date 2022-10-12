import { useEffect, useState } from 'react';
import './App.css';
import List from './List';


function App() {
  const [isClicked,setIsClicked] = useState(false)

  

  let changeState = ()=>{
    setIsClicked(!isClicked)
  }

  
  
  return (
    <>
    <button onClick={(e)=>{
      e.stopPropagation()
      changeState()
      
    }}>{isClicked?"Close" :"Open"}</button>
    <div>
      {isClicked&&<List changeState={changeState} isClicked={isClicked}/>}
    </div>
     
    </>
  )
}

export default App;
