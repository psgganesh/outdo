<template>
  <div>
    <breadcrumb :title="this.$t('space')" :subtitle="subtitle" />
    <repositories />
  </div>
</template>

<script>
import Breadcrumb from '~/components/Breadcrumb'

export default {
  name: 'Space',

  middleware: 'auth',

  components: {
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
}
</script>
