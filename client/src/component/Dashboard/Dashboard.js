import TripsCalender from "./TripsCalendar";
import MapHolder from "../Maps/MapHolder"
import { useState } from "react";

function Dashboard({dashboardProps}) {
  const {currentUser} = dashboardProps
  
  return (
  <div className="Dashboardbg">
    <div className= "text-lgmax-w-[1240px] mx-auto py-16 px-4 text-left">
      <div className= "dboardtext">DASHBOARD</div>
      <div>Welcome, {currentUser.username}</div>
      <div>
        <TripsCalender dashboardProps={dashboardProps} />
      </div>
    </div>
    </div>
  );
}

export default Dashboard;