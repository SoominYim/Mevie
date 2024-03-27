<template>
  <section v-if="similarMovies.length !== 0">
    <h2>비슷한 영화</h2>
    <ul class="inner clearfix">
      <li v-bind:key="index" v-for="(item, index) in this.similarMovies">
        <a @click="getNewMovieId(item.id)">
          <div class="movie-img">
            <img :src="item.poster" alt="포스터" v-if="item.poster !== null" />
            <img src="../../assets/img_no_poster.png" alt="No-Data" v-if="item.poster === null" />
          </div>
          <span class="movie-title">{{ item.title }}</span>
        </a>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: "SimilarMovies",
  props: ["similarMovies", "getNewMovieId"],
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
section {
  width: 90%;
  margin: 0 auto;
  padding-bottom: 50px;
  h2 {
    font-size: 2.4rem;
    padding-top: 30px;
    padding-bottom: 30px;
    font-weight: 500;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    li {
      min-width: 100px;
      min-height: 150px;
      max-width: 150px;
      max-height: 225px;
      width: 20%;
      margin-bottom: 30px;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
