import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import SearchIcon from "@mui/icons-material/Search";
import Container from "@mui/material/Container";
import { Autocomplete, DirectionsRenderer } from "@react-google-maps/api";
import {useLocation, useNavigate} from 'react-router-dom';

function Carbon() {
  const location = useLocation(); //get parameters from input homepage
  const [originValue, setOriginValue] = useState("");
  const [destinationValue, setDestinationValue] = useState("");
  useEffect(() => {
 
    // console.log("Calling this");
    if (location.state != null) {
      setOriginValue(location.state.origin);
      setDestinationValue(location.state.destination);
      // console.log(location.state);
      updateMap(location.state.origin,location.state.destination);
    }

  }, [location.state]);
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
  const calculateRoute = () => {
      if (origin.current.value === "" || destination.current.value === "") {
        return;
      }
      updateMap(origin.current.value,destination.current.value);
  }

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
    console.log(results);
    const currentRoute = results.routes[0].legs[0];
    console.log(currentRoute.steps[0].transit.arrival_stop.name);
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
      <Maps>
        <Search>
          <Autocomplete>
            <input
              type="text"
              id="outlined-basic"
              label="From"
              variant="outlined"
              size="small"
              ref={origin}
              defaultValue={originValue} 
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
              defaultValue={destinationValue}
            />
          </Autocomplete>
          <SearchIcon type="submit" onClick={calculateRoute} />
        </Search>

        <Container>
          <h4>Distance: {distance}</h4>
          <h4>Duration: {duration}</h4>
          <h4>Stop: {travel_stops}</h4>
        </Container>

        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "97%" }}
        >
          <Marker position={center} />
          {directionRes && <DirectionsRenderer directions={directionRes} />}
        </GoogleMap>
      </Maps>
    </>
  );
}

export default Carbon;

// ----- Styled components (CSS) ------ //

const Maps = styled.div`
  position: absolute;
  left: 0;
  top: 60;
  height: 100%;
  width: 100%;
`;

const Search = styled.div`
  padding: 4px;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;

  > .MuiSvgIcon-root {
    cursor: pointer;
  }
`;
