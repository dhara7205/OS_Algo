
const GanttChart = ({ executingProcesses }) => {
  // console.log(executingProcesses);
  // executingProcesses.shift();
  return (
    <div style={{ overflowX: 'auto', margin: '20px 0' }}>
      <h1 className='text-3xl text-white pb-5 font-semibold mt-7'>Gantt Chart</h1>
      <table style={{ borderCollapse: 'collapse', width: '100%', borderRadius: '8px', background: 'white' }}>
        <thead>
          <tr>
            
          </tr>
        </thead>
        <tbody>
          <tr>
            {executingProcesses.map((process , index) => (
              <td key={index} style={{ border: '1px solid black', padding: '8px', color: 'black' }}>{process}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default GanttChart;
