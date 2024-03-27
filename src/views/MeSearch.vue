<template>
  <div class="content">
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
      <div
        class="search__button-more"
        @click="getPageMore"
        style="color: white"
        v-show="title.length != 0 && total_pages !== pageNo"
      >
        더 불러오기
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      title: "",
      searchWord: null,
      searchList: [],
      pageNo: 1,
      showBtns: false,
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
  },
};
</script>
<style lang="scss" scoped>
.content {
  position: relative;
  padding: 160px 0;
  margin: 0 auto;
}

.search-bar {
  position: fixed;
  width: 100%;
  background-color: #000;
  height: 160px;
  top: 0;
  input {
    position: relative;
    width: 300px;
    top: calc(50% - 40px / 2);
    left: calc(50% - 300px / 2);
    height: 40px;
    line-height: 50px;
    margin: 0 auto;
    border: 2px solid #fff;
    background-color: transparent;
    padding: 0 1%;
    font-size: 20px;
    color: #fff;
    &:focus {
      border: 2px solid #018574;
      outline: none;
    }
  }
}
.sec_search {
  width: 90%;
  margin: 0 auto;
}
.sec_search,
.content__upcoming {
  min-height: 500px;

  h2 {
    font-size: 24px;
    margin: 20px 0 10px;
  }

  ul {
    overflow: hidden;

    li {
      padding-bottom: 20px;
      float: left;
      width: 9%;
      margin: 0 0.555%;
      transition: all 0.4s;
      cursor: pointer;

      &:first-child {
        margin-left: 0;
      }

      &:last-child {
        margin-right: 0;
      }

      .search__thumbnail,
      .upcoming__thumbnail {
        img {
          width: 100%;
          height: auto;
        }
      }

      .search__title,
      .upcoming__title,
      .search__release,
      .upcoming__release {
        padding: 0 5px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }

  .search__button-more {
    width: 100%;
    text-align: center;
    line-height: 35px;
    background: #e002fa;
    color: #fff;
  }
}

@media screen and (min-width: 1001px) {
  .sec_search ul li:nth-child(10n + 1),
  .content__upcoming ul li:first-child {
    margin-left: 0;
  }

  .sec_search ul li:nth-child(10n),
  .content__upcoming ul li:last-child {
    margin-right: 0;
  }
}

@media screen and (max-width: 1000px) and (min-width: 861px), screen and (max-width: 860px) and (min-width: 641px) {
  .sec_search ul li,
  .content__upcoming ul li {
    width: 19%;
    margin: 0 0.5% 20px;
  }

  .sec_search ul li:nth-child(5n + 1),
  .content__upcoming ul li:first-child {
    margin-left: 0;
  }

  .sec_search ul li:nth-child(5n),
  .content__upcoming ul li:last-child {
    margin-right: 0;
  }
}

@media screen and (max-width: 640px), screen and (max-width: 480px) {
  .sec_search ul li,
  .content__upcoming ul li {
    width: 49%;
    margin: 0 0.5% 20px;
  }

  .sec_search ul li:nth-child(2n + 1),
  .content__upcoming ul li:nth-child(2n) {
    margin-left: 0;
  }

  .sec_search ul li:nth-child(2n),
  .content__upcoming ul li:nth-child(2n) {
    margin-right: 0;
  }
}
</style>
