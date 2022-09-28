import { useState, useRef } from "react";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import SearchIcon from "@mui/icons-material/Search";
import { Autocomplete, DirectionsRenderer } from "@react-google-maps/api";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TrainIcon from "@mui/icons-material/Train";
import PublicIcon from "@mui/icons-material/Public";

function Carbon() {
  const center = { lat: 51.597656, lng: -0.172282 };
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCvr2cHZzcc77lX8WgKqRWGBn8wzrdXIAA",
    libraries: ["places"],
  });

  // --------- Hooks --------- //
  const [directionRes, setDirectionRes] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [travel_stops, setTravel_stops] = useState("");
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
    const currentRoute = results.routes[0].legs[0];
    setDirectionRes(results);
    setDistance(currentRoute.distance.text);
    setDuration(currentRoute.duration.text);
    setTravel_stops(currentRoute.steps[0].transit.arrival_stop.name);
  };


  // ----- Check if API is loading ----- //

  if (!isLoaded) {
    return <div>Loading..</div>;
  }


  // ----- Render JSX ---- //
  return (
    <>
      <div className="">
        <div className="flex justify-center">
          <Autocomplete>
            <input
              type="text"
              id="outlined-basic"
              label="From"
              variant="outlined"
              size="small"
              ref={origin}
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
            />
          </Autocomplete>

          <SearchIcon type="submit" onClick={calculateRoute} />
        </div>

        <div class="flex justify-center pt-10">
          <table class="">
            <thead>
              <tr>
                <th class=""></th>
                <th class="">
                  <PublicIcon />
                </th>
                <th class="">
                  <AccessTimeIcon />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b-2 border-black">
                <td class="w-20 text-center">
                  <FlightTakeoffIcon />{" "}
                </td>
                <td class="w-48 h-20 text-center">{distance} Co2</td>
                <td class="w-48 h-20 text-center">{duration} hours</td>
              </tr>

              <td class="text-center">
                <TrainIcon />
              </td>
              <td class="w-48 h-20 text-center">{distance} miles</td>
              <td class="w-48 h-20 text-center">{duration} hours</td>
            </tbody>
          </table>
        </div>
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: "50%", height: "50%" }}
        >
          <Marker position={center} />
          {directionRes && <DirectionsRenderer directions={directionRes} />}
        </GoogleMap>
      </div>
    </>
  );
}

export default Carbon;