import TripsCalender from "./TripsCalendar";

function Dashboard({dashboardProps}) {
  const {currentUser} = dashboardProps

  return (
    <div>
      <div>Dashboard</div>
      <div>hi {currentUser.username}</div>
      <div>
        <TripsCalender dashboardProps={dashboardProps} />
      </div>
    </div>
  );
}

export default Dashboard;