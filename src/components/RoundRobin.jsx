import React from 'react'
import {Slider,Input,Button} from "@nextui-org/react";
import BasicTable from './BasicTable';
import GanttChart from './GanttChart';
const RoundRobin = () => {
  let completionTime = [];
  let turnaroundTime = [];
  let waitingTime = [];
  let burstTime = [];
  let processname = [];
  let arrivalTime = [];
  let btToPass = [];

  const [timeQuantam, setTimeQuantam] = React.useState(2);
  const [id,setId] = React.useState(1);
  const [aT,setAt] = React.useState(0);
  const [bT,setBt] = React.useState(0);
  const [executing,setExecuting] = React.useState(0);
  const [processes, setProcesses] = React.useState([]);
  const [completed,setCompleted] = React.useState(false);
  const [pName,setPname] = React.useState([]);
  const [passCT , setPassCT] = React.useState([]);
  const [passWT , setPassWT] = React.useState([]);
  const [passTAT , setPassTAT] = React.useState([]);
  const [passBT , setPassBT] = React.useState([]);
  const [passAT , setPassAT] = React.useState([]);
  const [executingProcesses, setExecutingProcesses] = React.useState([]);

  const handleClick = () => {
    setProcesses([...processes, { id , arrivalTime : aT, burstTime:bT }]);
    //console.log("Added Process");
  };

  
  const handleSimulate = async () => {
    roundRobin(processes,timeQuantam);
  }

  const handleReset = () => {
    setProcesses([]);
    completionTime = [];
    turnaroundTime = [];
    burstTime = [];
    waitingTime = [];
    setCompleted(false);
    setTimeQuantam(2);
  }

  const handleDelete = () => {
    setProcesses(processes.slice(0,-1))
  }
  
  // eslint-disable-next-line react/prop-types
  function ProcessBlock({ id, burstTime }) {
    const styles = {
      border: '1px solid #ccc',
    };
  
    return (
      <div style={styles} className={`flex-col p-3 rounded-xl ${executing==id ? 'glow-button' : ""} bg-white`}>
        <div>Process {id}</div>
        <div>Burst Time : {burstTime}</div>
      </div>
    );
  }


  async function roundRobin(processes, timeQuantum) {
    for (let i = 0; i < processes.length; i++) {
        const process = processes[i];
        burstTime.push({ id: process.id, time: process.burstTime });

    }
    
    const queue = [...processes]; 
    const readyQueue = [];

    // Sorting processes by arrival time
    queue.sort((a, b) => a.arrivalTime - b.arrivalTime);

    let elapsedTime = Number(queue[0].arrivalTime);
    //console.log(elapsedTime);
    // have to do something when there are no processes but still there in queue
  
    while (readyQueue.length > 0 || queue.length > 0) {
        // Move processes to ready queue if they have arrived
        while (queue.length > 0 && queue[0].arrivalTime <= elapsedTime) {
            readyQueue.push(queue.shift());
        }

        if (readyQueue.length === 0) {
            elapsedTime = queue[0].arrivalTime;
            continue;
        }

        const currentProcess = readyQueue.shift();
        
        //console.log(`Process ${currentProcess.id} is running`);
        setExecuting(currentProcess.id);
        // Update burst time
        const remainingBurstTime = Math.max(0, currentProcess.burstTime - timeQuantum);
        elapsedTime += Math.min(timeQuantum, currentProcess.burstTime);
        console.log("yoyoy string : " + elapsedTime);
        currentProcess.burstTime = remainingBurstTime;

        setExecutingProcesses((prevProcesses) => [
          ...prevProcesses,
          currentProcess.id, // Store only the process ID
        ]);

        if (currentProcess.burstTime > 0) {
            while (queue.length > 0 && queue[0].arrivalTime <= elapsedTime) {
            readyQueue.push(queue.shift());
        }
            readyQueue.push(currentProcess);
        } else {
            console.log(`Process ${currentProcess.id} completed at time ${elapsedTime}`);
            processname.push("Process " + currentProcess.id);
            arrivalTime.push(currentProcess.arrivalTime);
            btToPass.push(burstTime.find(entry => entry.id === currentProcess.id).time);
            completionTime.push({ id: currentProcess.id, time: elapsedTime });
            turnaroundTime.push({ id: currentProcess.id, time: elapsedTime - currentProcess.arrivalTime });
            waitingTime.push({ id: currentProcess.id, time: elapsedTime - currentProcess.arrivalTime - burstTime.find(entry => entry.id === currentProcess.id).time});
        }
        // executingProcesses.push(currentProcess.id);
        await new Promise(resolve => setTimeout(resolve, 1000));
    } 

    // Output completion times
    setCompleted(true);
    setPname(processname);
    setPassCT(completionTime);
    setPassAT(arrivalTime);
    setPassBT(btToPass);
    setPassTAT(turnaroundTime);
    setPassWT(waitingTime);
    console.log(executingProcesses);
    console.log("Process Execution Completed");
    for (let i = 0; i < completionTime.length; i++) {
      console.log(processname[i]);
        console.log(`Process ID: ${completionTime[i].id}, Completion Time: ${completionTime[i].time}`);
        console.log(`Process ID: ${turnaroundTime[i].id}, Turnaround Time: ${turnaroundTime[i].time}`);
        console.log(`Process ID: ${waitingTime[i].id}, Waiting Time: ${waitingTime[i].time}`);
    }
  }

  return (
    <div className='flex-col'>
      <h1 className='text-4xl text-white pb-5 font-semibold'>Round Robin Simulator</h1>
      <Slider
          label="Time Quantam"
          color={"primary"}
          size="sm"
          step={1}
          maxValue={10}
          minValue={1}
          defaultValue={0.7}
          className="text-white p-5"
          value={timeQuantam}
          onChange={setTimeQuantam}
        />
      <h1 className='text-2xl text-white font-semibold'>Tasks</h1>
      <div className='flex gap-10 justify-center mt-7'>
      <Input
          color={"default"}
          label="Process ID"
          className="max-w-[220px] font-bold"
          value={id}
          onValueChange={setId}
        />
        <Input
          color={"default"}
          label="Arrival Time"
          className="max-w-[220px] font-bold"
          value={aT}
          onValueChange={setAt}
        />
        <Input
          color={"default"}
          label="Burst Time"
          className="max-w-[220px] font-bold"
          value={bT}
          onValueChange={setBt}
        />
      </div>
      <div className='flex gap-5 justify-center mt-10'>
      <Button color="primary" variant="ghost" className='text-white' onClick={handleClick}>
        Add Task
      </Button> 
      <Button color="primary" variant="ghost" className='text-white' onClick={handleSimulate}>
        Simulate
      </Button>
      <Button color='primary' variant='ghost' onClick={handleDelete} className='text-white'>Remove</Button>
      <Button color='primary' variant='ghost' className='text-white' onClick={handleReset}>Reset</Button>
      </div> 
      <div className='flex flex-wrap gap-4 justify-center items-center h-[50vh]'>
          {processes.map((process) => ( // Use index as key
            <div key={process.id}>
              <ProcessBlock id={process.id} burstTime={process.burstTime}/>
            </div>
          ))}
      </div>
      {completed && <BasicTable name={pName} completionTime={passCT} waitingTime={passWT} turnaroundTime={passTAT} arrivalTime={passAT} burstTime={passBT}/>}
      {completed && <GanttChart executingProcesses={executingProcesses} />}
    </div> 
)
}

export default RoundRobin;