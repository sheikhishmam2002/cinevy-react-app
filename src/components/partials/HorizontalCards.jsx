import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.jpg";

// Trending Section Display
function HorizontalCards({ data }) {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    const handleWheel = (event) => {
      event.preventDefault();
      scrollContainer.scrollLeft += event.deltaY * 1; // Adjust the scroll speed
    };

    // Add the wheel event listener
    scrollContainer.addEventListener("wheel", handleWheel);

    // Cleanup the event listener on component unmount
    return () => {
      scrollContainer.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div
      ref={scrollContainerRef}
      className="w-full flex overflow-x-auto overflow-y-hidden mb-5 p-5 space-x-5"
    >
      {data.length > 0 ? (
        data.map((d, i) => {
          return (
            <Link
              to={`/${d.media_type}/details/${d.id}`}
              key={i}
              className="min-w-[15%] h-[30vh] bg-zinc-900 rounded-lg shadow-lg transform hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <img
                className="w-full h-40 object-cover rounded-t-lg"
                src={
                  d.backdrop_path || d.poster_path
                    ? `https://image.tmdb.org/t/p/original/${
                        d.backdrop_path || d.poster_path
                      }`
                    : noimage
                }
                alt={d.name || d.title || "Image"}
              />
              <div className="text-white p-4 overflow-y-auto">
                <h1 className="text-lg font-bold truncate">
                  {d.name || d.title || d.original_name || d.original_title}
                </h1>
                <p className="text-sm text-zinc-400 mt-2 line-clamp-2">
                  {d.overview.slice(0, 45)}...
                  <span className="text-zinc-500 cursor-pointer hover:underline">
                    {" "}
                    more
                  </span>
                </p>
              </div>
            </Link>
          );
        })
      ) : (
        <h1 className="text-3xl mt-5 text-white font-black text-center">
          Nothing to show
        </h1>
      )}
    </div>
  );
}

export default HorizontalCards;
