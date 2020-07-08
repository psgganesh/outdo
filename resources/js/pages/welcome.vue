<template>
  <va-row :gutter="gutter" class="padding-top-one-fourth">
    <va-column :xs="0" :sm="0" :md="5" />
    <va-column :xs="12" :sm="12" :md="2" :lg="2" class="text-align-center">
      <va-card :elevation="elevation" class="padding-5">
        <div v-if="!authenticated">
          <login-with-bitbucket />
        </div>
      </va-card>
    </va-column>
  </va-row>
</template>

<script>
import { mapGetters } from 'vuex'
import LoginWithBitbucket from '~/components/LoginWithBitbucket'

export default {
  layout: 'basic',

  metaInfo () {
    return { title: this.$t('home') }
  },

  components: {
    LoginWithBitbucket
  },

  data: () => ({
    title: window.config.appName,
    elevation: 0,
    padding: 20,
    gutter: 0
  }),

  computed: mapGetters({
    user: 'auth/user',
    authenticated: 'auth/check'
  }),

  mounted () {
    if (this.authenticated) {
      this.$router.push({ name: 'workspaces' })
    }
  }
}
</script>

<style scoped>
.title {
  font-size: 2.5em;
  height: 40px;
  text-transform: none;
}
.padding-5 {
  padding: 5px;
}
.text-align-center {
  text-align: center;
}
.padding-top-one-fourth {
  padding-top: 15%;
}
.full-height {
  height: 98vh;
}
</style>
