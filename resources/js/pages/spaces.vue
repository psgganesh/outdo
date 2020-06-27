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
  name: 'Spaces',

  middleware: 'auth',

  components: {
    Breadcrumb,
    Repositories
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
