import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0M2ZiMjU3MzFhMWMwZTU3ODlkZWJkMzZkOWI3OGQ4OCIsIm5iZiI6MTczMzAyOTU5NC45NjEsInN1YiI6IjY3NGJlZWRhNThkZTc2NzZiOGU4NTUyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2e2zn9Pr_rhoXI29lsOvtFSPl9d489uT1UJC4saaDk4",
  },
});

export default instance;
