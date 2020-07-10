<template>
  <div>
    <breadcrumb :title="this.$t('workspaces')" :subtitle="subtitle" />
    <!-- <repositories /> -->
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Breadcrumb from '~/components/Breadcrumb'
// import Repositories from '~/components/Repositories'

export default {
  name: 'Workspaces',

  middleware: ['auth', 'bitbucket-client', 'twilio-client'],

  components: {
    Breadcrumb
    // Repositories
  },

  metaInfo () {
    return { title: this.$t('workspaces') }
  },

  data: () => {
    return {
      gutter: 25,
      subtitle: 'Your repositories'
    }
  }
}
</script>
