<template>
  <div>
    <button @click="$i18n.locale = 'zh'">中文</button>
    <button @click="$i18n.locale = 'en'">英文</button>
    <button @click="$i18n.locale = 'jp'">日文</button>
    <div>{{ $t("静夜思") }}</div>
    <div>{{ $t("床前明月光") }}</div>
    <div>{{ $t("疑是地上霜") }}</div>
    <div>{{ $t("举头望明月") }}</div>
    <div>{{ $t("低头思故乡") }}</div>
    <br />
    <div>{{ test }}</div>
    <br />
    <test1 :test="$t('属性值')"> </test1>
  </div>
</template>

<script>
import Test1 from "./test2.vue";

export default {
  components: {
    Test1,
  },
  data() {
    return {
      test: this.$t("这是一个测试值"),
    };
  },
  watch: {
    "$i18n.locale": {
      handler(newVal, oldVal) {
        this.test = this.$t("这是一个测试值");
      },
      deep: true,
    },
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      console.log(this.$t("唯一的值"));
    },
  },
};
</script>
