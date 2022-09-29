import { useState, useEffect } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import TrainIcon from "@mui/icons-material/Train";
import PublicIcon from "@mui/icons-material/Public";
import RouteIcon from "@mui/icons-material/Route";
import "../index.css";
import { useLocation } from "react-router-dom";

function Carbon() {
  const location = useLocation(); //get parameters from input homepage

  useEffect(() => {
    if (location.state != null) {
      updateMap(location.state.origin, location.state.destination);
    }
  }, [location.state]);
  const center = { lat: 51.597656, lng: -0.172282 };
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  // --------- Hooks --------- //
  const [directionRes, setDirectionRes] = useState(null);
  const [distance, setDistance] = useState("");
  const [planeEmissions, setPlaneEmissions] = useState("");
  const [trainEmissions, setTrainEmissions] = useState("");
  const [locationA, setLocationA] = useState("");
  const [locationB, setLocationB] = useState("");
  const [steps, setSteps] = useState("");

  // -------- Update Map and Calculate Route ---------- //

  const updateMap = async (origin, destination) => {
    const google = window.google;
    const directionsService = new google.maps.DirectionsService();

    const results = await directionsService.route({
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.TRANSIT,
      transitOptions: {
        modes: [google.maps.TransitMode.TRAIN],
      },
    });

    const currentRoute = results.routes[0].legs[0];
    let arr = [];
    currentRoute.steps.forEach((step) => {
      const string = step.instructions
        .replaceAll("Train towards", " ")
        .replaceAll("Walk to", " ");
      arr.push(string);
    });

    const stepList = arr.map((item, index) => {
      return (
        <li className="flex list-none" key={index}>
          <img
            alt=""
            className="w-10 h-10 "
            src={require("../../src/pin.png")}
          ></img>
          {item}
        </li>
      );
    });

    setSteps(stepList);

    let distanceM = results.routes[0].legs[0].distance.value;
    let distanceK = distanceM * 0.001;
    let totalPlaneEmissions = 0;
    let totalTrainEmissions = 0;

    if (distanceK != null && distanceK < 1000) {
      totalPlaneEmissions += 255 * distanceK;
    } else if (distanceK != null && distanceK > 1000) {
      totalPlaneEmissions += 240 * distanceK;
      setPlaneEmissions(totalPlaneEmissions);
    }

    if (distanceK != null) {
      totalTrainEmissions += 41 * distanceK;
      setTrainEmissions(totalTrainEmissions);
    }

    setDirectionRes(results);
    setDistance(currentRoute.distance.text);
    setLocationA(results.request.origin.query);
    setLocationB(results.request.destination.query);
  };

  // ----- Check if API is loading ----- //

  if (!isLoaded) {
    return <div>Loading..</div>;
  }

  // ----- Render JSX ---- //
  return (
    <>
      <div className="">
        <div className="flex justify-center pt-10">
          <table className="">
            <thead>
              <tr>
                <th className=""></th>
                <th className="">
                  <PublicIcon /> CO₂
                </th>
                <th className="">
                  <RouteIcon /> Distance
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b-2 border-black">
                <td className="w-20 text-center">
                  <FlightTakeoffIcon />{" "}
                </td>
                <td className="w-48 h-20 text-center">{planeEmissions} </td>
                <td className="w-48 h-20 text-center">{distance} </td>
              </tr>

              <td className="text-center">
                <TrainIcon />
              </td>
              <td className="w-48 h-20 text-center">{trainEmissions} </td>
              <td className="w-48 h-20 text-center">{distance} </td>
            </tbody>
          </table>
        </div>
        <div className="flex justify-center pt-6">
          <GoogleMap
            center={center}
            zoom={12}
            mapContainerClassName="w-8/12 h-96 rounded-lg"
          >
            <Marker position={center} />
            {directionRes && <DirectionsRenderer directions={directionRes} />}
          </GoogleMap>
        </div>

        <div className="pt-6 flex justify-center">
          <h3 className="text-green-600 underline font-poppins ">
            Your Trip Details
          </h3>
        </div>
        <div className="flex justify-center">
          {locationA}
          <span>
            <ArrowRightAltIcon />
          </span>
          {locationB}
        </div>
        <div className="flex justify-center">
          <ul className="list-none">{steps}</ul>
        </div>
      </div>
    </>
  );
}

export default Carbon;
