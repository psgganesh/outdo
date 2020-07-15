<template>
  <div>
    <va-sidebar :theme="sidebarTheme">
      <va-sidebar-group id="brand" :items="coreItems" title="Outdo" :default-open-level="1" />
      <va-sidebar-group id="conversations" :items="channelItems" title="Conversations" :default-open-level="1" />
    </va-sidebar>

    <va-modal ref="meetingsModal" :width="width" :backdrop-clickable="backdropClickable">
      <div slot="header" style="padding: 10px 20px;">
        <h2>Join a meeting</h2>
      </div>
      <div slot="body" style="height:120px;text-align:center;">
        <va-form ref="form" :type="form.type">
          <va-form-item>
            <vie-otp-input
              inputClasses="otp-input"
              :numInputs="7"
              separator="-"
              :shouldAutoFocus="true"
              @on-complete="handleOnComplete"
            />
          </va-form-item>
        </va-form>
      </div>
      <div slot="footer" style="margin-top:40px;margin-right:10px;">
        <div style="margin-top: 10px; text-align: right;">
          <va-button type="help" :disabled="submitFormDisabledState" @click.stop="addChannel">
            Join meeting
          </va-button>
        </div>
      </div>
    </va-modal>
  </div>
</template>

<script>
import VieOtpInput from '@bachdgvn/vue-otp-input'
import { mapGetters } from 'vuex'

export default {
  name: 'Sidebar',

  components: {
    VieOtpInput
  },

  data () {
    return {
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
      backdropClickable: true,
      form: {
        type: 'vertical',
        room: null
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
      if (this.form.room !== '' || this.form.room !== null) {
        return false
      }
      return true
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
    },
    handleOnComplete (value) {
      console.log(value)
    }
  }
}
</script>
