import axios from "axios";

const URL =
  "https://travel-advisor.p.rapidapi.com/attractions/list-in-boundary";

const options = {
  method: "GET",
  params: {
    tr_longitude: "109.262909",
    tr_latitude: "12.346705",
    bl_longitude: "109.095887",
    bl_latitude: "12.113245",
  },
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_TRAVEL_ADVISORAPI,
    "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
  },
};

export const getData = async () => {
  try {
    const {
      data: { data },
    } = await axios.get(URL, options);

    return data;
  } catch (err) {
    console.log(err);
  }
};
