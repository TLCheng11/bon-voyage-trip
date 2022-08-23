import moment from "moment";

function DailyPlans({dailyPlan, index}) {

  return (
    <div 
      className="m-5 border border-black p-3 rounded-xl"
      onClick={console.log}
    >
      <h1>Day {index}</h1>
      <h2 className="w-max">{moment(dailyPlan.day).format("YYYY-MM-DD")}</h2>
      <h2 className="w-max">{`Destination: ${dailyPlan.city} (${dailyPlan.country})`}</h2>
    </div>
  );
}

export default DailyPlans;