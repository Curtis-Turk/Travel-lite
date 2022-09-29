import { useEffect, useState } from "react";
import { getData } from "../api/adventure.js";

function Adventure() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    getData().then((data) => {
      console.log(data);
      setPlaces(data);
    });
  }, []);

  return <div>Adventure</div>;
}

export default Adventure;
