import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NotFound from "../NotFound";

function Trailer() {
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytVideo = useSelector((state) => state[category].info.videos);
  const navigate = useNavigate();

  return (
    <div className="absolute bg-[rgba(0,0,0,.9)] z-[100] top-0 left-0 w-screen h-screen flex items-center justify-center">
      <Link
        onClick={() => navigate(-1)}
        className="absolute hover:text-[#65A20D] cursor-pointer mr-2 ri-close-circle-line duration-300 text-3xl text-white right-[5%] top-[5%]"
      ></Link>
      {ytVideo ? (
        <ReactPlayer
          controls
          height={800}
          width={1500}
          url={`https://www.youtube.com/watch?v=${ytVideo.key}`}
        />
      ) : (
        <NotFound />
      )}
    </div>
  );
}

export default Trailer;
