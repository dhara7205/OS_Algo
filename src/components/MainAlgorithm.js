let completionTime = [];
// const processes = [
//   { id: 1, burstTime: 5 },
//   { id: 2, burstTime: 3 },
//   { id: 3, burstTime: 8 },
//   { id: 4, burstTime: 2 },
//   { id: 5, burstTime: 4 },
// ];


// function ProcessBlock({ id, name, isExecuting }) {
//   const styles = {
//     backgroundColor: isExecuting ? '#cc0000' : '#ddd',
//     border: '1px solid #ccc',
//     padding: '10px',
//     margin: '5px',
//     display: 'inline-block',
//   };

//   return (
//     <div style={styles}>
//       <b>Process {id}:</b> {name}
//     </div>
//   );
// }

async function roundRobin(processes, timeQuantum) {
    const queue = [...processes]; 
  
    let elapsedTime=0;
    let currentProcess;
  
    while (queue.length > 0) {
      currentProcess = queue.shift();
  
      console.log(`Process ${currentProcess.id} is running`);
      {processes.map((process) => (
        // <ProcessBlock
        //   key={process.id}
        //   id={process.id}
        //   name={process.name}
        //   isExecuting={process.id === currentProcess.id}
        // />
        console.log(process.id === currentProcess.id)
      ))}
      currentProcess.burstTime -= timeQuantum;
      elapsedTime+=Math.min(timeQuantum,currentProcess.burstTime);
      if (currentProcess.burstTime > 0) {
        queue.push(currentProcess);
      }
      else{
        console.log(currentProcess.id);
        console.log(elapsedTime);
        completionTime.push( {"id":currentProcess.id , "time":elapsedTime});
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    console.log("process complted");
    for(let i=0 ; i<5 ; i++) {
        console.log("Process ID : " + completionTime[i].id + " Completion Time : " + completionTime[i].time);
    }
  }

  const timeQuantum = 2; 
  
 export default roundRobin;
