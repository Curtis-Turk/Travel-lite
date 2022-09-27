import { useState, useRef } from "react";
import styled from "styled-components";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import { Autocomplete, DirectionsRenderer, DirectionsService } from "@react-google-maps/api";

const center = { lat: 51.597656, lng: -0.172282 };

function Home() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [directionRes, setDirectionRes] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  const origin = useRef();
  const destination = useRef();

  const calculateRoute = async () => {
    console.log(origin.current.value);
    if (origin.current.value === "" || destination.current.value === "") {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: origin.current.value,
      destination: destination.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.TRANSIT,
    });
    console.log(results.travelMode);
    setDirectionRes(results);
    setDistance(results.routes[0].legs[0].distance.value);
    setDuration(results.routes[0].legs[0].distance.value);
  };

  if (isLoaded) {
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
          <h4>Distance:</h4>
          <h4>Duration:</h4>
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

