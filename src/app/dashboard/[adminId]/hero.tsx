import Lottie from "lottie-react";
import React, { useContext } from "react";
import jobAnimation from "@/animations/jobanimation.json";
import { AuthContext, AuthorizationContext } from "@/lib/userContext";
import { getAuthenticatedAppForUser } from "@/lib/firebase/firebaseserver";



type Props = {

};

const Hero = (props: Props) => {
  const {user, loading} = useContext(AuthorizationContext)

  return (
    <div className=" bg-gray-800 p-2 sm:p-4 flex-col sm:flex-row flex justify-between items-center w-full h-fit sm:h-52 rounded-lg ">
      <div className="flex flex-col flex-1  justify-between  h-full py-6 ">
        <p className="text-white font-medium leading-8 text-3xl">
          Welcome to Imagine
        </p>
        <h3 className="text-3xl font-extrabold text-white ">{user}</h3>
      </div>
      <div className="flex-1 justify-end h-full w-56  flex items-center ">
        <Lottie
          animationData={jobAnimation}
          loop={true}
          className="w-56 sm:w-72 h-56"
        />
      </div>
    </div>
  );
};

export default Hero;
