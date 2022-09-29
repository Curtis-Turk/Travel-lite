 import { React, useRef } from "react";
 import SearchIcon from "@mui/icons-material/Search";
 import { Autocomplete } from "@react-google-maps/api";
 import { useNavigate } from 'react-router-dom';
 import { useJsApiLoader} from "@react-google-maps/api";


 function Home() {

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCvr2cHZzcc77lX8WgKqRWGBn8wzrdXIAA",
    libraries: ["places"],
  });

  const origin = useRef();
  const destination = useRef();
  const navigate = useNavigate();

  // ----- Check if API is loading ----- //

  if (!isLoaded) {
    return <div>Loading..</div>;
  }

  const setRoute = async () => {
    if (origin.current.value === "" || destination.current.value === "") {
      return;
    }

    navigate( '/carbon',{ state:{origin: origin.current.value, destination: destination.current.value }}) 
   
  };

  return (
    <div>
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
    </div>
  );
}

export default Home;

