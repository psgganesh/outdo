<template>
  <div>
    <breadcrumb :title="this.$route.params.repository" />
    <files />
  </div>
</template>

<script>
import Files from '~/components/Files'
import Breadcrumb from '~/components/Breadcrumb'

export default {
  name: 'Space',

  middleware: 'auth',

  components: {
    Files,
    Breadcrumb
  },

  metaInfo () {
    return { title: this.$t('space') }
  },

  data: () => {
    return {
      subtitle: 'Files'
    }
  }
}
</script>
