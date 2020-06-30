<template>
  <div>
    <h2>Test</h2>
  </div>
</template>

<script>

export default {
  name: 'Meetings',

  middleware: 'auth',

  metaInfo () {
    return { title: this.$t('meetings') }
  },

  data: () => {
    return {
      title: 'Team',
      subtitle: 'Your colleagues & public notice'
    }
  }
}
</script>
