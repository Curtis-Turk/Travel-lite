import { useState, useRef } from "react";
import styled from "styled-components";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import SearchIcon from "@mui/icons-material/Search";
import Container from "@mui/material/Container";
import { Autocomplete, DirectionsRenderer } from "@react-google-maps/api";

const center = { lat: 51.597656, lng: -0.172282 };

function Home() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [directionRes, setDirectionRes] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [travel_stops, setTravel_stops] = useState("");

  const origin = useRef();
  const destination = useRef();

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
    const currentRoute = results.routes[0].legs[0];
    // for (let i = 0; i < currentRoute.steps.length; i++) {
    //   console.log(currentRoute.steps[i].transit);
    // }

    console.log(currentRoute.steps[0].transit.arrival_stop.name);
    setDirectionRes(results);
    setDistance(currentRoute.distance.text);
    setDuration(currentRoute.duration.text);
    setTravel_stops(currentRoute.steps[0].transit.arrival_stop.name);
  };

  if (!isLoaded) {
    return <div>Loading..</div>;
  }
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

export default Home;

const Maps = styled.div`
  position: absolute;
  left: 0;
  top: 0;
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
