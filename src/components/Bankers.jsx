import React from 'react'
import {Button, Input} from "@nextui-org/react"
import {Code} from "@nextui-org/react";
import BankersAlgorithmTable from './BankersTable';
const Bankers = () => {
  const [n , setN] = React.useState('');
  const [m ,setM] = React.useState('');
  const [id, setId] = React.useState('');
  const [totalResource , setTotalResource] = React.useState();
  const [allocated, setAllocated] = React.useState([]);
  const [maximum , setMaximum] = React.useState([]);
  const [max,setMax] = React.useState([]);
  const [alloc , setAlloc] = React.useState([]); 
  const [safeSequence , setSafeSequence] = React.useState([]);
  const [display , setDisplay] = React.useState(false);
  const [needToSend , setNeedToSend] = React.useState([[]]);
  const [available , setAvailable] = React.useState([[]]);
  const handleSave = () => {
    let intAlloc = allocated.split(",").map(Number)
    alloc.push(intAlloc);
    setAlloc(alloc);
    let intMax = maximum.split(",").map(Number);
    max.push(intMax);
    setMax(max);
  }
 
  const handleBankers = () => {
    let total = totalResource.split(",").map(Number)
    let i,j,k;
    let test=0;
    let availHistory = [];
    setN(Number(n));
    setM(Number(m));
    let avail1 = [];
    for (i = 0; i < m; i++) {
        avail1[i] = 0;
    }

    // Initialize the 2D array with zeroes
    
    for (let i = 0; i < n; i++) {
      availHistory[i] = [];
      for (let j = 0; j < m; j++) {
        availHistory[i][j] = 0;
      }
    }

    // Function to update the availHistory array with the current avail values
    function updateAvailHistory(avail,n) {
   
    for (let j = 0; j < m; j++) {
      availHistory[n][j] = avail[j];
    }
    }
    
    let avail = [];
    
    for(i = 0; i < m; i++){
        for(j=0;j<n;j++){
        avail1[i] += alloc[j][i]; 
        }
    }
    
    function checkSafe(avail1,total){			//function to check if we will get safe sequence or not
      for(i=0;i<n;i++){
        if(avail1[i]>total[i]){
          return 0;
        }
      }
    
      return 1;
    }
    
    let CS = checkSafe(avail1,total);	
    
    if(CS == 1){						//CS value 1 then safe sequence
    for (i = 0; i < m; i++){      
       avail[i] = total[i] - avail1[i];
    }

    updateAvailHistory(avail,test);
    
    let f = [], ans = [], ind = 0;
    for (k = 0; k < n; k++) {
      f[k] = 0;
    }
    let need = [];
    for (i = 0; i < n; i++) {
      let need1 = [];
      for (j = 0; j < m; j++)
      need1.push(max[i][j] - alloc[i][j]);
      need.push(need1);
    }
    setNeedToSend(need);
    
    let y = 0;
    for (k = 0; k < n; k++) {
      for (i = 0; i < n; i++) {
      if (f[i] == 0) {
    
        let flag = 0;
        for (j = 0; j < m; j++) {
        if (need[i][j] > avail[j]){
          flag = 1;
          break;
        }
        }
    
        if (flag == 0) {
        ans[ind++] = i;
        for (y = 0; y < m; y++)
          avail[y] += alloc[i][y];
          if(test<n-1){
            test++;
            updateAvailHistory(avail,test);
              }
        f[i] = 1;
        }
      }
      }
    }
    
    //var sequence = "Following is the SAFE Sequence ";
    
    // for(i=0;i<n;i++){
    //   console.log(ans[i])
    // }
    setSafeSequence(ans);
    }
    else{								//CS value 0 no safe sequence
      console.log("No safe Sequence");
    }
    setAvailable(availHistory);
    setDisplay(true);
  }
  
  return (
    <div className='flex flex-col justify-center items-center'>
        <h1 className='text-4xl text-white font-semibold mt-3'>Banker's Algorithm</h1>
        <div className='flex items-center justify-center m-2 gap-5'>
        </div>
        <Input value={n} onValueChange={setN} label="Enter Number Of Processes" className='font-semibold w-4/12 p-3' defaultValue='null'></Input>
        <Input value={m} onValueChange={setM} label="Enter Number Of Resources" className='font-semibold w-4/12 p-3' defaultValue='null'></Input>
        <Input value={id} onValueChange={setId} label="Enter process ID" className='font-semibold w-4/12 p-3' defaultValue='null'></Input>
        {id!='' && <>
        <h1 className='text-white text-xl mt-5'>Allocated</h1>
        <Input className='w-4/12 mt-5 font-semibold text-xs' label={`Enter Allocated Array for Process ${id}`} onValueChange={setAllocated}></Input>
        </>}
        {id!='' && <><h1 className='text-white text-xl mt-5'>Maximum</h1>
        <Input className='w-4/12 mt-5 font-semibold' label={`Enter Maximum Array for Process ${id}`} onValueChange={setMaximum}></Input>
        <div className='flex gap-5 m-5 justify-center flex-wrap'>
        </div>
        <Button variant='ghost' color='primary' onClick={handleSave}>Save</Button></>}
        <Input label="Enter total resources array" className='font-semibold p-3 w-4/12 mt-4' onValueChange={setTotalResource}></Input>
        <Button variant='ghost' color='primary' className='mt-4' onClick={handleBankers}>Run Bankers</Button>
        {display && safeSequence.length==0 && <Code className='mt-5' color='danger'>No Safe Sequence Found!</Code>}
        {display && safeSequence.length!=0 && <h1 className='text-white mt-10 text- xl font-semibold'>Safe Sequence</h1>}
        <div className='flex gap-5'>
        {display && safeSequence.length!=0 && safeSequence.map((item,index) => 
          <Code key={index} className='mt-3' color='success'>
            {item}
          </Code>
        )}
        </div>
        <div className='mt-10'></div>
        {display && safeSequence.length!=0 && <BankersAlgorithmTable allocation={alloc} maxresource={max} need={needToSend} resource={Number(m)} process={Number(n)} available={available}/>}
    </div>
  )
}

export default Bankers