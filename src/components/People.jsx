import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import Cards from "./partials/Cards";
import InfiniteScroll from "react-infinite-scroll-component";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";

function People() {
  document.title = "Cinevy | People";

  const navigate = useNavigate();
  const [category, setCategory] = useState("popular");
  const [person, setPerson] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getPerson = async () => {
    try {
      const { data } = await axios.get(`/person/${category}?page=${page}`);

      if (data.results.length > 0) {
        setPerson((prevState) => [...prevState, ...data.results]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const refreshHandler = () => {
    if (person.length === 0) {
      getPerson();
    } else {
      setPage(1);
      setPerson([]);
      getPerson();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return person.length > 0 ? (
    <div className="w-screen h-screen">
      <div className="w-full flex items-center justify-evenly">
        <h1 className="text-2xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#65A20D] cursor-pointer mr-2 ri-arrow-left-circle-line"
          ></i>
          People
        </h1>
        <div className="flex items-center w-[80%]">
          <Topnav />
          <div className="w-[2%]"></div>
        </div>
      </div>

      {/* Infinite Scroller */}

      <InfiniteScroll
        dataLength={person.length}
        next={getPerson}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={person} title="people" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default People;
