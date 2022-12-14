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

  const setRoute = () => {
    if (origin.current.value === "" || destination.current.value === "") {
      return;
    }

    sessionStorage.setItem("origin", origin.current.value);
    sessionStorage.setItem("destination", destination.current.value);

    navigate("/carbon");
  };

  return (
    <div className="font-mono pt-12">
      <h1 className="flex justify-center font-bold pb-4 text-2xl">
        Where would you like to go?
      </h1>
      <div className="flex justify-center ">
        <div className="pr-3">
          <Autocomplete>
            <input
              type="text"
              id="outlined-basic1"
              label="From"
              variant="outlined"
              size="small"
              placeholder="From"
              ref={origin}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </Autocomplete>
        </div>
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
        <div className="pl-2 pt-2">
          <SearchIcon
            className="hover:text-gray-400 cursor-pointer"
            type="submit"
            id="submit_route"
            onClick={setRoute}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <img
          src={world}
          alt="World"
          className="object-contain w-2/6"
        ></img>
      </div>
      <div className="flex justify-center text-center text-xl">
        <p>Plan your adventure, see more of the world, 
          <br></br>
          <br></br>
          save the planet... <span className="text-3xl">????</span></p>
      </div>
    </div>

  );
}

export default Home;
