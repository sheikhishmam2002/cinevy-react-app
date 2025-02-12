import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncLoadTv } from "../store/actions/tvActions";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { removeTv } from "../store/reducers/tvSlice";
import Loading from "./Loading";
import HorizontalCards from "./partials/HorizontalCards";

function TvDetails() {
  const { info } = useSelector((state) => state.tv);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(asyncLoadTv(id));
    return () => {
      dispatch(removeTv());
    };
  }, [id]);
  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5), rgba(0,0,0,.8)), url(https://image.tmdb.org/t/p/original/${info.details.backdrop_path})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="relative w-[100%] h-[180vh] px-[10%]"
    >
      {/* Part-1 : Navigation */}
      <nav className="w-full h-[10vh] text-zinc-100 flex items-center gap-10 text-2xl">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#65A20D] cursor-pointer mr-2 ri-arrow-left-circle-line duration-300"
        ></Link>
        <a target="_blank" href={info.details.homepage}>
          <i className="ri-external-link-fill hover:text-[#65A20D] cursor-pointer duration-300"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
        >
          <i className="ri-earth-fill hover:text-[#65A20D] cursor-pointer duration-300"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}
          className="hover:text-[#65A20D] cursor-pointer duration-300 text-bold"
        >
          IMDb
        </a>
      </nav>

      {/* Part-2 : Poster & Details */}
      <div className="w-full flex">
        <img
          className="shadow-[8px_17px_28px_2px_rgba(0,0,0,.5)] h-[50vh] object-cover rounded-lg"
          src={`https://image.tmdb.org/t/p/original/${
            info.details.poster_path || info.details.backdrop_path
          }`}
        />

        <div className="content ml-[5%] text-white">
          <h1 className="text-5xl font-black text-white">
            {info.details.name ||
              info.details.title ||
              info.details.original_name ||
              info.details.original_title}
            <small className="font-bold text-xl text-zinc-300">
              ( {info.details.first_air_date.split("-")[0]} )
            </small>
          </h1>

          <div className="mt-3 mb-5 flex text-white items-center gap-x-5">
            <span className="rounded-full text-xl font-semibold bg-yellow-600 text-white w-[5vh] h-[5vh] flex justify-center items-center">
              {(info.details.vote_average * 10).toFixed()} <sup>%</sup>
            </span>
            <h1 className="w-[60px] font-semibold text-2xl leading-6">
              User Score
            </h1>
            <h1>{info.details.first_air_date}</h1>
            <h1>{info.details.genres.map((g) => g.name).join(", ")}</h1>
            {info.details.number_of_seasons && (
              <h1>
                {info.details.number_of_seasons === 1
                  ? `${info.details.number_of_seasons} season`
                  : `${info.details.number_of_seasons} seasons`}
              </h1>
            )}
            {info.details.number_of_episodes && (
              <h1>{info.details.number_of_episodes} episodes</h1>
            )}
          </div>

          <h1 className="text-xl font-semibold italic text-zinc-200">
            {info.details.tagline}
          </h1>

          <h1 className="text-2xl mb-3 mt-5">Overview</h1>
          <p>{info.details.overview}</p>

          <h1 className="text-2xl mb-3 mt-5">Movie available in</h1>
          <p className="mb-10">{info.translations.join(", ")}</p>

          <Link
            className="bg-[#65A20D] py-3 px-5 rounded-lg text-white"
            to={`${pathname}/trailer`}
          >
            <i className="ri-play-fill mr-3"></i> Play Trailer
          </Link>
        </div>
      </div>

      {/* Part-3 : Platform Availability */}
      <div className="w-[80%] flex flex-col gap-y-5 mt-10">
        {info.watchprovider && info.watchprovider.flatrate && (
          <div className="flex gap-x-5 items-center text-white">
            <h1 className="font-semibold">Available on Platform :</h1>
            {info.watchprovider.flatrate.map((w, i) => (
              <img
                title={w.provider_name}
                className="w-[4vh] h-[4vh] object-cover rounded-md"
                key={i}
                src={`http://image.tmdb.org/t/p/original/${w.logo_path}`}
              />
            ))}
          </div>
        )}

        {info.watchprovider && info.watchprovider.rent && (
          <div className="flex gap-x-5 items-center text-white">
            <h1 className="font-semibold">Available on Rent :</h1>
            {info.watchprovider.rent.map((w, i) => (
              <img
                title={w.provider_name}
                className="w-[4vh] h-[4vh] object-cover rounded-md"
                key={i}
                src={`http://image.tmdb.org/t/p/original/${w.logo_path}`}
              />
            ))}
          </div>
        )}

        {info.watchprovider && info.watchprovider.buy && (
          <div className="flex gap-x-5 items-center text-white">
            <h1 className="font-semibold">Available to Buy :</h1>
            {info.watchprovider.buy.map((w, i) => (
              <img
                title={w.provider_name}
                className="w-[4vh] h-[4vh] object-cover rounded-md"
                key={i}
                src={`http://image.tmdb.org/t/p/original/${w.logo_path}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Part-4 : Seasons */}
      <hr className="mt-10 mb-5 border-none h-[1px] bg-zinc-500" />
      <h1 className="text-3xl font-bold text-white mb-5">Seasons</h1>
      {info.details.seasons ? (
        <div className="w-full overflow-x-auto flex gap-6 scrollbar-thin scrollbar-thumb-[#65A20D] scrollbar-track-transparent px-5">
          {info.details.seasons.map((s, i) => (
            <div
              key={i}
              className="min-w-[20vh] bg-black/50 p-3 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transform duration-300"
            >
              <img
                className="rounded-lg w-full h-[30vh] object-cover mb-3 shadow-md"
                src={`https://image.tmdb.org/t/p/original/${s.poster_path}`}
                alt={s.name || "Season Poster"}
              />
              <h1 className="text-lg font-semibold text-zinc-200 text-center truncate">
                {s.name || s.title || s.original_name || s.original_title}{" "}
              </h1>
              <p className="text-md text-zinc-400 text-center">
                {s.episode_count} Episodes
              </p>
            </div>
          ))}
        </div>
      ) : (
        <h1 className="text-3xl mt-5 text-white font-black text-center">
          Not available
        </h1>
      )}

      {/* Part-5 : Recommendations and Similar Stuff*/}
      <hr className="mt-10 mb-5 border-none h-[1px] bg-zinc-500" />
      <h1 className="text-3xl font-bold text-white">
        Recommendations & Similar Items
      </h1>
      <HorizontalCards
        data={
          info.recommendations.length > 0 ? info.recommendations : info.similar
        }
      />
      <Outlet />
    </div>
  ) : (
    <Loading />
  );
}

export default TvDetails;
