<template>
  <div>统一的</div>
</template>

<script>
import Test1 from "./HelloWorld1.vue";

export default {
  components: {
    Test1,
  },
  data() {
    return {
      test: "统一的",
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      console.log("唯一的");
    },
  },
};
</script>
