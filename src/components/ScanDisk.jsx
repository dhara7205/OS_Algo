import React from 'react'
import {Input , Button,Code , Autocomplete ,AutocompleteItem} from "@nextui-org/react";
import { Line } from 'react-chartjs-2';
import { CategoryScale, Chart, LineElement, LinearScale, PointElement, Colors } from 'chart.js';
Chart.defaults.color = '#FFFFFF';
Chart.defaults.backgroundColor = '#9BD0F5';
Chart.defaults.borderColor = '#005BC4';
Chart.register(CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Colors,
    );
const ScanDisk = () => {
        const [graph,setGraph] = React.useState([1]);
        
        const data = {
            labels: [0,1,2,3,4,5,6,7,8,9,10,11,12],
            datasets : [
                {
                    label : "demo",
                    data : graph,
                    fill : false,
                },
            ]
        }
    

    const options = {
        scales : {
            y : {
                type : "linear",
                beginAtZero : true,
            }
        },
       
    }
    const [diskSize , setDiskSize] = React.useState(200);
    const [seekSequence , setSeekSequence] = React.useState([]);
    const [seekValue , setSeekValue] = React.useState(0)
    const [headposition , setHeadPosition] = React.useState(50);
    const [seekDirection , setSeekDirection] = React.useState("")
    const [seekCount, setSeekCount] = React.useState(-1);
    const animals = [
        {
            label: "Left",
            value: "left",
        },
        {
            label : "Right",
            value : 'right'
        }
    ]
    const handleClick = () => {
        setSeekSequence([...seekSequence,Number(seekValue)])
        
    }
    const handleRemove = () => {
        setSeekSequence(seekSequence.slice(0,-1))
    }
    const handleReset = () => {
        setSeekSequence([]);
        setSeekValue(0);
        setDiskSize(200);
        setHeadPosition(50);
        setSeekCount(-1);
        setGraph([]);
    }

    async function scan(requestarray, head, direction, disk_size) {
        let seek_count = Number(0); // summation of distances
        let dist = 0;
        let count = 0;
        let seek_sequence = [head];
        let i;
    
        requestarray.sort((a, b) => a - b); // otherwise sorts as strings
        for(i = 0; i < requestarray.length; i++) {
            if (requestarray[i] > head) {
                count = i;
                break;
            }
        }
        if(i==requestarray.length){
            count=i;
        }
    
        // count is on start of right array
        if (direction == "right") {
            
            for (let i = 0; i < requestarray.length - count; i++) {
                
                dist = requestarray[count + i] - head;
                seek_count += dist;
                seek_sequence.push(requestarray[count + i]);
                head = requestarray[count + i];
            }
            // have to go till the end
           
            dist = disk_size - requestarray[requestarray.length - 1] - 1;
            seek_count += dist;
            seek_sequence.push(disk_size - 1);
            
            
            // jump to the other side of head(the original head)
            
            if(count!=0){
            dist = disk_size - requestarray[count - 1] - 1;
            seek_count += dist;
            seek_sequence.push(requestarray[count - 1]);
            
            head = requestarray[count - 1];
    
            for (let i = 0; i < count - 1; i++) {
                
                dist = head - requestarray[count - i - 2];
                seek_count += dist;
                seek_sequence.push(requestarray[count - i - 2]);
                
                head = requestarray[count - i - 2];
                
            }
            }
            // end
        }
        else if (direction == "left") {
            for (let i = 0; i < count; i++) {
                dist = head - requestarray[count - i - 1];
                seek_count += dist;
                seek_sequence.push(requestarray[count - i - 1]);
                head = requestarray[count - i - 1];
            }
            // have to go till the end
            dist = requestarray[0];
            seek_count += Number(dist);
            seek_sequence.push(0);
    
            if(count != requestarray.length){
            // jump to the other end 
            dist = requestarray[count];
            seek_count += Number(dist);
            seek_sequence.push(requestarray[count])
            head = requestarray[count]
    
            for (let i = count + 1; i < requestarray.length ; i++) {
                dist = requestarray[i] - head;
                seek_count += dist;
                seek_sequence.push(requestarray[i]);
                head = requestarray[i];
            }
            }
            // end
    
        }
        else {
            console.log("Please enter either 'left' or 'right'");
        }
 
        setGraph(seek_sequence);
        console.log("compplted")
        console.log(data.datasets[0].data)
        setSeekCount(seek_count);
        //console.log(seek_sequence);
        //console.log(seek_count);
    }
    
    let requestarray = [98, 183, 41, 122, 14, 124, 65, 67];
    // head is where the disk head is
    let head = 53;
    // direction also given by user
    let direction = "right";
    let disk_size = 200;

    const handleGenerate = () => {
        disk_size=Number(diskSize);
        head=Number(headposition);
        requestarray=seekSequence;
        direction=seekDirection;
        console.log(direction);
        scan(requestarray, head, direction, disk_size)
    }
    
  return (
    <div>
    <div className='flex flex-col justify-center items-center gap-5'>
        <h1 className='text-3xl text-white font-semibold mb-10'>Scan Disk Scheduling Algorithm</h1>
        <Input
        label="Disk Size"
        value={diskSize}
        onValueChange={setDiskSize}
        className="w-6/12 font-bold"
        />
        <Input label="Enter head position" className='font-bold w-6/12' value={headposition} onValueChange={setHeadPosition}></Input>
        <Autocomplete
        isRequired
        label="Seek Direction"
        defaultItems={animals}
        placeholder="Select a direction"
        defaultSelectedKey="cat"
        className="w-6/12 font-bold"
        selectedKey={seekDirection}
        onSelectionChange={setSeekDirection}
        >{(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}</Autocomplete>
        <div className='flex justify-between w-6/12 items-center gap-5'>
        <Input
        label="Enter Seek Value"
        value={seekValue}
        onValueChange={setSeekValue}
        className="font-bold"
        />
        <Button color="primary" variant="ghost" onClick={handleClick}>
        Add Value
        </Button>  
        </div>
        <div className='flex justify-evenly gap-5 w-6/12'>
        <Button variant='ghost' color='primary' onClick={handleReset}>Reset</Button>
        <Button variant='ghost' color='primary' onClick={handleRemove}>Remove</Button>
        <Button variant='ghost' color="primary" onClick={handleGenerate}>Generate</Button>
        </div>
    </div>
    <h1 className='text-white text-xl font-semibold pt-10 pb-0 mb-0'>Request Sequence</h1>
        <div className='flex justify-center text-2xl mt-3 gap-2'>
            {seekSequence.length===0 ? <Code color='danger'>EMPTY</Code> : seekSequence.map((item,index) => (<Code key={index} color="primary">{item}</Code>))}
        </div>
        {seekCount!=-1 ? <Code color="primary" className='text-xl text-white font-semibold m-10'>Seek Count : {seekCount}</Code>:null}
        <div>
            <h1 className='text-white mt-5 text-xl font-semibold'>Chart</h1>
            <Line data={data} options={options}/>
        </div>
    </div>
    
    
  )
}

export default ScanDisk