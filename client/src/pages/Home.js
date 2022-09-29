import { React, useRef } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Autocomplete } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import { useJsApiLoader } from "@react-google-maps/api";
import world from "../images/world.png";

function Home() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
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

    navigate("/carbon", {
      state: {
        origin: origin.current.value,
        destination: destination.current.value,
      },
    });
  };

  return (
    <div>
      <h1 class="flex justify-center font-bold">Where would you like to go?</h1>
      <br></br>
      <div className="flex justify-center ">
        <Autocomplete>
          <input
            type="text"
            id="outlined-basic"
            label="From"
            variant="outlined"
            size="small"
            placeholder="From"
            ref={origin}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </Autocomplete>
        <Autocomplete>
          <input
            type="text"
            id="outlined-basic"
            label="To"
            variant="outlined"
            size="small"
            placeholder="To"
            ref={destination}
            className="p-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </Autocomplete>
        <SearchIcon type="submit" onClick={setRoute} />
      </div>
      <div class="flex justify-center">
        <img src={world} alt="World" class="w-3/4 h-auto"></img>
      </div>
    </div>
  );
}

export default Home;
