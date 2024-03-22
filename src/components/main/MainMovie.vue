<template>
  <section class="main_movie">
    <div class="slider__main">
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
    window.addEventListener("resize", this.handleResize);
    this.$nextTick(() => {
      // 다음 DOM 업데이트 사이클에서 호출
      if (this.$refs.main__slider) {
        this.handleResize(); // 요소에 접근하기 전에 호출
      }
    });
    setInterval(() => {
      this.slider.page = this.slider.page + 1;
      this.slider.pos = this.slider.page * this.slider.s_width;
      if (this.slider.page === this.slider.sliderItems.length - 1) {
        this.slider.sliderItems_page += 1;
        this.getSliderItems();
      }
      this.$refs.main__slider.style.transition = "transform 0.5s ease-in-out";
      this.$refs.main__slider.style.transform = `translate3d(-${this.slider.pos}px, 0, 0)`;
    }, 10000);
  },
};
</script>
<style lang="scss" scope>
.slider__main {
  position: relative;
  .main__slider {
    position: relative;
    display: flex;
    overflow: hidden;
    .slider__item {
      position: relative;
      display: inline-block;
      white-space: normal;
      flex: 0 0 auto;
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
        padding: 30px;
        background: rgba(0, 0, 0, 0.25);
        border-radius: 30px;
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
  .btn__prev {
    position: absolute;
    top: 45%;
    left: 0;
    cursor: pointer;
    i {
      color: #efefef;
      font-size: 5vw;
      pointer-events: none;
    }
  }
  .btn__next {
    position: absolute;
    top: 45%;
    right: 0;
    cursor: pointer;
    i {
      color: #efefef;
      font-size: 5vw;
      pointer-events: none;
    }
  }
}
</style>
