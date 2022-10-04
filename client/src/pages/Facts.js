import ecobulb from "../images/ecobulb.png";
import cow from "../images/cow.png";
import seedling from "../images/seedling.png";
import faucet from "../images/faucet.png";
import house from "../images/house.png";
import { useState, useEffect } from "react";

function Facts() {

  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [trainEmissions, setTrainEmissions] = useState("");
  const [planeEmissions, setPlaneEmissions] = useState("");

  useEffect(() => {
    setOrigin(sessionStorage.getItem("origin"));
    setDestination(sessionStorage.getItem("destination"));
    setTrainEmissions(sessionStorage.getItem("trainEmissions"));
    setPlaneEmissions(sessionStorage.getItem("planeEmissions"));
    
    console.log(planeEmissions)
    console.log(trainEmissions)
    // setPlaneEmissions(planeCalculator(planeDistance));
  }, []);

  return (
    <div className="flex justify-center mt-24">
      <div className="bg-zinc-100 border rounded-3xl flex justify-center box-border h-2/3 w-2/3 p-4 mb-40">
        <div className="font-mono">
          <div className="flex justify-center"></div>
          <div className="ml-24 mr-24">
            <h1 className="text-center flex justify-center font-bold pb-4 text-3xl mt-10">
              Your trip from {origin} to {destination} will save you {planeEmissions - trainEmissions} g carbon
              emissions! <br></br>
              <br></br>That's the equivalent of:
            </h1>
            <p className="text-2xl mb-10 mt-20">
              <img className="inline w-24" src={ecobulb} alt="Eco Bulb" /> Using
              __ lightbulbs
            </p>
            <p className="text-right text-2xl mb-10 mt-20">
              <img className="inline w-24 mr-5" src={cow} alt="Cow" /> Not eating
              beef for __ days
            </p>
            <p className="text-2xl mb-10 mt-20">
              <img className="inline w-24 mr-5" src={house} alt="House" /> Heating
              your home for __ days
            </p>
            <p className="text-right text-2xl mb-10 mt-20">
              <img className="inline w-24 mr-5" src={seedling} alt="Seedling" />{" "}
              Planting __ trees
            </p>
            <p className="text-2xl mb-10 mt-20">
              <img className="inline w-24 mr-5" src={faucet} alt="Faucet" /> __ showers
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Facts;
