import React, { useEffect, useRef, useState } from 'react'
import Child from './components/Child';

const App = () => {
  const [pass, setpass] = useState("");
  const [length, setlength] = useState(8);
  const [isNumber, setisNumber] = useState(false);
  const [isSpaical, setisSpaical] = useState(false)
  const passwordRef = useRef(null);

  function passwordgen(){
    let password = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(isNumber){
      str+="0123456789";
    }
    if(isSpaical){
      str+="!@#$%^&*[]?";
    }
    for(let i=0; i<length;i++){
      let ch =Math.floor(Math.random()*str.length+1);
      password+=str.charAt(ch);
    }
    setpass(password);
  }

  useEffect(() => {
    passwordgen();
  }, [isNumber,isSpaical,length])
  
  function cpoyPassword(){
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(pass);
  }

  return (
    <div className='w-full h-screen text-white bg-zinc-900 flex justify-center items-center'> 
    <div className='w-[70%] bg-zinc-600 min-h-[10%] rounded-md p-5 flex justify-center flex-col'>
      <p className='text-center text-3xl font-bold text-yellow-300'>Password Genrator</p>
      <div className='flex justify-center items-center'>
      <input className='w-[80%] px-5 py-2 rounded-md border-none text-black text-xl font-semibold' type="text" readOnly 
      value={pass}
      ref = {passwordRef}
      />
      <button className='bg-blue-600 rounded-md px-5 py-2 font-bold text-xl ml-3'onClick={cpoyPassword}>copy</button>
      </div>
      <div className='flex items-center text-xl ml-28 gap-14 mt-9'>
        <input type="range"
        min={6}
        max={100}
        onChange={(e)=>{
          setlength(e.target.value)
        }} />
        <label>length:[{length}]</label>
        <input className='w-7 h-8' type="checkbox" onChange={()=>{setisNumber((prev)=>!prev)}} />
        <label>Number</label>
        <input className='w-7 h-8' type="checkbox" onChange={()=>{setisSpaical((prev)=>!prev)}}/>
        <label>Spacail_char</label>
      </div>
    </div>
   </div>
  )
}

export default App