<template>
  <div>
    <!-- <va-page-header class="border-bottom-1">
      <div slot="breadcrumb">
        <va-breadcrumb separator="/">
          <va-breadcrumb-item to="/home">
            {{ this.$t('home') }}
          </va-breadcrumb-item>
          <va-breadcrumb-item :to="this.$route.path">
            {{ this.$route.name }}
          </va-breadcrumb-item>
        </va-breadcrumb>
      </div>
      <div slot="title">
        {{ title }}
      </div>
      <div slot="actions">
        <va-button type="default" @click.stop="createNewMeeting">
          <va-icon type="video" icon-style="solid" margin="0 7px 0 0" />
          Start a meeting
        </va-button>
      </div>
    </va-page-header> -->
    <va-container fluid size="lg">
      <!--<va-row id="chat" :gutter="gutter">
        <va-column :xs="3" :sm="3" :md="3" />
        <va-column :xs="4" :sm="4" :md="4" style="text-align:center">
          <va-card>
            <va-button type="default" @click.stop="createNewMeeting">
              <va-icon type="video" icon-style="solid" margin="0 7px 0 0" />
              Start a meeting
            </va-button>
            <br>
            <h3>OR</h3>
            <br>
            <h3>Join with meeting ID</h3>
            <vie-otp-input
              inputClasses="otp-input"
              :numInputs="6"
              separator="-"
              :shouldAutoFocus="true"
              @on-complete="handleOnComplete"
            />
          </va-card>
        </va-column>
        <va-column id="local-media" :xs="12" :sm="12" :md="12" />
      </va-row>-->
      <div id="remoteTrack2" />
      <div id="localTrack2" />
    </va-container>
    </va-container-fluid>
  </div>
</template>

<script>
// import VieOtpInput from '@bachdgvn/vue-otp-input'

export default {
  name: 'Meetings',

  middleware: ['auth', 'bitbucket-client', 'twilio-client'],

  metaInfo () {
    return { title: this.$t('meetings') }
  },

  components: {
    // VieOtpInput
  },

  data: () => {
    return {
      title: null,
      gutter: 15,
      roomOptions: {
        name: 'my-room-name',
        localTrack: 'localTrack2',
        remoteTrack: 'remoteTrack2'
      }
      // roomName: null
    }
  },

  beforeMount () {
    this.title = this.$t('meetings')
  },

  mounted () {
    this.$store.dispatch('twilio/joinMeeting', this.roomOptions)
  },

  methods: {
    // handleOnComplete (value) {
    //   console.log(value)
    //   this.roomName = value
    // }
  }
}
</script>
