import React from "react";
import { Link } from "react-router-dom";

function Sidenav() {
  return (
    <div className="w-[20%] h-full border-r-[1px] border-zinc-600 p-10">
      <h1 className="text-2xl text-white font-bold">
        <i className="text-[#65A20D] ri-movie-2-line mr-2"></i>
        <span className="text-[#65A20D]">CINEVY</span>
      </h1>

      {/* Features List Sections */}

      <nav className="flex flex-col text-zinc-400 text-xl gap-3 mb-5">
        <h1 className="text-white font-semibold text-xl mt-10 mb-5">
          New Feeds
        </h1>
        <Link
          to="/trending"
          className="hover:bg-[#65A20D] hover:text-white p-5 rounded-lg duration-300"
        >
          <i className="mr-2 ri-fire-fill"></i>Trending
        </Link>
        <Link
          to="/popular"
          className="hover:bg-[#65A20D] hover:text-white p-5 rounded-lg duration-300"
        >
          <i className="mr-2 ri-bar-chart-2-fill"></i>Popular
        </Link>
        <Link
          to="/movie"
          className="hover:bg-[#65A20D] hover:text-white p-5 rounded-lg duration-300"
        >
          <i className="mr-2 ri-clapperboard-fill"></i>Movies
        </Link>
        <Link
          to="/tv"
          className="hover:bg-[#65A20D] hover:text-white p-5 rounded-lg duration-300"
        >
          <i className="mr-2 ri-slideshow-3-fill"></i>Tv Shows
        </Link>
        <Link
          to="/people"
          className="hover:bg-[#65A20D] hover:text-white p-5 rounded-lg duration-300"
        >
          <i className="mr-2 ri-team-fill"></i>People
        </Link>
      </nav>
      <hr className="border-none h-[1px] bg-zinc-600" />

      {/* Details List Section */}

      <nav className="flex flex-col text-zinc-400 text-xl gap-3">
        <h1 className="text-white font-semibold text-xl mt-10 mb-5">
          Details Section
        </h1>
        <Link className="hover:bg-[#65A20D] hover:text-white p-5 rounded-lg duration-300">
          <i className="mr-2 ri-information-fill"></i>About us
        </Link>
        <Link className="hover:bg-[#65A20D] hover:text-white p-5 rounded-lg duration-300">
          <i className="mr-2 ri-phone-fill"></i>Contact us
        </Link>
      </nav>
    </div>
  );
}

export default Sidenav;
