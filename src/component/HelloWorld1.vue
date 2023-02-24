<template>
  <div>
    <div>静夜思</div>
    <div>床前明月光</div>
    <div>疑是地上霜</div>
    <div>测试</div>
    <div>再来一次</div>
    <br />
    <div>{{ test }}</div>
    <br />
    <test1 test="有一个"> </test1>
  </div>
</template>

<script>
import Test1 from "./HelloWorld";

export default {
  components: {
    Test1,
  },
  data() {
    return {
      test: "再次",
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      console.log("比较");
    },
  },
};
</script>
