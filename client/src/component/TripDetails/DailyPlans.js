import moment from "moment";
import { NavLink } from "react-router-dom";

function DailyPlans({dailyPlan, index}) {

  return (
    <NavLink to={`/trip-details/${dailyPlan.trip_id}/${index}/${dailyPlan.id}`}>
      <div className="m-5 border border-black p-3 rounded-xl">
        <div className="flex flex-wrap">
        <h1>Day {index}</h1>
        <h2 className="w-max">{moment(dailyPlan.day).format("MM-DD-YYYY dddd")}</h2>
        <h2 className="w-max">{`Destination: ${dailyPlan.city} (${dailyPlan.country})`}</h2>
        </div>
      </div>
    </NavLink>
  );
}

export default DailyPlans;