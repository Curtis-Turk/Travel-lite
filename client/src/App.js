// import { GoogleMap } from "@react-google-maps/api";

function App() {
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

  //london to barcelona
  //Checked using https://www.icao.int/environmental-protection/Carbonoffset/Pages/default.aspx
  console.log(carbonCalculator("plane", 1139));
  console.log(carbonCalculator("train", 1142));
  //london to paris

  //   return (
  //     <div className="App">
  //       {/* <GoogleMap> */}
  //       <h1>Travel-lite</h1>
  //       <p>Carbon calc test</p>
  //       <p>From London to Barcelona by train</p>

  //       <p>From London to Barcelona by plane</p>
  //       {/* </GoogleMap> */}
  //     </div>
  //   );
}

App();
// export default App;
