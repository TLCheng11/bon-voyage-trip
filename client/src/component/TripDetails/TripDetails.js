import { useEffect } from "react";
import { useParams } from "react-router-dom";

function TripDetails() {
  const params = useParams()

  useEffect(() => {
    fetch(`/trips/${params.id}`)
      .then(res => res.json())
      .then(console.log)
      .catch(console.error)
  }, []);

  return (
    <div>
      <div>hi</div>
      <div>{params.id}</div>
    </div>
  );
}

export default TripDetails;