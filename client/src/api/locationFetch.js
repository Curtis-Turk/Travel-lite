import axios from "axios";

export const geocodeLocation = async (location, google, geocoder) => {
  let latlngObj = {};
  await geocoder.geocode({ address: location }, (results, status) => {
    if (status === google.maps.GeocoderStatus.OK) {
      latlngObj = {
        lat: results[0].geometry.location.lat(),
        lng: results[0].geometry.location.lng(),
      };
    } else {
      return "Could not retrieve coordinates for: location";
    }
  });
  return latlngObj;
};

export const locationOptions = (locationLatLong) => {
  return {
    method: "GET",
    url: "https://travel-advisor.p.rapidapi.com/attractions/list-by-latlng",
    params: {
      longitude: locationLatLong.lng,
      latitude: locationLatLong.lat,
      lunit: "km",
      currency: "USD",
      lang: "en_US",
    },
    headers: {
      "X-RapidAPI-Key": "613284f43emshe3a15f7036c32e7p13062fjsn9ccc48546cd2",
      "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
    },
  };
};

export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

export const callApi = async (step, google, geocoder) => {
  const location = await geocodeLocation(step, google, geocoder);
  const fetchOptions = locationOptions(location);
  try {
    const { data: response } = await axios.request(fetchOptions); //use data destructuring to get data from the promise object
    return await response.data;
  } catch (error) {
    console.log(error);
  }
};
