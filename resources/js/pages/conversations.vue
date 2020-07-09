<template>
  <va-row :gutter="gutter">
    <va-column :xs="12" :sm="12" :md="12">
      <div v-chat-scroll class="scrollableChatWindow">
        <va-row v-for="(message, index) in messages" :key="index">
          <va-column :xs="12" :sm="12" :md="6">
            <va-card :elevation="elevation" :padding="padding">
              <p>{{ message.body }}</p>
            </va-card>
          </va-column>
        </va-row>
      </div>
      <va-textarea
        v-model="inputMessage"
        :resize="resize"
        :width="width + '%'"
        :readonly="readonly"
        :disabled="disabled"
        :max-height="maxHeight + 'px'"
        :min-height="minHeight + 'px'"
        :max-length="maxLength"
        @keyup.enter.native="sendMessage"
      />
    </va-column>
  </va-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Conversations',

  middleware: 'auth',

  metaInfo () {
    return { title: this.$t('conversations') }
  },

  data: () => {
    return {
      elevation: 1,
      padding: 12,
      channel: null,
      gutter: 15,
      inputMessage: null,
      width: 100,
      resize: false,
      readonly: false,
      disabled: false,
      maxHeight: 200,
      minHeight: 100,
      maxLength: 1024
    }
  },

  computed: {
    ...mapGetters({
      messages: 'twilio/messages'
    })
  },

  beforeMount () {
    this.$store.dispatch('twilio/openChannel', this.$route.params.channel)
  },

  beforeDestroy () {
    this.channel = null
  },

  methods: {
    ...mapActions([
      'send'
    ]),
    sendMessage () {
      this.$store.dispatch('twilio/sendMessage', this.inputMessage)
      this.inputMessage = null
    }
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
