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
import axios from "axios";
import { trainCalculator, planeCalculator } from "../components/CarbonCalc";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";

function Carbon() {
  const [libraries] = useState(["places"]);

  // --------- Load API ---------//

  const center = { lat: 51.597656, lng: -0.172282 };
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  // --------- Hooks --------- //
  const [directionRes, setDirectionRes] = useState(null);
  const [trainDistance, setTrainDistance] = useState("");
  const [planeDistance, setPlaneDistance] = useState("");
  const [planeEmissions, setPlaneEmissions] = useState("");
  const [trainEmissions, setTrainEmissions] = useState("");
  const [locationA, setLocationA] = useState("");
  const [locationB, setLocationB] = useState("");
  const [steps, setSteps] = useState([]);

  const [imgs, setImgs] = useState([]);
  const [runUpdateMap, setRunUpdateMap] = useState(false);

  useEffect(() => {
    const destination = sessionStorage.getItem("destination");
    const origin = sessionStorage.getItem("origin");
    if (
      origin !== undefined &&
      destination !== undefined &&
      window.google !== undefined &&
      !runUpdateMap
    ) {
      updateMap(origin, destination);
    }
  });

  useEffect(() => {
    setPlaneEmissions(planeCalculator(planeDistance));
  }, [planeDistance]);

  // -------- Update Map and Calculate Route ---------- //
  const updateMap = async (origin, destination) => {
    setRunUpdateMap(true);
    const google = window.google;

    // Navigation
    const directionsService = new google.maps.DirectionsService();
    const navigation = await directionsService.route({
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.TRANSIT,
      transitOptions: {
        modes: [google.maps.TransitMode.TRAIN],
      },
    });

    setDirectionRes(navigation);
    setLocationA(navigation.request.origin.query);
    setLocationB(navigation.request.destination.query);

    // --------- Get navigation steps --------- //
    const currentRoute = navigation.routes[0].legs[0];
    let stepArr = [];

    currentRoute.steps.forEach((step) => {
      if (step.travel_mode === "TRANSIT") {
        stepArr.push(step.transit.arrival_stop.name);
      }
    });

    setSteps(stepArr);

    // --------- GeoCoder  --------- //
    const geocoder = new google.maps.Geocoder();

    const geocodeLocation = async (location) => {
      let latlngObj = {};
      await geocoder.geocode({ address: location }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          latlngObj = {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
          };
        } else {
          return "Could not retrieve coordinates for: location";
        }
      });

      return latlngObj;
    };

    // --------- Get information about places  --------- //
    const locationOptions = (locationLatLong) => {
      return {
        method: "GET",
        url: "https://travel-advisor.p.rapidapi.com/attractions/list-by-latlng",
        params: {
          longitude: locationLatLong.lng,
          latitude: locationLatLong.lat,
          lunit: "km",
          currency: "USD",
          lang: "en_US",
        },
        headers: {
          "X-RapidAPI-Key":
            "b9a2e608eamsh6da9fcbe7b3f84ep1e3c40jsn2484d22a233f",
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        },
      };
    };

    const getRandomInt = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min);
    };

   
    let imgUrlArr = [];
    stepArr.map((step) => {
    geocodeLocation(step).then((data) =>
      axios
        .request(locationOptions(data))
        .then((response) => {
          let rdmIndex = getRandomInt(0, response.data.data.length);
          imgUrlArr.push(response.data.data[rdmIndex].photo.images.small.url);
        })
        .catch((error) => {
          console.error(error);
        })
    );
    });

    setTimeout(() => {
      console.log(imgUrlArr, "set timeout");
    }, 6000);
    setImgs(imgUrlArr);
    
    console.log(stepArr);

    // const imgFunc = () => {
    //   const imgStops = [];
    //   stepArr.map((step, index) => {
    //     imgUrlArr.map((img, imgIdx) => {
    //       if (index === imgIdx) {
    //         console.log(step);
    //         imgStops.push({ stop: step, image: img });
    //         console.log(imgStops);
    //       } else {
    //         console.log("This doesn't work");
    //       }
    //     });
    //   });
    //   console.log(imgStops);
    // };

    // imgFunc();

  
    // --------- Work out plane distance + emissions --------- //
    const planeDistanceCalc = async () => {
      return [
        await geocodeLocation(origin),
        await geocodeLocation(destination),
      ];
    };

    planeDistanceCalc().then((data) =>
      setPlaneDistance(
        (
          google.maps.geometry.spherical.computeDistanceBetween(
            data[0],
            data[1]
          ) / 1000
        ).toFixed()
      )
    );

    // --------- Work out train distance + emissions --------- //
    setTrainDistance(currentRoute.distance.text);
    let trainDistanceKM = navigation.routes[0].legs[0].distance.value / 1000;
    sessionStorage.setItem(
      "trainEmissions",
      Math.round(trainCalculator(trainDistanceKM))
    );
    setTrainEmissions(Math.round(trainCalculator(trainDistanceKM)));
    sessionStorage.setItem("planeEmissions", planeCalculator(planeDistance));
  };

  // ----- Check if API is loading ----- //
  if (!isLoaded) {
    return <div>Loading..</div>;
  }

  // ----- Render JSX ---- //
  return (
    <>
      <div className="font-mono pt-4">
        <div className="flex justify-center pb-2">
          <h1 id="location">
            <span className="p-6 text-xl">{locationA}</span>
            <span>
              <ArrowRightAltIcon />
            </span>
            <span className="p-6 text-xl">{locationB}</span>
          </h1>
        </div>
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
                  {planeEmissions} g{" "}
                </td>
                <td className="w-48 h-20 text-center">{planeDistance} km</td>
              </tr>

              <td className="text-center">
                <TrainIcon />
              </td>
              <td className="w-48 h-20 text-center  text-green-400">
                {trainEmissions} g{" "}
              </td>
              <td className="w-48 h-20 text-center">{trainDistance} </td>
            </tbody>
          </table>
        </div>

        <div className="w-full">
          <div className="flex justify-center pt-6">
            <GoogleMap
              // center={center}
              zoom={12}
              mapContainerClassName="w-8/12 h-96 rounded-lg"
            >
              <Marker position={center} />
              {directionRes && <DirectionsRenderer directions={directionRes} />}
            </GoogleMap>
          </div>
        </div>
        <div className="pt-6 flex justify-center">
          <h3 className="text-black-400 underline pb-4 font-mono ">
            Your Trip Details
          </h3>
        </div>

        <div className="flex justify-center">
          <ul className=" flex list-none">
            {steps?.map((item, index) => {
              return (
                <>
                  <Card className="pb-4" sx={{ minWidth: 275 }} key={index}>
                    <CardContent>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                        id="step_list"
                      >
                        {index + 1} - {item}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {/* img */}
                      </Typography>
                      <CardMedia component="img" height="194" image="" alt="" />
                      <Typography variant="body2">
                        Desription/URL/TripAdvisorLink
                        <br />
                        {'"Review quote"'}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small"></Button>
                    </CardActions>
                  </Card>
                </>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Carbon;
