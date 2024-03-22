<template>
  <section class="genre_movie" ref="section">
    <div class="genre-slider-wrap">
      <h2>{{ this.kor }}</h2>
      <ul class="genre__slider" ref="genre__slider">
        <li class="genre__item" v-for="(item, i) in genreItems" :class="`item${i + 1}`" :key="i">
          <div class="genre__thumbnail">
            <img
              :src="item.poster"
              alt="배경사진"
              :style="{ width: `${slider.item_width}px`, height: `${slider.item_width * 1.5}px` }"
            />
          </div>
          <p class="genre__title blind">{{ item.title }}</p>
        </li>
      </ul>
      <div class="btn__prev" @click="handleSlider" :style="{ height: `${slider.item_width * 1.5}px` }">
        <span class="blind">이전</span><i class="material-symbols-outlined"> arrow_back_ios_new </i>
      </div>
      <div class="btn__next" @click="handleSlider" :style="{ height: `${slider.item_width * 1.5}px` }">
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
      genreItems: [],
      slider: {
        s_width: 0,
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
      const slider = this.$refs.genre__slider;
      const width = this.$refs.genre__slider.offsetWidth;

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
      this.slider.s_width = width;

      this.slider.totalPages = Math.ceil(this.genreItems.length / this.slider.item) - 1; // 전체 페이지 수
      console.log(this.slider.totalPages);

      slider.style.transition = "";
      slider.style.transform = `translate3d(-${
        (item * this.slider.item_width + item * 20) * this.slider.page
      }px, 0, 0)`;

      if (this.slider.totalPages === this.slider.page && this.genreItems.length % this.slider.item !== 0) {
        this.slider.page -= 1;
      }
    },
    handleSlider(e) {
      const slider = this.$refs.genre__slider;
      const target = e.target.className;

      this.slider.totalPages = Math.ceil(this.genreItems.length / this.slider.item) - 1; // 전체 페이지 수
      console.log(this.slider.totalPages);

      let item = this.slider.item;
      if (target === "btn__prev" && this.slider.page > 0) {
        this.slider.page -= 1;
      } else if (target === "btn__next") {
        if (this.slider.page < this.slider.totalPages) {
          this.slider.page += 1;
        } else if (this.slider.page === this.slider.totalPages) {
          console.log("마지막 페이지");
        }
      }

      slider.style.transition = "transform 0.5s ease-in-out";
      slider.style.transform = `translate3d(-${
        (item * this.slider.item_width + item * 20) * this.slider.page
      }px, 0, 0)`;
    },
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);

    // 전체 페이지 수 계산

    this.$nextTick(() => {
      if (this.$refs.genre__slider) {
        this.handleResize(); // 요소에 접근하기 전에 호출
      }
    });

    this.handleResize();
    this.getMovie(this.no);
  },
};
</script>

<style lang="scss" scoped>
section {
  position: relative;
  overflow: hidden;
  margin: 0 20px;
  padding: 20px 0;
  .genre-slider-wrap {
    position: relative;
    min-width: 600px;
    .btn__prev,
    .btn__next {
      display: none;
      height: 100%;
      padding: 0 10px;
      position: absolute;
      top: 34px;
      cursor: pointer;
      z-index: 100;
      i {
        color: #efefef;
        font-size: 2rem;
        pointer-events: none;
      }
      background-color: rgba(0, 0, 0, 0.4);
    }
    &:hover .btn__prev,
    &:hover .btn__next {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .genre__slider {
      position: relative;
      display: flex;
      li {
        flex: 0 0 auto;
        margin-right: 20px;
        .genre__thumbnail {
          img {
            min-width: 120px;
            min-height: 180px;
          }
        }
      }
    }
  }
  h2 {
    font-size: 2rem;
    margin-bottom: 10px;
  }

  .btn__prev {
    left: 0;
  }
  .btn__next {
    right: 0;
  }
}
</style>
