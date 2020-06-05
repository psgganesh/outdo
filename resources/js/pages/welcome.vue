<template>
  <div>
    <div class="text-center">
      <div class="title mb-4">
        {{ title }}
      </div>
      <div class="links">
        <a href="https://github.com/cretueusebiu/laravel-vue-spa">github.com/cretueusebiu/laravel-vue-spa</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  layout: 'default',
  metaInfo () {
    return { title: this.$t('home') }
  },
  data: () => ({
    title: window.config.appName
  }),
  computed: mapGetters({
    authenticated: 'auth/check'
  })
}
</script>

<style scoped>
.title {
  font-size: 85px;
}
</style>
