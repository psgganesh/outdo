<template>
  <va-row :gutter="gutter">
    <va-column :xs="12" :sm="12" :md="12">
      <div v-chat-scroll class="scrollableChatWindow" />
      <va-textarea
        v-model="value"
        :resize="resize"
        :width="width + '%'"
        :readonly="readonly"
        :disabled="disabled"
        :max-height="maxHeight + 'px'"
        :min-height="minHeight + 'px'"
        :max-length="maxLength"
      />
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
      channel: null,
      gutter: 15,
      value: '',
      width: 100,
      resize: false,
      readonly: false,
      disabled: false,
      maxHeight: 200,
      minHeight: 100,
      maxLength: 1024
    }
  },

  mounted () {
    if (this.$route.params.channel === 'outdobot') {
      const user = this.$store.state.auth.user
      this.channel = user.username
    } else {
      this.channel = this.$route.params.channel
    }
    // this.$store.dispatch('twilio/joinChannel', this.channel)
  },

  beforeDestroy () {
    this.channel = null
  }
}
</script>

<style scoped>
.scrollableChatWindow {
  min-height: 87vh;
  height: 87vh;
  max-height: 87vh;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 1;
}
.scrollableChatWindow .message {
  width: fit-content;
}
</style>
