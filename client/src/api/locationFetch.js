import axios from "axios";

export const geocodeLocation = async (location, google, geocoder) => {
  console.log("making a geocode request");
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
      "X-RapidAPI-Key": "d48d3fc86dmsh420321da7e82d86p1682cbjsn42c7e0df5c9e",
      "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
    },
  };
};

export const callApi = async (step, google, geocoder) => {
  const location = await geocodeLocation(step, google, geocoder);
  const fetchOptions = locationOptions(location);
  axios
    .request(fetchOptions)
    .then((response) => {
      console.log(response.data.data[0]);
      return new Promise(response.data.data[0]);
      // .photo.images.small.url;
    })
    .catch((err) => {
      console.log(err, "failed fetch");
    });
};
