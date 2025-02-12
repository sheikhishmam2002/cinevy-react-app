import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncLoadPeople } from "../store/actions/peopleActions";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { removePeople } from "../store/reducers/peopleSlice";
import Loading from "../components/Loading";
import HorizontalCards from "./partials/HorizontalCards";
import Dropdown from "../components/partials/Dropdown";

function PeopleDetails() {
  const { info } = useSelector((state) => state.people);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [category, setCategory] = useState("movie");

  useEffect(() => {
    dispatch(asyncLoadPeople(id));
    return () => {
      dispatch(removePeople());
    };
  }, [id]);
  return info ? (
    <div className="px-[10%] w-screen h-[150vh] bg-[#2A2826]">
      {/* Part-1 : Navigation */}
      <nav className="w-full h-[10vh] text-zinc-100 flex items-center gap-10 text-2xl">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#65A20D] cursor-pointer mr-2 ri-arrow-left-circle-line duration-300"
        ></Link>
      </nav>

      <div className="w-full flex">
        {/* Part-2 : Left Poster & Details */}
        <div className="w-[20%]">
          <img
            className="shadow-[8px_17px_28px_2px_rgba(0,0,0,.5)] h-[35vh] object-cover rounded-lg"
            src={`https://image.tmdb.org/t/p/original/${info.details.profile_path}`}
          />

          <hr className="mt-10 mb-5 border-none h-[2px] bg-zinc-500" />

          {/* Social Media Links */}
          <div className="text-2xl text-white flex gap-x-5">
            <a
              target="_blank"
              href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
            >
              <i className="ri-earth-fill hover:text-[#65A20D] cursor-pointer duration-300"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.facebook.com/${info.externalid.facebook_id}`}
            >
              <i className="ri-facebook-box-fill hover:text-[#65A20D] cursor-pointer duration-300"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.instagram.com/${info.externalid.instagram_id}`}
            >
              <i className="ri-instagram-line hover:text-[#65A20D] cursor-pointer duration-300"></i>
            </a>
            <a
              target="_blank"
              href={`https://twitter.com/${info.externalid.twitter_id}`}
            >
              <i className="ri-twitter-x-line hover:text-[#65A20D] cursor-pointer duration-300"></i>
            </a>
          </div>

          {/* Personal Information */}
          <h1 className="text-2xl text-zinc-400 font-semibold my-5">
            Person Info
          </h1>

          <h1 className="text-lg text-zinc-400 font-semibold">Known For</h1>

          <h1 className="text-zinc-400">{info.details.known_for_department}</h1>

          <h1 className="text-lg text-zinc-400 font-semibold mt-3">Gender</h1>

          <h1 className="text-zinc-400">
            {info.details.gender === 2 ? "Male" : "Female"}
          </h1>

          <h1 className="text-lg text-zinc-400 font-semibold mt-3">Birthday</h1>

          <h1 className="text-zinc-400">{info.details.birthday}</h1>

          <h1 className="text-lg text-zinc-400 font-semibold mt-3">
            Place Of Birth
          </h1>

          <h1 className="text-zinc-400">{info.details.place_of_birth}</h1>

          <h1 className="text-lg text-zinc-400 font-semibold mt-3">
            Also Known As
          </h1>

          <h1 className="text-zinc-400">
            {info.details.also_known_as.join(", ")}
          </h1>
        </div>

        {/* Part-3 : Right Details & Information */}
        <div className="w-[80%] ml-[5%]">
          <h1 className="text-6xl text-zinc-400 font-black my-5">
            {info.details.name}
          </h1>
          <h1 className="text-lg text-zinc-400 font-semibold">Biography</h1>
          <p className="text-zinc-400 mt-3">
            {info.details.biography.slice(0, 600)}...
            <span className="text-zinc-500 cursor-pointer hover:underline">
              {" "}
              more
            </span>
          </p>
          <h1 className="mt-5 text-lg text-zinc-400 font-semibold">Castings</h1>
          <HorizontalCards data={info.combinedCredits.cast} />

          <div className="w-full flex justify-between mb-2">
            <h1 className="mt-5 text-xl text-zinc-400 font-semibold">Acting</h1>
            <Dropdown
              title="Category"
              options={["tv", "movie"]}
              func={(e) => setCategory(e.target.value)}
            />
          </div>

          <div className="list-disc text-zinc-400 w-full h-[50vh] overflow-x-hidden overflow-y-auto shadow-xl shadow-[rgba(255,255,255,0.2)] border-2 border-zinc-800 p-5">
            {info[category + "Credits"].cast.map((c, i) => (
              <li
                key={i}
                className="hover:bg-[#65A20D] hover:text-white p-5 duration-300 cursor-pointer rounded-md"
              >
                <Link to={`/${category}/details/${c.id}`}>
                  <span>
                    {c.name || c.title || c.original_name || c.original_title}
                  </span>
                  <span className="block ml-5 mt-2">
                    {c.character && `Character Name: ${c.character}`}
                  </span>
                </Link>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default PeopleDetails;
