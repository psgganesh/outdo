<template>
  <div>
    <breadcrumb :title="title" :subtitle="subtitle" />
  </div>
</template>

<script>
import Breadcrumb from '~/components/Breadcrumb'

export default {
  name: 'Home',

  components: {
    Breadcrumb
  },

  data: () => {
    return {
      title: 'Home',
      subtitle: 'A dashboard of all activities'
    }
  }
}
</script>
