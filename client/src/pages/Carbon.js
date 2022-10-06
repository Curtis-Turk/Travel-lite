import { useState, useEffect, useLayoutEffect, useRef } from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import "../index.css";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import TrainIcon from "@mui/icons-material/Train";
import PublicIcon from "@mui/icons-material/Public";
import RouteIcon from "@mui/icons-material/Route";
import "../index.css";
import { useNavigate } from "react-router-dom";
import { trainCalculator, planeCalculator } from "../components/CarbonCalc";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { geocodeLocation, callApi } from "../api/locationFetch";
import emailjs from '@emailjs/browser';
import Modal from "react-modal";

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
  const [google, setGoogle] = useState();
  const [geocoder, setGeocoder] = useState();
  const [imgs, setImgs] = useState("");
  const [render, setRender] = useState("");
  const [runUpdateMap, setRunUpdateMap] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // let tripDetails = {};



  const userEmail = useRef();

  function toggleModal() {
    setIsOpen(!isOpen);
  }

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

  const navigate = useNavigate();

  // -------- Update Map and Calculate Route ---------- //
  const updateMap = async (origin, destination) => {
    setRunUpdateMap(true);

    const google = window.google;
    setGoogle(google);
    const geocoder = new google.maps.Geocoder();
    setGeocoder(geocoder);

    const directionsService = new google.maps.DirectionsService();
    let navigation = null;
    try {
      navigation = await directionsService.route({
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.TRANSIT,
        transitOptions: {
          modes: [google.maps.TransitMode.TRAIN],
        },
      });
    } catch (error) {
      navigate("/error");
    }

    if (navigation != null) {
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
      const emptyArr = stepArr.map((step) => (step = ""));
      setImgs(emptyArr);

      // --------- Set Route Comparison details --------- //
      const planeDistanceCalc = async () => {
        return [
          await geocodeLocation(origin, google, geocoder),
          await geocodeLocation(destination, google, geocoder),
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

      setTrainDistance(currentRoute.distance.text);
      let trainDistanceKM = navigation.routes[0].legs[0].distance.value / 1000;
      sessionStorage.setItem(
        "trainEmissions",
        Math.round(trainCalculator(trainDistanceKM))
      );
      setTrainEmissions(Math.round(trainCalculator(trainDistanceKM)));
    }
  };
  sessionStorage.setItem("planeEmissions", planeCalculator(planeDistance));

  // ----- Check if API is loading ----- //
  if (!isLoaded) {
    return <div>Loading..</div>;
  }

  const fetchStepInfo = (step, index) => {
    let imgArray = [...imgs];
    imgArray[index] = {
      img: " https://media2.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif?cid=790b7611c5ecd6019dbf660f422e47974be9b67adc5fca1a&rid=giphy.gif&ct=g",
    };
    setImgs(imgArray);
    callApi(step, google, geocoder)
      .then(
        (response) => 
          // console.log(response),
          (imgArray[index] = {
            img: response.photo.images.medium.url,
            name: response.name,
            url: response.web_url,
            rating: response.rating,
            caption: response.photo.caption,
          }),
        setImgs(imgArray)
      )
      .then((img) => setRender(img));
  };

  console.log(imgs);


  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.send('service_s2yn5li', 'template_h5y4o1e', {
        from_name: "Travel-Lite Info",
        message: "Your trip: " + sessionStorage.getItem("origin") + " - " + sessionStorage.getItem("destination") +"\n" +
          "TrainEmission for this trip are: " + sessionStorage.getItem("trainEmissions") +"\n" +
          "Attractions " ,
        reply_to: userEmail.current.value,
      }, 'eRYDEyB32PsKmMAZH')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

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
                <td className="w-48 h-20 text-center text-fuchsia-700">
                  {planeEmissions} g{" "}
                </td>
                <td className="w-48 h-20 text-center">
                  {planeDistance.toLocaleString()} km
                </td>
              </tr>

              <td className="text-center">
                <TrainIcon />
              </td>
              <td className="w-48 h-20 text-center  text-lime-600">
                {trainEmissions} g{" "}
              </td>
              <td className="w-48 h-20 text-center">{trainDistance} </td>
            </tbody>
          </table>
        </div>
        <div className="w-full">
          <div className="flex justify-center pt-6">
            <GoogleMap
              zoom={12}
              mapContainerClassName="w-8/12 h-96 rounded-lg"
              options={{
                mapTypeControl: false,
              }}
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
            {steps?.map((step, index) => {
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
                        {index + 1} - {step}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        <img
                          src={imgs[index].img}
                          alt=""
                          loading="lazy"
                          className=" rounded align-middle border-none h-40 w-72 flex justify-center object-fit"
                        />

                        <button
                          onClick={() => {
                            fetchStepInfo(step, index);
                          }}
                        >
                          Click here for a trip idea
                        </button>
                      </Typography>
                      <Typography variant="body2">
                        <br />
                        {/* {imgs[index].caption} */}
                        {imgs[index].name}
                        <br />
                        <br />
                        <a href={imgs[index].url}>Find out more</a>
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
      
      <button onClick={toggleModal}>Send Trip Details</button>
  
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My adventure"
      >
        <div>My trip details.</div>
        <input ref={userEmail} placeholder="name@email.com"></input>
        <button onClick={sendEmail}> Send  </button>
        <button onClick={toggleModal}> Close </button>
      </Modal>

    </>
  );
}

export default Carbon;
