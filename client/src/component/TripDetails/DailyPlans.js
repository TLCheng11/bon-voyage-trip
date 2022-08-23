import moment from "moment";
import { NavLink } from "react-router-dom";

function DailyPlans({dailyPlan, index}) {

  return (
    <NavLink to={`/trip-details/${dailyPlan.trip_id}/${index}/${dailyPlan.id}`}>
      <div className="m-5 border border-black p-3 rounded-xl">
        <h1>Day {index}</h1>
        <h2 className="w-max">{moment(dailyPlan.day).format("YYYY-MM-DD")}</h2>
        <h2 className="w-max">{`Destination: ${dailyPlan.city} (${dailyPlan.country})`}</h2>
      </div>
    </NavLink>
  );
}

export default DailyPlans;