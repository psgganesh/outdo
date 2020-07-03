<template>
  <va-row :gutter="gutter">
    <va-column :xs="0" :sm="0" :md="2" />
    <va-column :xs="12" :sm="12" :md="8" :lg="8">
      <div>
        <va-card :elevation="elevation" :padding="padding">
          ...
        </va-card>
      </div>
    </va-column>
    <va-column :xs="0" :sm="0" :md="2" />
  </va-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  layout: 'basic',

  metaInfo () {
    return { title: this.$t('home') }
  },

  data: () => ({
    title: window.config.appName,
    elevation: 1,
    padding: 20,
    gutter: 0
  }),

  computed: mapGetters({
    authenticated: 'auth/check'
  }),

  mounted () {
    if (this.authenticated) {
      this.$store.dispatch('bitbucket/setup').then(() => {
        const { user } = this.$store.state.auth.user
        this.$store.dispatch('twilio/fetchAccessToken', user).then(() => {
          this.$router.push('home')
        })
      })
    }
  }
}
</script>
