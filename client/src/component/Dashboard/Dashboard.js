import TripsCalender from "./TripsCalendar";



function Dashboard({dashboardProps}) {
  const {currentUser} = dashboardProps
  
  return (
    <div className="Dashboardbg h-screen">
      <div className="h-full overflow-auto">
        <div className= "text-lgmax-w-[1240px] mx-auto py-16 px-4 text-left">
          <div className= "dboardtext">DASHBOARD</div>
          <div className= "dboardtext1">Welcome, {currentUser.username}</div>
          <div>
            <TripsCalender dashboardProps={dashboardProps} />
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default Dashboard;