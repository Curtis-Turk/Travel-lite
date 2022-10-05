export const savedEmissions = () => {
  return (sessionStorage.getItem("planeEmissions") - sessionStorage.getItem("trainEmissions"));
};

const items = {
  "tree": 160000,
  "bulb": 79400,
  "beef": 50000,
  "shower": 3066,
  "coffee": 280
};

export const carbonComparisonCalc = (item) => {
  return (savedEmissions() / items[item]).toFixed(1)
}
