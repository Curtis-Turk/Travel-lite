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

  // --------- Load API ---------//
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
    const service = new google.maps.places.PlacesService();
    const geocoder = new google.maps.Geocoder();

    let lat;
    let long;
    await geocoder.geocode(
      { address: "Paris" },
      function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          lat = results[0].geometry.location.lat();
          long = results[0].geometry.location.lng();
        } else {
          return "Could not retrieve coordinates for: location";
        }
      }
    );
    
    const location = new google.maps.LatLng(lat, long);
    const request = {
      location: location,
      radius: "200",
      type: ["restaurant"],
    };
    console.log(request);

    service.nearbySearch(request, function (response, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        console.log(response);
      }
    });

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
        <li className="flex list-none pt-2 pr-4" key={index}>
          <img
            alt=""
            className="w-8 h-8 "
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
      setPlaneEmissions(totalPlaneEmissions.toFixed(2));
    } else if (distanceK != null && distanceK > 1000) {
      totalPlaneEmissions += 240 * distanceK;
      setPlaneEmissions(totalPlaneEmissions.toFixed(2));
    }

    if (distanceK != null) {
      totalTrainEmissions += 41 * distanceK;
      setTrainEmissions(totalTrainEmissions.toFixed(2));
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
                <th></th>
                <th>
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
                <td className="w-48 h-20 text-center text-red-500">
                  {planeEmissions}{" "}
                </td>
                <td className="w-48 h-20 text-center">{distance} </td>
              </tr>

              <td className="text-center">
                <TrainIcon />
              </td>
              <td className="w-48 h-20 text-center  text-green-400">
                {trainEmissions}{" "}
              </td>
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
          <h3 className="text-green-600 underline font-poppins pb-4 font-bold ">
            Your Trip Details
          </h3>
        </div>
        <div className="flex justify-center pb-2">
          <p>
            {locationA}
            <span>
              <ArrowRightAltIcon />
              <ArrowRightAltIcon />
              <ArrowRightAltIcon />
              <ArrowRightAltIcon />
            </span>
            {locationB}
          </p>
        </div>
        <div className="flex justify-center">
          <ul className=" flex list-none">{steps}</ul>
        </div>
      </div>
    </>
  );
}

export default Carbon;
