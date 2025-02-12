import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncLoadMovie } from "../store/actions/movieActions";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { removeMovie } from "../store/reducers/movieSlice";
import Loading from "../components/Loading";
import HorizontalCards from "./partials/HorizontalCards";

function MovieDetails() {
  const { info } = useSelector((state) => state.movie);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(asyncLoadMovie(id));
    return () => {
      dispatch(removeMovie());
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
      className="relative w-[100%] h-[140vh] px-[10%]"
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
              ( {info.details.release_date.split("-")[0]} )
            </small>
          </h1>

          <div className="mt-3 mb-5 flex text-white items-center gap-x-5">
            <span className="rounded-full text-xl font-semibold bg-yellow-600 text-white w-[5vh] h-[5vh] flex justify-center items-center">
              {(info.details.vote_average * 10).toFixed()} <sup>%</sup>
            </span>
            <h1 className="w-[60px] font-semibold text-2xl leading-6">
              User Score
            </h1>
            <h1>{info.details.release_date}</h1>
            <h1>{info.details.genres.map((g) => g.name).join(", ")}</h1>
            <h1>{info.details.runtime}min</h1>
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

      <hr className="mt-10 mb-5 border-none h-[1px] bg-zinc-500" />

      {/* Part-4 : Recommendations and Similar Stuff*/}
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

export default MovieDetails;
