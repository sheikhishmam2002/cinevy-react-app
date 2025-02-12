import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";
import noimage from "/noimage.jpg";

function Topnav() {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState(null);

  const getSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearches(data.results);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  useEffect(() => {
    if (query.length > 1) {
      getSearches();
    } else {
      setSearches(null);
    }
  }, [query]);

  return (
    <div className="w-[80%] h-[10vh] relative flex mx-auto items-center">
      <i className="text-zinc-400 text-3xl ri-search-2-line"></i>
      <input
        type="text"
        placeholder="Search for a movie, tv show, person..."
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        className="w-[50%] mx-10 p-5 text-xl text-zinc-200 outline-none border-none bg-transparent"
      />

      {/* Visibility of cross btn */}
      {query.length > 0 && (
        <i
          onClick={() => setQuery("")}
          className="text-zinc-400 text-3xl cursor-pointer ri-close-circle-line right-0"
        ></i>
      )}

      {/* Searching Related Suggestions Section */}
      {searches && searches.length > 0 && (
        <div className="absolute w-[50%] max-h-[50vh] bg-[#18181B] top-[100%] left-[5%] overflow-auto rounded-lg shadow-2xl z-50 border border-zinc-800">
          <div className="p-2 bg-zinc-900 text-zinc-300 font-bold text-sm uppercase tracking-wider">
            Search Results
          </div>
          {searches.map((s, i) => (
            <Link
              to={`/${s.media_type}/details/${s.id}`}
              key={i}
              className="group w-full p-4 flex items-center border-b border-zinc-800 last:border-b-0 hover:bg-zinc-700 transition-colors duration-300"
            >
              <div className="flex-shrink-0 mr-4">
                <img
                  className="w-16 h-16 object-cover rounded-md shadow-md group-hover:scale-105 transition-transform duration-300"
                  src={
                    s.backdrop_path || s.profile_path
                      ? `https://image.tmdb.org/t/p/original/${
                          s.backdrop_path || s.profile_path
                        }`
                      : noimage
                  }
                  alt={s.name || s.title}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-zinc-200 font-semibold group-hover:text-lime-400 transition-colors duration-300">
                  {s.name || s.title || s.original_name || s.original_title}
                </span>
                <span className="text-zinc-500 text-sm capitalize">
                  {s.media_type}
                </span>
              </div>
              <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <i className="ri-arrow-right-line text-lime-500 text-xl"></i>
              </div>
            </Link>
          ))}
          {searches.length === 0 && (
            <div className="text-center text-zinc-500 p-4">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Topnav;
