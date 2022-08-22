import TripsCalender from "./TripsCalendar";
import MapHolder from "../Maps/MapHolder"

function Dashboard({dashboardProps}) {
  const {currentUser, coordinates} = dashboardProps

  return (
    <div>
      <div>Dashboard</div>
      <div>hi {currentUser.username}</div>
      <div>
        <TripsCalender dashboardProps={dashboardProps} />
      </div>
      <MapHolder coordinates={coordinates} />
    </div>
  );
}

export default Dashboard;