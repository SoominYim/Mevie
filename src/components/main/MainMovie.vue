<template>
  <div class="slider__main">
    <h2 class="blind">인기있는 영화</h2>
    <div class="main-slider-wrap">
      <ul class="main__slider" ref="main__slider" v-bind:style="{ width: w_width * 5 + 'px' }">
        <li
          class="slider__item"
          v-bind:key="key"
          v-for="(item, key) in sliderItems"
          v-bind:style="{ width: w_width + 'px' }"
        >
          <a>
            <!-- <a @click="$store.commit('routerMovieInfo', item.id)"> -->
            <div class="item__img">
              <img :src="item.backdrop" alt="썸네일" />
            </div>
            <div class="item__txt">
              <h3 class="txt__title">{{ item.title }}</h3>
              <p class="txt__subject">{{ item.original_title }}, {{ item.release_date }}</p>
              <p class="txt__desc">{{ item.overview }}</p>
            </div>
          </a>
        </li>
      </ul>

      <ul class="slider__buttons">
        <li class="btn__prev">
          <button @click="handleSlider">
            <span class="blind">이전</span>
            <i class="fas fa-chevron-left"></i>
          </button>
        </li>
        <li class="btn__next">
          <button @click="handleSlider">
            <span class="blind">다음</span>
            <i class="fas fa-chevron-right"></i>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<!-- <script>
import { mapState } from "vuex";
export default {
  name: "MainMovie",
  data() {
    return {
      sliderItems: [],
      w_width: null,
      pos: 0,
    };
  },
  computed: {
    ...mapState(["url", "params", "imgURL"]),
  },
  methods: {
    getSliderItems() {
      this.$axios
        .get(this.url.TMDb + this.url.discover, {
          params: {
            api_key: this.params.apiKey,
            language: this.params.langKo,
          },
        })
        .then((res) => {
          const result = res.data.results;

          result.forEach((data) => {
            if (this.sliderItems.length >= 5) return;

            if (data.backdrop_path) {
              this.sliderItems.push({
                id: data.id,
                backdrop: this.imgURL.backdrop + data.backdrop_path,
                title: data.title,
                original_title: data.original_title,
                release_date: data.release_date,
                overview: data.overview,
              });
            }
          });
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {});
    },
    handleResize() {
      this.w_width = window.innerWidth;
      this.pos = 0;

      // document.querySelector(".popular__slider").style.transform = `translate3d(0, 0, 0)`;
      this.$refs.main__slider.transform = `translate3d(0, 0, 0)`;
    },
    handleSlider(e) {
      const slider = this.$refs.main__slider;
      const TARGET_CLASS = e.target.offsetParent.className;

      if (TARGET_CLASS === "btn__prev") {
        this.pos = this.pos === 0 ? this.w_width * 4 : this.pos - this.w_width;
        slider.style.transform = `translate3d(-${this.pos}px, 0, 0)`;
      } else if (TARGET_CLASS === "btn__next") {
        this.pos = this.pos === this.w_width * 4 ? 0 : this.pos + this.w_width;
        slider.style.transform = `translate3d(-${this.pos}px, 0, 0)`;
      }
    },
  },
  mounted() {
    this.getSliderItems();
    window.addEventListener("resize", this.handleResize);
    this.$nextTick(() => {
      // 다음 DOM 업데이트 사이클에서 호출
      if (this.$refs.main__slider) {
        this.handleResize(); // 요소에 접근하기 전에 호출
      }
    });
  },
};
</script> -->
