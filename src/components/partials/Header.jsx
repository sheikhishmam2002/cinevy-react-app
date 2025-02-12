import React from "react";
import { Link } from "react-router-dom";

function Header({ data }) {
  // Trending one movie or tv show info show casing

  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5), rgba(0,0,0,.8)), url(https://image.tmdb.org/t/p/original/${
          data.backdrop_path || data.profile_path
        })`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="w-full h-[50vh] flex flex-col justify-end items-start p-[5%]"
    >
      <h1 className="w-[70%] text-5xl font-black text-white">
        {data.name || data.title || data.original_name || data.original_title}
      </h1>
      <p className="w-[70%] mt-3 mb-3 text-white">
        {data.overview.slice(0, 250)}...
        <Link
          className="text-blue-400"
          to={`/${data.media_type}/details/${data.id}`}
        >
          {" "}
          more
        </Link>
      </p>
      <p className="text-white">
        <i className="text-yellow-500 ri-gallery-upload-fill"></i>{" "}
        {data.release_date || "No Information"}
        <i className="ml-5 text-yellow-500 ri-album-fill"></i>{" "}
        {data.media_type.toUpperCase()}
      </p>
      <Link
        className="mt-5 bg-[#65A20D] px-4 py-3 rounded text-white hover:bg-[#2A2826] duration-300"
        to={`/${data.media_type}/details/${data.id}/trailer`}
      >
        <i className="ri-eye-fill"></i> Watch Trailer
      </Link>
    </div>
  );
}

export default Header;
