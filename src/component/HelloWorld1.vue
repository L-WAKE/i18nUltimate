<template>
  <div>
    <div>{{ $t('i18n2') }}</div>
    <div>{{ $t('i18n3') }}</div>
    <div>{{ $t('i18n4') }}</div>
    <div>{{ $t('i18n5') }}</div>
    <div>{{ $t('i18n6') }}</div>
    <br />
    <div>{{ test }}</div>
    <br />
    <test1 :test="$t('i18n7')"> </test1>
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
      test: {this.$t('i18n8')},
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      console.log(this.$t('i18n9'));
    },
  },
};
</script>
