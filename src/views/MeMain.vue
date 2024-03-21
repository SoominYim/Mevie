<template>
  <div class="container">
    <main-movie></main-movie>
    <h1>장르별 영화</h1>
    <genre-movie
      :key="i"
      v-for="(genre, i) in allGenres"
      :no="genre.id"
      :kor="genre.kor"
      :eng="genre.eng"
    ></genre-movie>
  </div>
</template>

<script>
import { mapState } from "vuex";
import MainMovie from "@/components/main/MainMovie";
import GenreMovie from "@/components/main/GenreMovie.vue";

export default {
  name: "MeMain",
  components: { MainMovie, GenreMovie },
  data() {
    return {
      sampleData: "",
    };
  },
  computed: {
    ...mapState(["allGenres"]),
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
h1 {
  font-size: 2.5rem;
  padding: 0 20px;
}
</style>
