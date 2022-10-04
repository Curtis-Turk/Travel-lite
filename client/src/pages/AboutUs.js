import eve from "../images/Eve.jpg";
import alex from "../images/Alex.jpg";
import brij from "../images/Brij.jpg";
import curt from "../images/Curt.jpg";
import syed from "../images/Syed.jpg";
import team from "../images/team.png";

function AboutUs() {
  return (
    <div className="flex justify-center mt-24">
      <div className="bg-zinc-100 border rounded-3xl flex justify-center box-border h-2/3 w-2/5 p-4 mb-20">
        <div className="font-mono">
          <div className="flex justify-center">
            <img
              src={team}
              alt="Team"
              className="object-contain w-3/5 h-3/5"
            ></img>
          </div>
          <div className="ml-24 mr-24">
            <div className="border-b-2 border-zinc-400">
              <h1 className="flex justify-center font-bold pb-4 text-3xl">
                About Us
              </h1>
              <p className="flex justify-center">Hi! 👋 </p>
              <p className="mb-10">
                <br></br>
                We're the faces behind Travel-lite: a small group of Makers
                students who are passionate about coding for good and helping
                contribute to a better, greener world!
              </p>
            </div>
            <br></br>
            <div className="border-b-2 border-zinc-400 mt-10">
              <h2 className="flex justify-center font-bold pb-4 text-2xl">
                Why did we choose this project?
              </h2>
              <p className="mb-10">
                This project endeavors to help reduce the impact on the
                environment by adopting reduced carbon travel habits.
              </p>
            </div>
            <div className="border-b-2 border-zinc-400 mt-10">
              <h2 className="flex justify-center font-bold pb-4 text-2xl">
                How does it work?
              </h2>
              <p className="mb-10">
                To encourage people to opt for alternative modes of transport to
                flying, our site compares the varying levels of carbon emissions
                emitted from plane versus train. We also help users plan their
                alternative adventure with suggested attractions and stop-overs!
              </p>
            </div>
          </div>
          <br></br>
          <h2 className="flex justify-center font-bold pb-4 text-2xl">
            Meet the team
          </h2>
          <div className="flex justify-center">
            <div className="w-3/5 grid grid-cols-3 gap-5">
              <img
                className="scale-100 hover:scale-110 ease-in duration-400 rounded-lg"
                src={eve}
                alt="Evelina"
              />
              <img
                className="scale-100 hover:scale-110 ease-in duration-400 rounded-lg"
                src={alex}
                alt="Alexandra"
              />
              <img
                className="scale-100 hover:scale-110 ease-in duration-400 rounded-lg"
                src={brij}
                alt="Brijesh"
              />
              <img
                className="ml-20 scale-100 hover:scale-110 ease-in duration-400 rounded-lg"
                src={curt}
                alt="Curtis"
              />
              <img
                className="ml-20 scale-100 hover:scale-110 ease-in duration-400 rounded-lg"
                src={syed}
                alt="Syed"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// How we calculate your carbon impact
//

export default AboutUs;
