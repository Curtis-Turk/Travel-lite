import { useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom";
// import { useCountdown } from "./hooks";

// const countdown = useCountdown(5, onCountdownEnd);

export default function Error () {
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      navigate('/')
    }, 5000)
  }, )

  return (
      <div className="flex justify-center mt-24">
        <div className="font-mono bg-zinc-100 border rounded-3xl flex justify-center box-border h-2/3 w-2/3 p-4 mb-40 ml-24 mr-24">
            <div className="flex justify-center"></div>
              <h1 className="inline text-center pb-4 text-3xl mt-10">
                Oops! We weren't able to plan an adventure for you. 
                <br></br>
                <br></br>
                Redirecting you to the homepage in 5 seconds. 
                <br></br>
                <br></br>
                If you are not redirected, click <span className="text-lime-600"><Link to="/" className="hover:bg-gray-200">here</Link></span>.</h1>
            </div>
        </div>
    );
  }