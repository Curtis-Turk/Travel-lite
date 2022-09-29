import eve from "../images/Eve.jpg";
import alex from "../images/Alex.jpg";
import brij from "../images/Brij.jpg";
import curt from "../images/Curt.jpg";
import syed from "../images/Syed.jpg";
function AboutUs() {
  return (
    <div>
      <h1>About us</h1>
      <p>
        We are a small group of Makers students wanting to build something that
        we could be proud of
      </p>
      <br></br>
      <h2>Why we chose this?</h2>
      <p>
        This project endeavors to help reduce our Carbon Footprint by adopting
        reduced carbon travel habits
      </p>
      <br></br>
      <h2>How does it work?</h2>
      <p>
        To help inspire people to choose alternatives to plane travel our site
        will give insights into the impacts of different methods of transport.
        Whilst also giving some inspiration for an adventure to have along the
        way.
      </p>
      <br></br>
      <h2>Meet the team</h2>
      <div>
        <img src={eve} alt="Evelina" />
        <img src={alex} alt="Alexandra" />
        <img src={brij} alt="Brijesh" />
        <img src={curt} alt="Curtis" />
        <img src={syed} alt="Syed" />
      </div>
    </div>
  );
}

export default AboutUs;
