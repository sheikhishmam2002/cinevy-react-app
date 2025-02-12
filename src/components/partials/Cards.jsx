import React from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.jpg";

function Cards({ data, title }) {
  return (
    <div className="flex justify-center flex-wrap gap-6 w-full p-5 bg-[#2A2826]">
      {data.map((c, i) => (
        <Link
          key={i}
          to={`/${c.media_type || title}/details/${c.id}`}
          className="w-[25vh] bg-zinc-900 rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition duration-300"
        >
          {/* Image */}
          <img
            className="w-full h-[40vh] object-cover"
            src={
              c.poster_path || c.backdrop_path || c.profile_path
                ? `https://image.tmdb.org/t/p/original/${
                    c.poster_path || c.backdrop_path || c.profile_path
                  }`
                : noimage
            }
            alt={c.name || c.title || "Image"}
          />
          {/* Title */}
          <div className="p-4">
            <h1 className="text-lg text-white font-bold truncate">
              {c.name || c.title || c.original_name || c.original_title}
            </h1>
            {/* Rating */}
            {c.vote_average && (
              <p className="text-sm text-yellow-400 font-medium mt-2">
                Rating: {c.vote_average.toFixed(1)} / 10
              </p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Cards;
