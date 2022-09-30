import axios from "axios";

const geocode = (place) => {
  axios
    .get("https://maps.googleapis.com/maps/api/geocode/json", {
      params: {
        address: place,
        key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      },
    })
    .then((response) => {
      // Log full response
      console.log(response.data.results[0].geometry.location);
    })
    .catch((error) => {
      console.log(error);
    });
};

export default geocode;
