<template>
  <div>
    <va-loading v-if="loading" size="lg" color="blue" center />
    <va-sidebar :theme="sidebarTheme">
      <va-sidebar-group id="brand" :items="coreItems" title="Outdo" :default-open-level="1" />
      <va-sidebar-group id="conversations" :items="channelItems" title="Conversations" :default-open-level="1" />
    </va-sidebar>

    <va-modal ref="meetingsModal" :width="width" :backdrop-clickable="backdropClickable" @closed="resetModalStates">
      <div slot="header" style="padding: 10px 20px;">
        <h2>Start new meeting</h2>
      </div>
      <div slot="body" style="height:120px;">
        <va-form ref="form" :type="form.type">
          <va-form-item label="Meeting URL" need>
            <va-input
              v-model="form.room"
              name="slug"
              :prefix="meetingUrl"
              readonly
            />
          </va-form-item>
          <va-form-item label="Password" need>
            <vie-otp-input
              inputClasses="otp-input"
              :numInputs="7"
              separator="-"
              :shouldAutoFocus="true"
              @on-change="handleOnChange"
            />
          </va-form-item>
        </va-form>
      </div>
      <div slot="footer" style="margin-top:50px;margin-right:10px;">
        <div style="margin-top: 10px; text-align: right;">
          <va-button :type="submitFormTypeState" :disabled="submitFormDisabledState" @click.stop="createNewMeetingRoom">
            Start meeting
          </va-button>
        </div>
      </div>
    </va-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { v4 as uuidv4 } from 'uuid'
import VieOtpInput from '@bachdgvn/vue-otp-input'

const MEETINGS_APP_URL = process.env.MIX_APP_URL

export default {
  name: 'Sidebar',

  components: {
    VieOtpInput
  },

  data () {
    return {
      loading: false,
      sidebarTheme: 'blue',
      coreItems: [
        {
          name: 'Dashboard',
          route: '/dashboard',
          icon: 'home',
          iconSize: '18px',
          iconColor: 'white',
          iconStyle: 'solid'
        },
        {
          name: 'Your workspace',
          route: `/workspaces/${this.$store.state.auth.user.username}`,
          icon: 'pencil-ruler',
          iconSize: '18px',
          iconColor: 'white',
          iconStyle: 'solid'
        },
        {
          name: 'Meetings',
          class: 'meetings',
          method: this.meetingsInit,
          icon: 'chalkboard',
          iconSize: '18px',
          iconColor: 'white',
          iconStyle: 'solid'
        }
      ],
      width: '500px',
      backdropClickable: false,
      form: {
        type: 'vertical',
        room: null,
        password: null,
        incompletePassword: true
      }
    }
  },

  computed: {
    ...mapGetters({
      conversationItems: 'twilio/conversationItems'
    }),
    channelItems () {
      let channels = this.conversationItems
      return channels
    },
    submitFormDisabledState () {
      if (this.form.room === null || this.form.password === null || this.form.incompletePassword) {
        return true
      }
      return false
    },
    submitFormTypeState () {
      if (this.form.room === null || this.form.password === null || this.form.incompletePassword) {
        return 'default'
      }
      return 'success'
    },
    meetingUrl () {
      return MEETINGS_APP_URL + '/meetings/'
    }
  },

  methods: {
    demoMethod () {
      this.VaModal.confirm({
        title: 'Hello!',
        message: `This modal exists to show how methods
        can be applied to Minibar items.`,
        type: 'info'
      })
    },
    meetingsInit () {
      this.$refs.meetingsModal.open()
      this.form.room = uuidv4()
      this.form.password = null
    },
    handleOnChange (value) {
      this.form.password = value
      if (value.length === 7) {
        this.form.incompletePassword = false
      } else {
        this.form.incompletePassword = true
      }
    },
    resetModalStates () {
      this.form.room = uuidv4()
      this.form.password = null
      this.form.incompletePassword = true
    },
    createNewMeetingRoom () {
      this.$refs.meetingsModal.close()
      this.loading = true
      this.$store.dispatch('twilio/startMeeting', this.form).then(() => {
        this.loading = false
        let roomName = this.form.room
        this.resetModalStates()
        this.$router.push({ name: 'meetings', params: { room: roomName } })
      })
    }
  }
}
</script>
