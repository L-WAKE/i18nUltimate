<template>
  <div>{{ $t('i18n0') }}</div>
</template>

<script>
import Test1 from "./HelloWorld1.vue";

export default {
  components: {
    Test1,
  },
  data() {
    return {
      test: {this.$t('i18n0')},
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      console.log(this.$t('i18n1'));
    },
  },
};
</script>
