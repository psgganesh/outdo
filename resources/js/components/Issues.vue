<template>
  <va-row v-if="loading" :gutter="gutter" class="text-align-center full-height">
    <va-column :xs="12" :sm="12" :md="12" :lg="12">
      <div>
        <va-loading v-if="loading" size="lg" color="blue" />
      </div>
    </va-column>
  </va-row>
  <va-row v-else :gutter="gutter">
    <va-column class="swimlane" :xs="12" :sm="6" :md="3" :lg="3">
      <h4>Backlog</h4>
    </va-column>
    <va-column class="swimlane" :xs="12" :sm="6" :md="3" :lg="3">
      <h4>Open</h4>
      {{ openIssues }}
    </va-column>
    <va-column class="swimlane" :xs="12" :sm="6" :md="3" :lg="3">
      <h4>Resolved</h4>
    </va-column>
    <va-column class="swimlane" :xs="12" :sm="6" :md="3" :lg="3">
      <h4>Deferred</h4>
    </va-column>
  </va-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Issues',

  data: () => {
    return {
      gutter: 5
    }
  },

  computed: {
    ...mapGetters({
      openIssues: 'bitbucket/openIssues'
    }),
    loading () {
      return this.$store.state.loading
    }
  },

  beforeMount () {
    this.$store.commit('bitbucket/RESET_ISSUES_LIST')
  },

  mounted () {
    const user = this.$store.state.auth.user
    this.START_AUI_LOADING()
    const request = {
      slug: this.$route.params.repository,
      workspace: `{${user.uuid}}`
    }
    this.$store.dispatch('bitbucket/issues', request).then(() => {
      this.STOP_AUI_LOADING()
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
