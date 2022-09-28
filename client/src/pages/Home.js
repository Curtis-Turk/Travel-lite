import { React, useRef } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import { Autocomplete } from "@react-google-maps/api";
import { useJsApiLoader } from "@react-google-maps/api";

function Home() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCvr2cHZzcc77lX8WgKqRWGBn8wzrdXIAA",
    libraries: ["places"],
  });

  const origin = useRef();
  const destination = useRef();

  // ----- Check if API is loading ----- //

  if (!isLoaded) {
    return <div>Loading..</div>;
  }

  const setRoute = async () => {
    if (origin.current.value === "" || destination.current.value === "") {
      return;
    }
    // we want to redirect to /carbon with origin.current.value and destination.c.v
    // props.origin.current.value
  };

  return (
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

      <SearchIcon type="submit" onClick={setRoute} />
    </Search>
  );
}

export default Home;

const Search = styled.div`
  padding: 4px;
  background-color: transparent;
  display: flex;

  > .MuiSvgIcon-root {
    cursor: pointer;
  }
`;
