import React from "react";
import notFound from "/404.gif";

function NotFound() {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[#2A2826]">
      <img className="h-[80%] object-cover" src={notFound} />
    </div>
  );
}

export default NotFound;
