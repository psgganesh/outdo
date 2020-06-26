<template>
  <div>
    <breadcrumb :title="title" :subtitle="subtitle" />
  </div>
</template>

<script>
import Breadcrumb from '~/components/Breadcrumb'

export default {
  name: 'Spaces',

  middleware: 'auth',

  components: {
    Breadcrumb
  },

  metaInfo () {
    return { title: this.$t('spaces') }
  },

  data: () => {
    return {
      title: 'Spaces',
      subtitle: 'Detail view of projects and repositories'
    }
  }
}
</script>
