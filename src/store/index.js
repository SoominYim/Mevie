import { createStore } from "vuex";
import router from "@/router";

export default createStore({
  state: {
    theme: "brightMode",
    url: {
      TMDb: "https://api.themoviedb.org/3",
      popular: "/discover/movie/popular",
      discover: "/discover/movie",
      now_playing: "/movie/now_playing",
      search: "/search/movie",
    },
    params: {
      apiKey: process.env.VUE_APP_TMDB_API_KEY,
      langKo: "ko-KO",
      sortBy: "popularity.desc",
    },
    imgURL: {
      poster: "https://image.tmdb.org/t/p/w300_and_h450_bestv2",
      backdrop: "https://image.tmdb.org/t/p/w1280",
      backdrop_s: "https://image.tmdb.org/t/p/w500",
    },
    imgSize: {
      backdrop_sizes: ["w300", "w780", "w1280", "original"],
      logo_sizes: ["w45", "w92", "w154", "w185", "w300", "w500", "original"],
      poster_sizes: ["w92", "w154", "w185", "w342", "w500", "w780", "original"],
      profile_sizes: ["w45", "w185", "h632", "original"],
      still_sizes: ["w92", "w185", "w300", "original"],
    },
    allGenres: [
      { id: 12, eng: "Adventure", kor: "모험" },
      { id: 14, eng: "Fantasy", kor: "판타지" },
      { id: 16, eng: "Animation", kor: "애니메이션" },
      { id: 18, eng: "Drama", kor: "드라마" },
      { id: 27, eng: "Horror", kor: "호러" },
      { id: 28, eng: "Action", kor: "액션" },
      { id: 35, eng: "Comedy", kor: "코미디" },
      { id: 36, eng: "History", kor: "역사" },
      { id: 37, eng: "Western", kor: "서부" },
      { id: 53, eng: "Thriller", kor: "스릴러" },
      { id: 80, eng: "Crime", kor: "범죄" },
      { id: 99, eng: "Documentary", kor: "다큐멘터리" },
      { id: 878, eng: "Science Fiction", kor: "SF" },
      { id: 9648, eng: "Mystery", kor: "미스테리" },
      { id: 10402, eng: "Music", kor: "음악" },
      { id: 10749, eng: "Romance", kor: "로맨스" },
      { id: 10751, eng: "Family", kor: "가족" },
      { id: 10752, eng: "War", kor: "전쟁" },
    ],
    movieId: null,
  },
  getters: {},
  mutations: {
    changeMovieId: (state, payload) => {
      state.movieId = payload;
    },
    routerMovieInfo: (state, payload) => {
      state.movieId = payload;
      router.push({ path: "/detail/" + state.movieId });
    },
    setTheme(state, theme) {
      state.theme = theme;
    },
  },
  actions: {},
});
