<template>
  <div class="container">
    <main-movie></main-movie>
  </div>
</template>

<script>
import MainMovie from "@/components/MainMovie";
export default {
  name: "MeMain",
  components: { MainMovie },
  data() {
    return {
      sampleData: "",
    };
  },
  computed: {},
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {},
};
</script>

<style scoped></style>
