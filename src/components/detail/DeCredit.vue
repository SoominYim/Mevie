<template>
  <section v-if="movieCrew.length != 0 && movieCast.length != 0">
    <h2>출연진</h2>
    <div class="credits-crew inner" v-if="movieCrew.length != 0">
      <h3>감독</h3>
      <ul class="clearfix">
        <li :key="i" v-for="(item, i) in movieCrew">
          <div class="credits-img">
            <img :src="item.profile_path" alt="감독" v-if="item.profile_path !== null" />
            <img src="../../assets/img_no_poster.png" alt="No-Data" v-if="item.profile_path === null" />
          </div>
          <dl>
            <dt class="blind">이름</dt>
            <dd>{{ item.name }}</dd>
          </dl>
        </li>
      </ul>
    </div>
    <div class="credits-cast inner" v-if="movieCast.length != 0">
      <h3>출연진</h3>
      <ul class="clearfix">
        <li :key="idx" v-for="(item, idx) in movieCast">
          <div class="credits-img">
            <img :src="item.profile_path" alt="배우" v-if="item.profile_path !== null" />
            <img src="../../assets/img_no_poster.png" alt="No-Data" v-if="item.profile_path === null" />
          </div>
          <dl>
            <dt class="blind">배역</dt>
            <dd v-if="item.character !== null">{{ item.character }} 역</dd>
            <dt class="blind">이름</dt>
            <dd>{{ item.name }}</dd>
          </dl>
        </li>
      </ul>
    </div>
  </section>
</template>
<script>
export default {
  name: "DeCredit",
  props: ["movieCrew", "movieCast"],
};
</script>

<style lang="scss" scoped>
/*sec__credits*/
section {
  width: 90%;
  margin: 0 auto;
  padding-bottom: 40px;
  font-family: "Noto Sans KR", "바탕체", Dotum, "굴림", sans-serif;
  h2 {
    font-size: 2.4rem;
    padding-top: 30px;
    padding-bottom: 20px;
    font-weight: 500;
  }
  h3 {
    font-size: 2.2rem;
    padding-top: 30px;
    padding-bottom: 20px;
    font-weight: 500;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    li {
      min-width: 120px;
      min-height: 180px;
      max-width: 120px;
      max-width: 180px;
      width: 20%;
      img {
        width: 100%;
        height: 100%;
      }
      dl {
        font-size: 1.3rem;
        font-weight: 300;
        line-height: 1.8;
        letter-spacing: -1.2px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
.sec__credits > div {
  padding-bottom: 15px;
}
.sec__credits .credits-crew li,
.sec__credits .credits-cast li {
  float: left;
}
.sec__credits dl {
  padding: 5px 0 15px;
}
</style>
