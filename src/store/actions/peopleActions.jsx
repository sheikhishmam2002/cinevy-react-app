import { loadPeople, removePeople } from "../reducers/peopleSlice";
import axios from "../../utils/axios";

export const asyncLoadPeople = (id) => async (dispatch, getState) => {
  try {
    const details = await axios.get(`/person/${id}`);
    const externalid = await axios.get(`/person/${id}/external_ids`);
    const combinedCredits = await axios.get(`/person/${id}/combined_credits`);
    const tvCredits = await axios.get(`/person/${id}/tv_credits`);
    const movieCredits = await axios.get(`/person/${id}/movie_credits`);

    let theUltimateDetails = {
      details: details.data,
      externalid: externalid.data,
      combinedCredits: combinedCredits.data,
      tvCredits: tvCredits.data,
      movieCredits: movieCredits.data,
    };

    dispatch(loadPeople(theUltimateDetails));
  } catch (err) {
    console.log("Error: ", err);
  }
};
