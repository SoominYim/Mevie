<template>
  <section class="genre_movie">
    <div class="genre-slider-wrap">
      <h2>{{ this.kor }}</h2>
      <ul class="genre__slider" ref="genre__slider">
        <li class="genre__item" :key="key" v-for="(item, key) in genreItems">
          <div class="genre__thumbnail">
            <img
              :src="item.poster"
              alt="배경사진"
              :style="{ width: `${slider.item_width - 11}px`, height: `${(slider.item_width - 11) * 1.5}px` }"
            />
          </div>
          <p class="genre__title blind">{{ item.title }}</p>
        </li>
      </ul>
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
      genreItems: [],
      slider: {
        s_width: 0,
        item_width: 0,
      },
    };
  },
  computed: { ...mapState(["url", "params", "imgURL"]) },
  created() {},

  methods: {
    getMovie(No) {
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
        });
    },
    handleResize() {
      this.slider.s_width = window.innerWidth;
      if (this.slider.s_width >= 1500) {
        this.slider.item_width = (this.slider.s_width - 40) / 9;
      } else if (this.slider.s_width >= 1300) {
        this.slider.item_width = (this.slider.s_width - 40) / 8;
      } else if (this.slider.s_width >= 1100) {
        this.slider.item_width = (this.slider.s_width - 40) / 7;
      } else if (this.slider.s_width >= 900) {
        this.slider.item_width = (this.slider.s_width - 40) / 6;
      } else if (this.slider.s_width >= 700) {
        this.slider.item_width = (this.slider.s_width - 40) / 5;
      } else {
        // 만약 설정된 범위 이내가 없다면 여기에 기본값을 설정할 수 있습니다.
        this.slider.item_width = (this.slider.s_width - 40) / 4;
      }
      console.log(this.slider.s_width);
    },
  },
  mounted() {
    this.$nextTick(() => {
      // 다음 DOM 업데이트 사이클에서 호출
      if (this.$refs.genre__slider) {
        this.handleResize(); // 요소에 접근하기 전에 호출
        window.addEventListener("resize", this.handleResize);
      }
    });

    this.getMovie(this.no);
  },
};
</script>

<style lang="scss" scoped>
section {
  padding: 20px;
  .genre-slider-wrap {
    overflow: hidden;
    .genre__slider {
      display: flex;
      overflow: hidden;
      li {
        flex: 0 0 auto;
        margin-right: 10px;
      }
    }
  }
  h2 {
    font-size: 2rem;
    margin-bottom: 10px;
  }
}
</style>
