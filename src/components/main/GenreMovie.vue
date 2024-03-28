<template>
  <section class="genre_movie" ref="section">
    <div v-show="loading" class="loading-overlay"></div>
    <div v-show="!loading" class="genre-slider-wrap">
      <h2>{{ this.kor }}</h2>
      <ul class="genre__slider" ref="genre__slider">
        <li class="genre__item" v-for="(item, i) in genreItems" :class="`item${i + 1}`" :key="i">
          <router-link :to="{ path: `/detail/${item.id}` }">
            <div class="genre__thumbnail">
              <img
                :src="item.poster"
                alt="배경사진"
                :style="{ width: `${slider.item_width}px`, height: `${slider.item_width * 1.5}px` }"
              />
            </div>
            <p class="genre__title blind">{{ item.title }}</p>
          </router-link>
        </li>
      </ul>
      <div
        class="btn__prev"
        @click="handleSlider"
        :style="{ height: `${slider.item_width * 1.5}px` }"
        v-if="this.slider.page > 0"
      >
        <span class="blind">이전</span><i class="material-symbols-outlined"> arrow_back_ios_new </i>
      </div>
      <div
        class="btn__next"
        @click="handleSlider"
        :style="{ height: `${slider.item_width * 1.5}px` }"
        v-if="this.slider.page !== this.slider.totalPages"
      >
        <span class="blind">다음</span><i class="material-symbols-outlined"> arrow_forward_ios </i>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "GenreMovie",
  components: {},
  props: ["no", "kor", "eng"],
  data() {
    return {
      loading: false,
      genreItems: [],
      slider: {
        item_width: 0,
        page: 0,
        item: 0,
        all_items: 0,
        totalPages: 0,
      },
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
    handleResize() {
      const slider = this.$refs.genre__slider;
      if (slider) {
        const width = slider.offsetWidth;

        let item = 0;
        switch (true) {
          case width >= 1500:
            item = 9;
            break;
          case width >= 1300:
            item = 8;
            break;
          case width >= 1100:
            item = 7;
            break;
          case width >= 900:
            item = 6;
            break;
          case width >= 700:
            item = 5;
            break;
          default:
            item = 4;
        }

        this.slider.item = item;
        this.slider.item_width = (width - (item - 1) * 20) / item;
        this.slider.totalPages = Math.ceil(this.genreItems.length / this.slider.item) - 1; // 전체 페이지 수

        slider.style.transition = "";
        slider.style.transform = `translate3d(-${
          (item * this.slider.item_width + item * 20) * this.slider.page
        }px, 0, 0)`;
        if (this.slider.totalPages === this.slider.page && this.genreItems.length % this.slider.item !== 0) {
          this.slider.page -= 1;
        }
      } else {
        console.error("Slider element is null.");
      }
    },
    handleSlider(e) {
      const slider = this.$refs.genre__slider;
      const target = e.target.className;
      let item = this.slider.item;
      this.slider.totalPages = Math.ceil(this.genreItems.length / this.slider.item) - 1; // 전체 페이지 수

      if (target === "btn__prev" && this.slider.page > 0) {
        this.slider.page -= 1;
      } else if (target === "btn__next") {
        if (this.slider.page < this.slider.totalPages) this.slider.page += 1;
      }

      slider.style.transition = "transform 0.5s ease-in-out";
      slider.style.transform = `translate3d(-${
        (item * this.slider.item_width + item * 20) * this.slider.page
      }px, 0, 0)`;
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$refs.genre__slider) {
        window.addEventListener("resize", this.handleResize);
      }
    });
    this.handleResize(); // 요소에 접근하기 전에 호출
    this.getMovie(this.no);
  },
  unmounted() {
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/main/genre.scss";
</style>
