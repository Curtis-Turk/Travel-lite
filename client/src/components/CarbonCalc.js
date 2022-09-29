const carbonCalculator = (transport, distanceKM) => {
  //Figures from https://ourworldindata.org/travel-carbon-footprint
  //TotalEmissions are in g per person
  let totalEmissions = 0;
  if (transport === "plane") {
    //short haul flight
    if (distanceKM < 1000) {
      // 255 ave emissions for short haul
      totalEmissions += 255 * distanceKM;
    } else if (distanceKM > 1000) {
      // 240 ave emissions for long haul
      totalEmissions += 240 * distanceKM;
    }
  } else if (transport === "train") {
    // 41 ave emissions for rail service in uk/europe (can be improved with renewables)
    totalEmissions += 41 * distanceKM;
  }
  return totalEmissions;
};
