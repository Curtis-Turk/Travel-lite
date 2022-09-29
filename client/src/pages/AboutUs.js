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
        This project endeavors to help reduce the impact on the environment by
        adopting reduced carbon travel habits
      </p>
      <br></br>
      <h2>How does it work?</h2>
      <p>
        To help inspire people to choose alternatives to plane travel our site
        will give insights into the different methods of transport. Whilst also
        giving some inspiration for an adventure to have along the way.
      </p>
      <br></br>
      <h2>Meet the team</h2>
      <div class="container flex">
        <img class="w-1/5" src={eve} alt="Evelina" />
        <img class="w-1/5" src={alex} alt="Alexandra" />
        <img class="w-1/5" src={brij} alt="Brijesh" />
        <img class="w-1/5" src={curt} alt="Curtis" />
        <img class="w-1/5" src={syed} alt="Syed" />
      </div>
    </div>
  );
}

export default AboutUs;
