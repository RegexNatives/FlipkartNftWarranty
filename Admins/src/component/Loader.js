import React from "react";

import * as animationData from "../animation/loader.json";
import Lottie from "react-lottie";

const Loader = () => {

  const defaultOptions = {
    loop: true,

    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="lottie-loader">
      <Lottie options={defaultOptions} />
    </div>
  );
};

export default Loader;
