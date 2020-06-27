<template>
  <div>
    <breadcrumb :title="title" :subtitle="subtitle" />
  </div>
</template>

<script>
import Breadcrumb from '~/components/Breadcrumb'

export default {
  name: 'Team',

  middleware: 'auth',

  components: {
    Breadcrumb
  },

  metaInfo () {
    return { title: this.$t('team') }
  },

  data: () => {
    return {
      title: 'Team',
      subtitle: 'Your colleagues & public notice'
    }
  }
}
</script>
