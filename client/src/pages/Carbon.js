import { useState, useRef } from "react";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import SearchIcon from "@mui/icons-material/Search";
import { Autocomplete, DirectionsRenderer } from "@react-google-maps/api";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import TrainIcon from "@mui/icons-material/Train";
import PublicIcon from "@mui/icons-material/Public";
import "../index.css";

function Carbon() {
  const center = { lat: 51.597656, lng: -0.172282 };
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  // --------- Hooks --------- //
  const [directionRes, setDirectionRes] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [locationA, setLocationA] = useState("");
  const [locationB, setLocationB] = useState("");
  const origin = useRef();
  const destination = useRef();

  // --------- Calculate route Api data ---------//
  const calculateRoute = async () => {
    if (origin.current.value === "" || destination.current.value === "") {
      return;
    }

    const google = window.google;
    const directionsService = new google.maps.DirectionsService();

    const results = await directionsService.route({
      origin: origin.current.value,
      destination: destination.current.value,
      travelMode: google.maps.TravelMode.TRANSIT,
      transitOptions: {
        modes: [google.maps.TransitMode.TRAIN],
      },
    });
    console.log(results);
    console.log(results.request.destination.query);
    const currentRoute = results.routes[0].legs[0];
    setDirectionRes(results);
    setDistance(currentRoute.distance.text);
    setDuration(currentRoute.duration.text);
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
        <div className="flex justify-center ">
          <Autocomplete>
            <input
              type="text"
              id="outlined-basic"
              label="From"
              variant="outlined"
              size="small"
              ref={origin}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </Autocomplete>
          <Autocomplete>
            <input
              type="text"
              id="outlined-basic"
              label="To"
              variant="outlined"
              size="small"
              ref={destination}
              className="p-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </Autocomplete>

          <SearchIcon type="submit" onClick={calculateRoute} />
        </div>

        <div className="flex justify-center pt-10">
          <table className="">
            <thead>
              <tr>
                <th className=""></th>
                <th className="">
                  <PublicIcon /> Co2
                </th>
                <th className="">
                  <AccessTimeIcon /> Time
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b-2 border-black">
                <td className="w-20 text-center">
                  <FlightTakeoffIcon />{" "}
                </td>
                <td className="w-48 h-20 text-center">{distance} </td>
                <td className="w-48 h-20 text-center">{duration} </td>
              </tr>

              <td className="text-center">
                <TrainIcon />
              </td>
              <td className="w-48 h-20 text-center">{distance} </td>
              <td className="w-48 h-20 text-center">{duration} </td>
            </tbody>
          </table>
        </div>
        <div className="flex justify-center">
          <GoogleMap
            center={center}
            zoom={12}
            mapContainerClassName="w-9/12 h-96 rounded-lg"
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
          {locationA} <span><ArrowRightAltIcon /></span> {locationB}
        </div>
      </div>
    </>
  );
}

export default Carbon;
