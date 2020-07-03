<template>
  <div>
    <breadcrumb :title="title" :subtitle="subtitle" />
    <repositories />
  </div>
</template>

<script>
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
      title: this.$t('workspaces'),
      subtitle: 'Detail view of projects and repositories'
    }
  }
}
</script>
