<template>
  <div>
    <va-page-header id="chatHeader">
      <div slot="breadcrumb">
        <va-breadcrumb separator="/">
          <va-breadcrumb-item to="/home">
            Home
          </va-breadcrumb-item>
          <va-breadcrumb-item to="/">
            Route
          </va-breadcrumb-item>
        </va-breadcrumb>
      </div>
      <div slot="title">
        Title
      </div>
      <div slot="subtitle">
        Subtitle
      </div>
      <div slot="actions">
        <va-input icon-style="solid" icon="search" placeholder="Filter" width="lg" />
      </div>
    </va-page-header>
    <va-row id="chat" :gutter="gutter">
      <va-column :xs="12" :sm="12" :md="12">
        <div v-chat-scroll class="scrollableChatWindow">
          <va-row v-for="(message, index) in messages" :key="index" :gutter="gutter">
            <va-column :xs="12" :sm="12" :md="12">
              <va-card class="message-card" :elevation="elevation" :padding="padding" style="width:60%;">
                <p>
                  {{ message.body }}
                </p>
              </va-card>
            </va-column>
          </va-row>
        </div>
        <va-textarea
          v-model="inputMessage"
          style="position:absolute; bottom: 10px; left 0px; right 0px;"
          :resize="resize"
          :width="width + '%'"
          :readonly="readonly"
          :disabled="disabled"
          :max-height="maxHeight + 'px'"
          :min-height="minHeight + 'px'"
          :max-length="maxLength"
          @keyup.enter.native="sendMessage"
        />
        <!-- <va-input
          id="chatInput"
          v-model="inputMessage"
          placeholder="Reply..."
          @keyup.enter.native="sendMessage"
        /> -->
      </va-column>
    </va-row>
  </div>
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
      width: 98,
      resize: false,
      readonly: false,
      disabled: false,
      maxHeight: 200,
      minHeight: 50,
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
#chatHeader {
  border-bottom: 1px solid #E0E2E6;
}
.scrollableChatWindow {
  min-height: 73vh;
  height: 73vh;
  max-height: 73vh;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 1;
}
.scrollableChatWindow .message {
  width: fit-content;
}
.message-card {
  padding: 6px;
  border-bottom-left-radius: 0px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
}
</style>
