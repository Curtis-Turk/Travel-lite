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
    "X-RapidAPI-Key": "8d6efa5f97mshcc1d444e24f8e6ap1b3862jsn7f82f6b9468d",
    "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
  },
};

export const getData = async () => {
  try {
    const {
      data: { data },
    } = await axios.get(URL, options);
    console.log(data)

    return data;
  } catch (err) {
    console.log(err);
  }
};
