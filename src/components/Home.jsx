import React, { useEffect, useState } from "react";
import Sidenav from "./partials/Sidenav";
import Topnav from "./partials/Topnav";
import axios from "../utils/axios";
import Header from "./partials/Header";
import HorizontalCards from "./partials/HorizontalCards";
import Dropdown from "./partials/Dropdown";
import Loading from "./Loading";

function Home() {
  document.title =
    "Cinevy | Ratings, Reviews, and Where to Watch the best Movies and TV Series.";

  const [wallpaper, setWallpaper] = useState(null);
  const [trending, setTrending] = useState(null);
  const [category, setCatagory] = useState("all");

  // Trends to Show

  const getHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      let resultData =
        data.results[Math.floor(Math.random() * data.results.length)];
      setWallpaper(resultData);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const getTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      setTrending(data.results);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  useEffect(() => {
    getTrending();
    !wallpaper && getHeaderWallpaper();
  }, [category]);

  return wallpaper ? (
    <>
      <Sidenav />
      <div className="w-[80%] h-full overflow-auto overflow-x-hidden">
        <Topnav />
        <Header data={wallpaper} />

        <div className="p-5 flex justify-between">
          <h1 className="text-3xl font-semibold text-zinc-400">Trending</h1>

          {/* Filter Section */}
          <Dropdown
            title="Filter"
            options={["tv", "movie", "all"]}
            func={(e) => setCatagory(e.target.value)}
          />
        </div>

        <HorizontalCards data={trending} />
      </div>
    </>
  ) : (
    <Loading />
  );
}

export default Home;
