<template>
  <div>
    <va-minibar
      :theme="minibarTheme"
      :top-items="minibarTopItems"
      :bottom-items="minibarBottomItems"
    />
    <va-modal ref="addChannelModal" :width="width" :backdrop-clickable="backdropClickable">
      <div slot="header" style="padding: 10px 20px;">
        <h2>Add new channel</h2>
      </div>
      <div slot="body" style="height:120px;text-align:center;">
        <va-form ref="form" :type="form.type">
          <va-form-item need>
            <va-input
              v-model="form.channelName"
              name="channelName"
              icon-style="solid"
              icon="comment"
              autocomplete="off"
              placeholder="Name your new private channel"
              :rules="[{type:'required', tip:'Sorry, we need a valid channel name'}]"
            />
          </va-form-item>
        </va-form>
        <va-alert :type="type" :title="title" style="text-align:left; margin:12px">
          <p>{{ body }}</p>
        </va-alert>
      </div>
      <div slot="footer" style="margin-top:40px;margin-right:10px;">
        <div style="margin-top: 10px; text-align: right;">
          <va-button type="primary" @click.stop="addChannel">
            Submit
          </va-button>
        </div>
      </div>
    </va-modal>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'

export default {
  name: 'Minibar',

  data () {
    return {
      width: '500px',
      backdropClickable: true,
      type: 'info',
      title: 'Information',
      body: 'You can invite bitbucket users after the private channel is created.' +
            'Once invited your private channel would be visible to users automatically.',
      form: {
        type: 'vertical',
        channelName: ''
      },
      minibarTheme: 'dark',
      minibarTopItems: [
        {
          icon: 'check-circle',
          size: '2.0em',
          brand: true,
          method: this.navigateToWelcomePage
        }
      ],
      minibarBottomItems: [
        {
          icon: 'plus',
          size: '1.25em',
          method: this.openAddChannelForm
        },
        {
          icon: 'power-off',
          size: '1.5em',
          method: this.logout
        }
      ]
    }
  },

  methods: {
    navigateToWelcomePage () {
      this.$router.push({ name: 'welcome' })
    },
    logout () {
      this.$store.dispatch('auth/logout').then(() => {
        this.$router.push({ name: 'welcome' })
      })
    },
    openAddChannelForm () {
      this.$refs.addChannelModal.open()
    },
    addChannel () {
      const channelName = this.form.channelName
      const channelData = { uniqueName: uuidv4(), friendlyName: `${channelName}` }
      this.$store.dispatch('twilio/createNewChannel', channelData).then(() => {
        this.$refs.addChannelModal.close()
        this.$router.push({ name: 'conversations.channel',
          params: {
            channel: channelName
          }
        })
      })
    }
  }
}
</script>
