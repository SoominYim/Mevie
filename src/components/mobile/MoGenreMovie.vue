<template>
  <section class="genre_movie" ref="section">
    <div v-show="loading" class="loading-overlay"></div>
    <div v-show="!loading" class="genre-slider-wrap">
      <h2>{{ this.kor }}</h2>
      <ul class="genre__slider" ref="genre__slider">
        <li class="genre__item" v-for="(item, i) in genreItems" :class="`item${i + 1}`" :key="i">
          <router-link :to="{ path: `/detail/${item.id}` }">
            <div class="genre__thumbnail">
              <img :src="item.poster" alt="배경사진" :style="{ width: `${80}px`, height: `${120}px` }" />
            </div>
            <p class="genre__title blind">{{ item.title }}</p>
          </router-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "MoGenreMovie",
  components: {},
  props: ["no", "kor", "eng"],
  data() {
    return {
      loading: false,
      genreItems: [],
    };
  },
  computed: {
    ...mapState(["url", "params", "imgURL"]),
  },
  created() {},

  methods: {
    getMovie(No) {
      this.loading = true;
      this.$axios
        .get(this.url.TMDb + this.url.discover, {
          params: {
            api_key: this.params.apiKey,
            language: this.params.langKo,
            sort_by: this.params.sortBy,
            with_genres: No,
          },
        })
        .then((res) => {
          const result = res.data.results;

          result.forEach((data) => {
            this.genreItems.push({
              id: data.id,
              title: data.title,
              poster: this.imgURL.poster + data.poster_path,
            });
          });
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  mounted() {
    this.getMovie(this.no);
  },
  unmounted() {},
};
</script>

<style lang="scss" scoped>
@import "../../style/mobile/genre.scss";
</style>
