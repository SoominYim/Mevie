<template>
  <section v-if="movieCrew.length != 0 && movieCast.length != 0">
    <h2>감독/출연</h2>
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
@import "../../style/detail/credit.scss";
</style>
