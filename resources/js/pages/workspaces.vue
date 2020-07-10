<template>
  <div>
    <breadcrumb :title="this.$t('workspaces')" :subtitle="subtitle" />
    <repositories />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
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
      gutter: 25,
      subtitle: 'Your repositories'
    }
  },

  beforeMount () {
    const user = this.$store.state.auth.user
    this.$store.dispatch('bitbucket/setup').then(() => {
      this.$store.dispatch('bitbucket/repositories', user).then(() => {
        this.STOP_AUI_LOADING()
      })
    })
  },

  methods: {
    ...mapActions([
      'START_AUI_LOADING',
      'STOP_AUI_LOADING'
    ])
  }

}
</script>
