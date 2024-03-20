<template>
  <div class="slider__main">
    <h2 class="blind">인기있는 영화</h2>
    <div class="main-slider-wrap">
      <ul class="main__slider" ref="main__slider">
        <li class="slider__item" :key="key" v-for="(item, key) in sliderItems" :style="{ width: '100%' }">
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
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "MainMovie",
  data() {
    return {
      sliderItems: [],
      s_width: null,
      pos: 0,
      text: {
        scale: null,
        top: null,
        left: null,
      },
    };
  },
  computed: {
    ...mapState(["theme", "url", "params", "imgURL"]),
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
        });
    },
    handleResize() {
      this.s_width = window.innerWidth;
      this.pos = 0;

      let contentWidth = 1920;

      let winWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

      let scaleX = winWidth / contentWidth;

      this.text.scale = scaleX;
      this.text.top = 340 * this.text.scale;
      this.text.left = 120 * this.text.scale;

      console.log(scaleX);
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
    window.addEventListener("resize", this.handleResize);
    this.$nextTick(() => {
      // 다음 DOM 업데이트 사이클에서 호출
      if (this.$refs.main__slider) {
        this.handleResize(); // 요소에 접근하기 전에 호출
      }
    });
  },
};
</script>
<style lang="scss">
.slider__main {
  .main__slider {
    overflow: hidden;
    white-space: nowrap;
    overflow: hidden;
    .slider__item {
      position: relative;
      display: inline-block;
      min-width: 375px;
      white-space: normal;
      .item__img {
        text-align: center;
        img {
          width: 100%;
        }
      }
      .item__txt {
        position: absolute;
        top: 340px;
        left: 120px;
        width: 1000px;
        line-height: 1.7;

        color: #efefef;
        text-shadow: 1px 2px 3px #333;
        .txt__title {
          font-size: 5rem;
          font-weight: 700;
          line-height: 1.3;
        }
        .txt__subject {
          font-size: 2rem;
          font-weight: 100;
          margin-bottom: 20px;
        }
        .txt__desc {
          text-overflow: ellipsis;
          font-size: 2.5rem;
          font-weight: 100;
          letter-spacing: -1.8px;
          word-break: keep-all;
        }
      }
      .item__overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
