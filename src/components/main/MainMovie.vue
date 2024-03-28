<template>
  <section class="main_movie">
    <div v-show="loading" class="loading-overlay" :style="{ height: slider.s_width * 1.7753 + 'px' }"></div>
    <div v-show="!loading" class="slider__main">
      <h2 class="blind">인기있는 영화</h2>
      <div class="main-slider-wrap">
        <ul
          class="main__slider"
          ref="main__slider"
          :style="{ width: slider.s_width * slider.sliderItems.length + 'px' }"
        >
          <li
            class="slider__item"
            :key="key"
            v-for="(item, key) in slider.sliderItems"
            :style="{ width: slider.s_width + 'px' }"
          >
            <!-- <a @click="$store.commit('routerMovieInfo', item.id)"> -->
            <div class="item__img">
              <img :src="item.backdrop" alt="썸네일" />
            </div>
            <div class="item__overlay" :style="{ background: overlayMode_bottom() }"></div>
            <div
              class="item__txt"
              :style="{
                transform: `scale(${text.scale})`,
                transformOrigin: 'top left',
                width: `${item.overview.length > 200 ? 1300 : 1000}px`,
                top: `${text.top}px`,
                left: `${text.left}px`,
              }"
            >
              <div class="txt__title">{{ item.title }}</div>
              <div class="txt__subject">{{ item.original_title }}, {{ item.release_date }}</div>
              <div class="txt__desc">{{ item.overview }}</div>
            </div>
          </li>
        </ul>
        <div class="btn__prev" @click="handleSlider" v-if="slider.page !== 0">
          <span class="blind">이전</span><i class="material-symbols-outlined"> arrow_back_ios_new </i>
        </div>
        <div class="btn__next" @click="handleSlider">
          <span class="blind">다음</span><i class="material-symbols-outlined"> arrow_forward_ios </i>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "MainMovie",
  data() {
    return {
      loading: false,
      slider: {
        sliderItems: [],
        sliderItems_page: 1,
        s_width: 0,
        pos: 0,
        page: 0,
      },
      text: {
        scale: 0,
        top: 0,
        left: 0,
      },
    };
  },
  computed: {
    ...mapState(["theme", "url", "params", "imgURL"]),
  },
  methods: {
    getSliderItems() {
      this.loading = true;
      this.$axios
        .get(this.url.TMDb + this.url.discover, {
          params: {
            api_key: this.params.apiKey,
            language: this.params.langKo,
            page: this.slider.sliderItems_page,
          },
        })
        .then((res) => {
          const result = res.data.results;

          result.forEach((data) => {
            if (data.backdrop_path) {
              this.slider.sliderItems.push({
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
        .finally(() => {
          this.loading = false;
        });
    },
    handleResize() {
      this.slider.s_width = window.innerWidth;
      this.text.scale = this.slider.s_width / 1920;
      this.text.top = 340 * this.text.scale;
      this.text.left = 120 * this.text.scale;

      this.$refs.main__slider.style.transition = "";
      this.$refs.main__slider.style.transform = `translate3d(-${this.slider.s_width * this.slider.page}px, 0, 0)`;
    },
    handleSlider(e) {
      const slider = this.$refs.main__slider;
      const target = e.target.className;

      if (target === "btn__prev") {
        this.slider.page = this.slider.page - 1;
        this.slider.pos = this.slider.page * this.slider.s_width;
      } else if (target === "btn__next") {
        this.slider.page = this.slider.page + 1;
        this.slider.pos = this.slider.page * this.slider.s_width;
        if (this.slider.page === this.slider.sliderItems.length - 1) {
          this.slider.sliderItems_page += 1;
          this.getSliderItems();
        }
      }

      slider.style.transition = "transform 0.5s ease-in-out";
      slider.style.transform = `translate3d(-${this.slider.pos}px, 0, 0)`;
    },
    overlayMode_bottom() {
      if (this.theme === "brightMode") {
        return "linear-gradient(to bottom, rgba(239, 239, 239, 0) 60%, rgba(239, 239, 239, 0.25) 70%, rgba(239, 239, 239, 0.55) 80%, rgba(239, 239, 239, 0.85) 90%, rgba(239, 239, 239, 1) 100%)";
      } else {
        return "linear-gradient(to bottom, rgba(43, 43, 43, 0) 60%, rgba(43, 43, 43, 0.25) 70%, rgba(43, 43, 43, 0.5) 80%, rgba(43, 43, 43, 0.75) 90%, rgba(43, 43, 43, 1) 100%)";
      }
    },
  },
  mounted() {
    this.getSliderItems();
    this.$nextTick(() => {
      if (this.$refs.main__slider) {
        window.addEventListener("resize", this.handleResize);
      }
      this.handleResize(); // 요소에 접근하기 전에 호출
    });
  },
  unmounted() {
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>
<style lang="scss" scope>
@import "../../style/main/main.scss";
</style>
