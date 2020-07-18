<template>
  <div>
    <va-container fluid size="lg" style="height: 80vh;">
      <div id="remoteTrack" class="dominant-speaker" />
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
        <va-alert :type="alert.type" :title="alert.title" style="margin:0px 20px 20px 20px;">
          <p>{{ alert.body }}</p>
        </va-alert>
        <va-card :elevation="card.elevation" :padding="card.padding" style="margin:0px 20px;">
          <div slot="topLeft">
            <h3>Meeting link</h3>
          </div>
          <div style="margin:10px 0px;">
            <h4>{{ meetingURL }}</h4>
          </div>
        </va-card>
      </div>
      <div slot="footer" style="margin-top:250px;margin-right:20px;margin-bottom:20px;z-index:100;">
        <div style="margin-top: 10px; text-align: right;z-index:100;">
          <va-button :type="submitFormTypeState" :disabled="submitFormDisabledState" style="z-index:100;" @click.stop="join">
            Join meeting
          </va-button>
        </div>
      </div>
    </va-modal>
  </div>
</template>

<script>
import VieOtpInput from '@bachdgvn/vue-otp-input'

const UPLOAD_URL = process.env.MIX_APP_URL

export default {
  name: 'Meetings',

  components: {
    VieOtpInput
  },

  middleware: ['auth', 'bitbucket-client', 'twilio-client'],

  metaInfo () {
    return { title: this.$t('meetings') }
  },

  data: () => {
    return {
      meetingURL: null,
      width: '500px',
      backdropClickable: false,
      title: null,
      gutter: 15,
      card: {
        elevation: 0,
        padding: 5
      },
      alert: {
        type: 'help',
        title: 'Invite people to this meeting',
        body: 'You can copy paste the URL of this window and share them the password to enter this meeting room.'
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
    this.meetingURL = `${UPLOAD_URL}${this.$route.fullPath}`
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
      this.$store.dispatch('twilio/joinMeeting', this.roomOptions).then(() => {
        this.form.password = null
        this.form.incompletePassword = true
      })
    },
    leave () {
      this.$store.dispatch('twilio/leaveMeeting').then(() => {
        this.$router.push({ name: 'dashboard' })
      })
    }
  }
}
</script>
