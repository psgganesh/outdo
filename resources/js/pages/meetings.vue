<template>
  <div>
    <va-container fluid size="lg" style="height: 80vh;">
      <div id="remoteTrack" />
      <div id="localTrack" />
      <va-button round size="lg" type="danger" style="position:absolute; left: 50%; right: 50%; bottom: 10px;" @click.stop="leave">
        <va-icon type="times" />
      </va-button>
    </va-container>
    <va-modal ref="joinMeetingModal" :width="width" :backdrop-clickable="backdropClickable">
      <div slot="header" style="padding: 10px 20px;">
        <h2>Your meeting password</h2>
      </div>
      <div slot="body" style="height:0px;">
        <va-form ref="form" :type="form.type">
          <va-form-item>
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
          <va-button :type="submitFormTypeState" :disabled="submitFormDisabledState" @click.stop="join">
            Join meeting
          </va-button>
        </div>
      </div>
    </va-modal>
  </div>
</template>

<script>
import VieOtpInput from '@bachdgvn/vue-otp-input'

export default {
  name: 'Meetings',

  components: {
    VieOtpInput
  },

  middleware: ['auth', 'bitbucket-client', 'twilio-client', 'twilio-setup-meeting'],

  metaInfo () {
    return { title: this.$t('meetings') }
  },

  data: () => {
    return {
      width: '500px',
      backdropClickable: false,
      title: null,
      gutter: 15,
      alert: {
        type: 'warning',
        title: 'Information',
        body: 'If the meeting ID is present, you will be automatically joining the existing meeting room. ' +
            'If meeting ID is not present, you will be prompted for creating a new meeting room.'
      },
      form: {
        type: 'vertical',
        password: null
      },
      roomOptions: {
        name: null,
        localTrack: 'localTrack',
        remoteTrack: 'remoteTrack',
        incompletePassword: true
      }
    }
  },

  computed: {
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
    }
  },

  mounted () {
    this.roomOptions.name = this.$route.params.room
    this.$refs.joinMeetingModal.open()
  },

  beforeDestroy () {
    this.$store.dispatch('twilio/leaveMeeting').then(() => {
      this.form.room = null
      this.form.password = null
      this.form.incompletePassword = true
    })
  },

  methods: {
    handleOnChange (value) {
      this.form.password = value
      if (value.length === 7) {
        this.form.incompletePassword = false
      } else {
        this.form.incompletePassword = true
      }
    },
    join () {
      this.$refs.joinMeetingModal.close()
      this.$store.dispatch('twilio/joinMeeting', this.roomOptions)
    },
    leave () {
      this.$store.dispatch('twilio/leaveMeeting').then(() => {
        this.$router.push({ name: 'dashboard' })
      })
    }
  }
}
</script>
