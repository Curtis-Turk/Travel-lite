import ecobulb from "../images/ecobulb.png";
import cow from "../images/cow.png";
import seedling from "../images/seedling.png";
import faucet from "../images/faucet.png";
import coffee from "../images/coffee.png";
import streaming from "../images/streaming.png";
import tshirt from "../images/tshirt.png";
import { useState, useEffect } from "react";
import {
  savedEmissions,
  carbonComparisonCalc,
} from "../components/carbonComparison";
import { Link } from "react-router-dom";

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
  }, []);

  // const savedEmissions = () => {
  //   return (sessionStorage.getItem("planeEmissions") - sessionStorage.getItem("trainEmissions")).toLocaleString();
  // };

  // // const carbonComparisonCalc = () => {

  // // }
  // console.log(savedEmissions())

  // bulbs avg year usage(8h) 79,400g CO2 source: Gridwatch.co.uk - https://savinglightbulb.wordpress.com/2018/10/11/how-much-co2-does-a-light-bulb-create/
  // beef 50,000g per serving https://josephpoore.com/Science%20360%206392%20987%20-%20Accepted%20Manuscript.pdf
  // planting one tree = 160,000g CO2 saved (source: treesforlife)
  // one shower = 3066 g (per 15 min shower - the eco guide)
  // cup of coffee - 280g (UCL)

  return (
    <div className="flex justify-center mt-24">
      <div className="font-mono bg-zinc-100 border rounded-3xl flex justify-center box-border h-3/5 w-3/5 p-4 mb-20">
        <div className="flex justify-center"></div>
        <div className="mt-20 mb-10 ml-24 mr-24">
          <h1 className="inline text-center font-bold pb-4 text-3xl">
            Your trip from <span className="text-fuchsia-700">{origin}</span> to{" "}
            <span className="text-fuchsia-700">{destination}</span> will save
            you{" "}
            <span className="text-lime-600">
              {savedEmissions().toLocaleString()}
            </span>
            g of carbon emissions!{" "}
          </h1>
          <br></br>
          <br></br>
          <h2 className="flex justify-center pb-4 text-3xl mt-10">
            {" "}
            That's the equivalent of:
          </h2>
          <p className="text-2xl mb-10 mt-20">
            <img className="inline w-24" src={ecobulb} alt="Eco Bulb" /> Using{" "}
            <span className="text-lime-600">
              {carbonComparisonCalc("bulb")}
            </span>{" "}
            lightbulbs for a year
          </p>
          <p className="text-right text-2xl mb-10 mt-20">
            <img className="inline w-24 mr-5" src={cow} alt="Cow" /> Not eating
            beef for{" "}
            <span className="text-lime-600">
              {carbonComparisonCalc("beef")}
            </span>{" "}
            days
          </p>
          <p className="text-2xl mb-10 mt-20">
            <img className="inline w-24 mr-5" src={coffee} alt="Coffee" />
            Making{" "}
            <span className="text-lime-600">
              {carbonComparisonCalc("coffee")}
            </span>{" "}
            cups of coffee
          </p>
          <p className="text-right text-2xl mb-10 mt-20">
            <img className="inline w-24 mr-5" src={seedling} alt="Seedling" />{" "}
            Planting{" "}
            <span className="text-lime-600">
              {carbonComparisonCalc("tree")}
            </span>{" "}
            trees
          </p>
          <p className="text-2xl mb-10 mt-20">
            <img className="inline w-24 mr-5" src={faucet} alt="Faucet" />
            Showering{" "}
            <span className="text-lime-600">
              {carbonComparisonCalc("shower")}
            </span>{" "}
            times
          </p>
          <p className="text-right text-2xl mb-10 mt-20">
            <img className="inline w-24 mr-5" src={streaming} alt="Streaming" />
            Netflix and chilling for{" "}
            <span className="text-lime-600">
              {carbonComparisonCalc("netflix")}
            </span>{" "}
            hours
          </p>
          <br></br>
          <p className="text-left text-2xl mb-10 mt-20">
            <img className="inline w-24 mr-5" src={tshirt} alt="T-shirt" />
            Buying{" "}
            <span className="text-lime-600">
              {carbonComparisonCalc("tshirt")}
            </span>{" "}
            cotton t-shirts
          </p>
          <br></br>
          <br></br>
          <p className="text-center">
            View{" "}
            <Link to="/sources" className="hover:bg-gray-200">
              <span className="text-lime-600"> sources</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Facts;
