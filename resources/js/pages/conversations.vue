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
        <va-icon :type="(botChannel)? 'robot' : 'user'" />
        {{ (botChannel) ? 'outdo' : currentChannel }}
      </div>
      <div slot="subtitle">
        {{ (botChannel) ? 'For you notes and things to remember' : currentChannel }}
      </div>
      <div slot="actions">
        <va-input icon-style="solid" icon="search" placeholder="Filter" width="lg" />
      </div>
    </va-page-header>
    <va-row id="chat" :gutter="gutter">
      <va-column :xs="12" :sm="12" :md="12">
        <div v-chat-scroll class="scrollableChatWindow">
          <table>
            <tbody>
              <tr v-for="(message, index) in messages" :key="index" class="m-b-10" style="height:80px;">
                <td style="vertical-align:bottom;text-align:center;">
                  <avatar :src="user.photo_url" :size="48" :rounded="rounded" />
                </td>
                <td style="padding-top: 10px; padding-left: 5px;">
                  <h3>
                    {{ message.author }}
                  </h3>
                  <p style="margin:0px;">
                    {{ message.body }}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
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
      </va-column>
    </va-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Avatar from 'vue-avatar'

export default {
  name: 'Conversations',

  middleware: ['auth', 'twilio-client'],

  metaInfo () {
    return { title: this.$t('conversations') }
  },

  components: {
    Avatar
  },

  data: () => {
    return {
      rounded: true,
      elevation: 0,
      padding: 8,
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
      messages: 'twilio/messages',
      user: 'auth/user'
    }),
    currentChannel () {
      if (!Object.is(this.$store.state.twilio.currentChatChannel, null)) {
        return this.$store.state.twilio.currentChatChannel.friendlyName
      }
      return null
    }
  },

  beforeMount () {
    this.channel = `${this.$route.params.channel}`
    this.$store.dispatch('twilio/openChannel', this.channel)
  },

  beforeDestroy () {
    this.channel = null
  },

  methods: {
    sendMessage () {
      this.$store.dispatch('twilio/sendMessage', this.inputMessage)
      this.inputMessage = null
    },
    botChannel (channelName) {
      console.log(channelName)
      return channelName.includes('_outdo')
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
</style>
