import Card from "./LinkCard";
import { Link } from "react-router-dom";
const Body = () => {
    return (
        <div className="flex gap-5 justify-around items-center h-[90vh]">
            <Link to="round-robin"><Card name="Round Robin"/></Link>
            <Link to="bankers"><Card name="Banker's Algorithm"/></Link>
            <Link to="scan-disk"><Card name="SCAN Disk Scheduling"/></Link>
            <Link to="mru-page-replacement"><Card name="MRU Page Replacement"/></Link>
        </div>
    )
}

export default Body;