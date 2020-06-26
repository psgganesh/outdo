<template>
  <div>
    <breadcrumb :title="title" :subtitle="subtitle" />
  </div>
</template>

<script>
import Breadcrumb from '~/components/Breadcrumb'

export default {
  name: 'Workspaces',

  middleware: 'auth',

  components: {
    Breadcrumb
  },

  metaInfo () {
    return { title: this.$t('workspaces') }
  },

  data: () => {
    return {
      title: 'Workspaces',
      subtitle: null
    }
  }
}
</script>
