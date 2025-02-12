import { loadMovie, removeMovie } from "../reducers/movieSlice";
import axios from "../../utils/axios";

export const asyncLoadMovie = (id) => async (dispatch, getState) => {
  try {
    const details = await axios.get(`/movie/${id}`);
    const externalid = await axios.get(`/movie/${id}/external_ids`);
    const recommendations = await axios.get(`movie/${id}/recommendations`);
    const similar = await axios.get(`/movie/${id}/similar`);
    const translations = await axios.get(`/movie/${id}/translations`);
    const videos = await axios.get(`/movie/${id}/videos`);
    const watchprovider = await axios.get(`/movie/${id}/watch/providers`);

    let theUltimateDetails = {
      details: details.data,
      externalid: externalid.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      translations: translations.data.translations.map((t) => t.english_name),
      videos: videos.data.results.find((n) => n.type === "Trailer"),
      watchprovider: watchprovider.data.results.IN,
    };

    dispatch(loadMovie(theUltimateDetails));
  } catch (err) {
    console.log("Error: ", err);
  }
};
