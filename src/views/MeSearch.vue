<template>
  <div class="content" ref="content" @scroll="handleScroll()">
    <div class="search-bar">
      <input type="text" placeholder="검색어를 입력하세요." @input="getKeyword" />
    </div>
    <section class="sec_search">
      <h2 class="search-word">"{{ searchWord }}" 검색 결과</h2>
      <ul>
        <li v-bind:key="key" v-for="(search, key) in searchList">
          <a @click="$store.commit('routerMovieInfo', search[0])">
            <div class="search__thumbnail">
              <img :src="search[1]" alt="포스터" v-if="search[1] !== null" />
              <img src="../assets/img_no_poster.png" alt="No-Data" v-if="search[1] === null" />
            </div>
            <p class="search__title">{{ search[2] }}</p>
            <p class="search__release">{{ search[3] }}</p>
          </a>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      title: "",
      searchWord: "",
      searchList: [],
      pageNo: 1,
      total_pages: 0,
    };
  },
  computed: {
    ...mapState(["url", "params", "imgURL"]),
  },
  methods: {
    getKeyword(e) {
      this.searchWord = e.target.value.trim();
      this.searchList = [];
      if (this.searchWord.length > 1) {
        this.getSearchList(this.searchWord);
      }
    },
    getPageMore() {
      this.pageNo++;
      this.getSearchList(this.searchWord, this.pageNo);
    },
    getSearchList(keyword, pageNo) {
      this.$axios
        .get(this.url.TMDb + this.url.search, {
          params: {
            api_key: this.params.apiKey,
            language: this.params.langKo,
            query: keyword,
            include_adult: "false",
            page: pageNo,
          },
        })
        .then((res) => {
          const result = res.data.results;
          result.forEach((data) => {
            this.searchList.push([
              data.id,
              data.poster_path === null ? null : this.imgURL.poster + data.poster_path,
              data.title,
              data.release_date === "" ? "-" : data.release_date,
            ]);
            this.total_pages = res.data.total_pages;
          });
          return result.length;
        })
        .then((length) => {
          if (!length) {
            this.showBtns = false;
          } else this.showBtns = true;
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {});
    },
    handleScroll() {
      if (
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight &&
        this.pageNo < this.total_pages
      ) {
        this.getPageMore();
      }
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>
<style lang="scss" scoped>
@import "../style/search.scss";
.loading-spinner {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.spinner {
  width: 40px;
  height: 40px;
  background-color: #333;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
