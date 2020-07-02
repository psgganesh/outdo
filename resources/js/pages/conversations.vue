<template>
  <va-row :gutter="gutter">
    <va-column :xs="12" :sm="4" :md="4" class="nav-bar">
      <div>
        xs: 12, sm: 4, md: 4
      </div>
    </va-column>
    <va-column :xs="12" :sm="8" :md="8" class="chat-window">
      <div>
        xs: 12, sm: 8, md: 8
      </div>
    </va-column>
  </va-row>
</template>

<script>

export default {
  name: 'Conversations',

  middleware: 'auth',

  metaInfo () {
    return { title: this.$t('conversations') }
  },

  data: () => {
    return {
      gutter: 15
    }
  }
}
</script>

<style scoped>
.nav-bar {
  height: 98vh;
}
.chat-window {
  height: 98vh;
}
</style>
