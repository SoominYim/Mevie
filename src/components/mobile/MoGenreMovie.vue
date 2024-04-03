<template>
  <section class="genre_movie" ref="section">
    <div v-show="loading" class="loading-overlay"></div>
    <div
      v-show="!loading"
      ref="genre__slider"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
      @touchcancel="handleTouchCancel"
      class="genre-slider-wrap"
    >
      <h2>{{ this.kor }}</h2>
      <ul class="genre__slider">
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
      isMouseDown: false,
      diff: 0,
      startTranslate: 0,
      startX: 0,
      scrollLeft: 0,
      currentTranslate: 0,
      isDragging: false,
      prevTouchX: 0,
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
    handleTouchStart(event) {
      event.preventDefault();
      this.isDragging = true;
      this.startX = event.touches[0].clientX;
      this.startTranslate = this.currentTranslate; // 터치 시작 시 이전 translate 값 저장
    },
    handleTouchMove(event) {
      event.preventDefault();
      if (!this.isDragging) return;

      const currentTouchX = event.touches[0].clientX;
      this.diff = this.startX - currentTouchX;
      this.currentTranslate = this.currentTranslate = Math.max(
        window.innerWidth - 1715,
        Math.min(0, this.startTranslate - this.diff)
      ); // 이동량에 따라 translate 값 변경
      this.updateSliderPosition();
    },
    handleTouchEnd() {
      this.isDragging = false;
    },
    updateSliderPosition() {
      const slider = this.$refs.genre__slider;
      slider.style.left = `${this.currentTranslate}px`;
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
