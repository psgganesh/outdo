<template>
  <div>
    <va-page-header v-if="this.$store.state.twilio.currentChatChannel !== null" id="chatHeader">
      <div slot="breadcrumb">
        <va-breadcrumb separator="/">
          <va-breadcrumb-item to="/home">
            Home
          </va-breadcrumb-item>
          <va-breadcrumb-item to="/">
            Conversations
          </va-breadcrumb-item>
        </va-breadcrumb>
      </div>
      <div slot="title">
        <va-icon :type="(botChannel)? 'robot' : 'comment'" />
        {{ (botChannel) ? 'outdo' : currentChannel }}
      </div>
      <div slot="subtitle">
        <va-icon :type="type" /> {{ (botChannel) ? 'For you notes and things to remember' : ' Private channel' }}
      </div>
      <div v-if="!(botChannel)" slot="actions">
        <va-button type="default" @click.stop="openAddMemberForm">
          <va-icon type="plus" icon-style="solid" margin="0 7px 0 0" />
          Add member
        </va-button>
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

    <va-modal ref="addMemberModal" :width="modal.width" :backdrop-clickable="modal.backdropClickable">
      <div slot="header" style="padding: 10px 20px;">
        <h2>Add new member</h2>
      </div>
      <div slot="body" style="height:120px;text-align:center;">
        <va-form ref="form" :type="form.type">
          <va-form-item need>
            <va-input
              v-model="form.memberName"
              name="memberName"
              icon-style="solid"
              icon="at"
              autocomplete="off"
              placeholder="Add a member by bitbucket username"
              :rules="[{type:'required', tip:'Sorry, we need a valid bitbucket username'}]"
            />
          </va-form-item>
        </va-form>
        <va-alert :type="modal.type" :title="modal.title" style="text-align:left; margin:12px">
          <p>{{ modal.body }}</p>
        </va-alert>
      </div>
      <div slot="footer" style="margin-top:40px;margin-right:10px;">
        <div style="margin-top: 10px; text-align: right;">
          <va-button type="primary" @click.stop="addMember">
            Submit
          </va-button>
        </div>
      </div>
    </va-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Avatar from 'vue-avatar'

export default {
  name: 'Conversations',

  middleware: ['auth', 'twilio-client', 'twilio-set-channel'],

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
      maxLength: 1024,
      form: {
        type: 'vertical',
        memberName: ''
      },
      modal: {
        width: '500px',
        backdropClickable: true,
        type: 'info',
        title: 'Information',
        body: 'Once invited your private channel would be visible to users automatically, after they have logged in.'
      }
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
    },
    botChannel () {
      if (Object.is(this.currentChannel, null)) {
        return false
      }

      return this.currentChannel.includes('_outdo')
    },
    type () {
      if (!Object.is(this.$store.state.twilio.currentChatChannel, null)) {
        if (this.$store.state.twilio.currentChatChannel.channelState.type.includes('private')) {
          return 'lock'
        }
      }
      return null
    }
  },

  beforeDestroy () {
    this.channel = null
  },

  methods: {
    sendMessage () {
      this.$store.dispatch('twilio/sendMessage', this.inputMessage)
      this.inputMessage = null
    },
    openAddMemberForm () {
      this.$refs.addMemberModal.open()
    },
    addMember () {
      const memberName = this.form.memberName
      const memberData = { memberName: `${memberName}` }
      this.$store.dispatch('twilio/invitePerson', memberData).then(() => {
        this.$refs.addMemberModal.close()
      })
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
