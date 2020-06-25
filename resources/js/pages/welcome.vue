<template>
  <div>
    <div class="va-page-header">
      <div class="va-page-header-title-wrapper">
        <div class="va-page-header-title-container">
          <h1><div>Page</div></h1><h2>
            <div>
              A convenience component that serves as a wrapper around
              <a href="/documentation/pageheader" class="">PageHeader</a>
              and the rest of your page content.
            </div>
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  layout: 'basic',
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

</style>
