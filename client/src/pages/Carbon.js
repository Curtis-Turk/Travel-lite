import { useState, useEffect, useRef } from "react";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
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
import { geocodeLocation, callApi, getRandomInt } from "../api/locationFetch";
import emailjs from "@emailjs/browser";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import co2 from "../images/co2.png";
import email from "../images/email.png";

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

  const [stepData, setStepData] = useState([])

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
      setStepData(emptyArr);

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
    let dataArray = [...stepData];
    imgArray[index] = {
      img: "https://media2.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif?cid=790b7611c5ecd6019dbf660f422e47974be9b67adc5fca1a&rid=giphy.gif&ct=g",
    };
    setImgs(imgArray);
    callApi(step, google, geocoder)
      .then(
        (response) => {
          dataArray[index] = response
          setStepData(dataArray)
          checkForPhotoThenSet(imgArray, response, index, 0)
        }
      )
      .then((img) => setRender(img));
  };


  const checkForPhotoThenSet = (imgArray, response, index, indexToCheck) => {
    if(response[indexToCheck].photo === undefined){
      checkForPhotoThenSet(imgArray, response, indexToCheck + 1)
    }
    imgArray[index] = {
      img: response[indexToCheck].photo.images.medium.url,
      name: response[indexToCheck].name,
      url: response[indexToCheck].web_url,
      rating: response[indexToCheck].rating,
      caption: response[indexToCheck].photo.caption,
    }
    setImgs(imgArray)
  }

  const resetStepImg = (step, index) => {
    let newAttraction = stepData[index][getRandomInt(0,30)]
    let imgArray = [...imgs]
    imgArray[index] = {
      img: newAttraction.photo.images.medium.url,
      name: newAttraction.name,
      url: newAttraction.web_url,
      rating: newAttraction.rating,
      caption: newAttraction.photo.caption,
    }
    setImgs(imgArray)
  }

  const sendEmail = (e) => {
    e.preventDefault();
    let stopsStr = "";
    steps.forEach((step, index) => {
      if (imgs[index].name !== undefined) {
        stopsStr += `stop ${index}: ${step} - 
        ${imgs[index].name} 
        click for info ${imgs[index].url}`;
      } else {
        stopsStr += `stop ${index}: ${step}`;
      }
  })
    
    emailjs.send('service_s2yn5li', 'template_h5y4o1e', {
        from_name: "Travel-Lite Info",
        message: "Your trip from: " + sessionStorage.getItem("origin") + ", to: " + sessionStorage.getItem("destination") + `.Train emissions for this trip are: ${sessionStorage.getItem("trainEmissions")} plane emission for this trip are: ${sessionStorage.getItem("planeEmissions")}: total carbon saved: ${sessionStorage.getItem("planeEmissions") - sessionStorage.getItem("trainEmissions")}.  Stops are: ${stopsStr}`,
        reply_to: userEmail.current.value,
      }, 'eRYDEyB32PsKmMAZH')
      .then((result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  // ----- Render JSX ---- //
  return (
    <>
      <div className="font-mono pt-4">
        <div className="flex justify-center pb-2 mt-10">
          <h1 id="location">
            <span className="font-bold p-6 text-2xl">{locationA}</span>
            <span>
              <ArrowRightAltIcon />
            </span>
            <span className="font-bold p-6 text-2xl">{locationB}</span>
          </h1>
        </div>
        <div className="flex justify-center pt-10">
          <table className="">
            <thead>
              <tr>
                <th></th>
                <th className="text-xl">
                  <PublicIcon /> CO???
                </th>
                <th className="text-xl">
                  <RouteIcon /> Distance
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b-2 border-black">
                <td className="w-20 text-center">
                  <FlightTakeoffIcon />{" "}
                </td>

                <td className="w-48 h-20 text-center text-fuchsia-700 text-lg">
                  {planeEmissions.toLocaleString()} g{" "}
                </td>
                <td className="w-48 h-20 text-center text-lg">
                  {planeDistance.toLocaleString()} km
                </td>
              </tr>

              <td className="text-center">
                <TrainIcon />
              </td>

              <td className="w-48 h-20 text-center text-lg text-lime-600">
                {trainEmissions.toLocaleString()} g{" "}
              </td>
              <td className="w-48 h-20 text-center text-lg">
                {trainDistance.toLocaleString()}{" "}
              </td>
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-10">
          <img className="inline w-8" src={co2} alt="Co2" />
          <Link
            to="/facts"
            className="hover:bg-gray-200 ml-2 mr-3 text-lime-600"
          >
            Calculate
          </Link>
          my carbon emissions!
        </div>
        <div className="flex justify-center mb-10">
          <span>
            <img className="w-8 mr-2" src={email} alt="Email"></img>
          </span>
          <button
            onClick={toggleModal}
            className="hover:bg-gray-100 text-lime-600 mr-2 mb-2"
          >
            Email
          </button>{" "}
          me my adventure!
        </div>
        <Modal
          isOpen={isOpen}
          onRequestClose={toggleModal}
          contentLabel="My adventure"
        >
        <div>
        <div className="pt-20">
          <div className="text-black-400 underline pb-4 font-mono" > Trip details </div>
        </div>
          <div class="mb-4">
            <label class="pt-30 pr-50 text-gray-700 text-sm font-bold mb-2" for="email">
               Your email address: 
            </label>
            <input className= "block py-2 mr-3 my-3" ref={userEmail} placeholder="name@email.com"></input>
            <button class="bg-lime-500 hover:bg-lime-700 text-white font-bold py-2 px-4 mr-3 my-3 rounded-full" onClick={sendEmail}> Send </button>
            <button class="bg-lime-500 hover:bg-lime-700 text-white font-bold space-x-2 ml-3 my-3 py-2 px-4 rounded-full" onClick={toggleModal}> Close </button>
          </div>
        </div>
        </Modal>
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
          <div className="pl-2">
            <ForwardToInboxIcon
              className="hover:text-gray-400 cursor-pointer"
              type="submit"
              id="email_toggle"
              onClick={toggleModal}
            />
          </div>
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
                        className="font-mono"
                      >
                        {index + 1} - {step}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary" className="font-mono">
                        <button
                          onClick={() => {
                            fetchStepInfo(step, index);
                          }}
                        >
                          Click here for a trip idea
                        </button>
                        <img
                          src={imgs[index].img}
                          alt=""
                          loading="lazy"
                          className=" rounded align-middle border-none h-40 w-72 flex justify-center object-contain"
                        />
                        <br></br>
                        <button
                          onClick={() => {
                            resetStepImg(step, index);
                          }}
                        >
                          Try another idea
                        </button>
                      </Typography>
                      <Typography variant="body2" className="font-mono">
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
    </>
  );
}

export default Carbon;
