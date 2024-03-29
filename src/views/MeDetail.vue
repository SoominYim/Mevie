<template>
  <div v-show="isLoading"></div>
  <div v-show="!isLoading" class="container">
    <de-movie :movieData="movieData" :movieGenres="movieGenres"></de-movie>
    <de-credit :movieCast="movieCast" :movieCrew="movieCrew"></de-credit>
    <de-similar :similarMovies="similarMovies" :getNewMovieId="getMovieId"></de-similar>
  </div>
</template>

<script>
import DeMovie from "@/components/detail/DeMovie.vue";
import DeCredit from "@/components/detail/DeCredit.vue";
import DeSimilar from "@/components/detail/DeSimilar.vue";
import { mapState } from "vuex";

export default {
  name: "MeDetail",
  components: { DeMovie, DeCredit, DeSimilar },
  data() {
    return {
      isLoading: false,
      movieData: {
        backdrop_path: null,
        poster_path: null,
        title: "",
        original_title: "",
        release_date: "",
        genres: [],
        runtime: "",
        vote_average: 0,
        tagline: "",
        overview: "",
      },
      movieGenres: "",
      movieCast: null,
      movieCrew: null,
      similarMovies: null,
    };
  },
  computed: { ...mapState(["url", "params", "imgURL", "movieId"]) },
  setup() {},
  created() {
    this.getMovieId(this.$route.params.id);
  },
  mounted() {},
  unmounted() {},
  methods: {
    getMovieId(newId) {
      this.$store.commit("changeMovieId", newId);

      this.getMovieData(newId);
      this.getMovieCredits(newId);
      this.getSimilarMovies(newId);
    },
    getMovieData(id) {
      this.isLoading = true;
      this.$axios
        .get(this.url.TMDb + `/movie/${id}`, {
          params: {
            api_key: this.params.apiKey,
            language: this.params.langKo,
          },
        })
        .then((res) => {
          const result = res.data;

          this.movieData = {
            backdrop_path: result.backdrop_path === null ? null : this.imgURL.backdrop + result.backdrop_path,
            poster_path: result.poster_path === null ? null : this.imgURL.poster + result.poster_path,
            title: result.title,
            original_title: result.original_title,
            release_date: result.release_date,
            genres: result.genres,
            runtime: result.runtime,
            vote_average: result.vote_average,
            tagline: result.tagline,
            overview: (result.overview =
              result.overview.length > 300 ? result.overview.substr(0, 300) + "..." : result.overview),
          };
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.isLoading = false;
          this.movieData.genres.filter((genre, index) => {
            index < this.movieData.genres.length - 1
              ? (this.movieGenres += genre.name + ", ")
              : (this.movieGenres += genre.name);
          });
          if (this.movieData.backdrop_path !== null) {
            document.querySelector(
              ".sec__movie"
            ).style.background = `linear-gradient(rgba(0,0,0,.8), rgba(0,0,0,.8)), url(${this.movieData.backdrop_path}) center / cover no-repeat`;
          } else {
            document.querySelector(".sec__movie").style.background = "#2b2b2b";
          }
        });
    },
    getMovieCredits(id) {
      this.movieCast = [];
      this.movieCrew = [];
      this.isLoading = true;
      this.$axios
        .get(this.url.TMDb + `/movie/${id}/credits`, {
          params: {
            api_key: this.params.apiKey,
          },
        })
        .then((res) => {
          const cast = res.data.cast;
          const crew = res.data.crew;

          crew.forEach((data) => {
            if (data.job !== "Director") return;

            this.movieCrew.push({
              name: data.name,
              profile_path: data.profile_path === null ? null : this.$store.state.imgURL.poster + data.profile_path,
            });
          });
          cast.forEach((data, idx) => {
            if (idx >= 8) return;

            this.movieCast.push({
              character: data.character !== "" ? data.character : "-",
              name: data.name,
              profile_path: data.profile_path === null ? null : this.$store.state.imgURL.poster + data.profile_path,
            });
          });
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    getSimilarMovies(id) {
      this.similarMovies = [];
      this.isLoading = true;
      this.$axios
        .get(this.url.TMDb + `/movie/${id}/similar`, {
          params: {
            api_key: this.params.apiKey,
            language: this.params.langKo,
          },
        })
        .then((res) => {
          const result = res.data.results;

          result.forEach((data, idx) => {
            if (idx >= 10) return;
            if (data.poster_path !== "") {
              this.similarMovies.push({
                id: data.id,
                title: data.title,
                poster: data.poster_path === null ? null : this.imgURL.poster + data.poster_path,
              });
            }
          });
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>
