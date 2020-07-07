<template>
  <div>
    <breadcrumb :title="this.$t('workspaces')" :subtitle="subtitle" />
    <repositories />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Breadcrumb from '~/components/Breadcrumb'
import Repositories from '~/components/Repositories'

export default {
  name: 'Workspaces',

  middleware: 'auth',

  components: {
    Breadcrumb,
    Repositories
  },

  metaInfo () {
    return { title: this.$t('workspaces') }
  },

  data: () => {
    return {
      subtitle: 'Your repositories'
    }
  },

  computed: {
    ...mapState('auth', ['user'])
  },

  mounted () {
    const user = this.user
    this.$store.dispatch('bitbucket/setup').then(() => {
      this.$store.dispatch('twilio/fetchAccessToken', user).then(() => {
        this.$router.push('workspaces')
      })
    })
  }
}
</script>
