import React from "react";
import loader from "/loader.gif";

function Loading() {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[#2A2826]">
      <img className="h-[50%] object-cover" src={loader} />
    </div>
  );
}

export default Loading;
